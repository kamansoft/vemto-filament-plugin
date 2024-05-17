module.exports = (vemto) => {

    return {
        crudRepository: [],
        localizationKeys: {},
        canInstall() {
            return true
        },

        crudsSelectedForFilament() {
            let pluginData = vemto.getPluginData(),
                hasCrudForGeneration = pluginData.cruds.find(crud => crud && crud.selected)

            if (!hasCrudForGeneration) {
                vemto.log.warning('There is no selected CRUD for generating Filament Resources.')
                return []
            }

            return pluginData.cruds.filter(crud => crud && crud.selected)
        },

        onInstall() {
            let projectCruds = vemto.getProject().getMainCruds()

            vemto.savePluginData({
                allSelected: true,
                cruds: this.generateCrudsData(projectCruds)
            })
        },

        generateCrudsData(cruds) {
            let crudsData = []

            cruds.forEach(crud => {
                let crudData = { 'selected': true, 'id': crud.id, 'inputs': true, 'relationships': [] },
                    crudRelationships = this.getAllRelationshipsFromModel(crud.model)

                if (crudRelationships.length) {
                    crudRelationships.forEach(rel => {
                        crudData.relationships[rel.id] = { 'selected': true }
                    })
                }

                crudsData[crud.id] = crudData
            })

            let to_return = crudsData.map(crud => crud)

            return to_return
        },

        composerPackages(packages) {
            if (this.projectHasFilamentInstalled()) {
                return packages
            }
            packages.require["laravel/jetstream"] = "3.0"
            packages.require['filament/filament'] = '^2.0'
            packages.require['akaunting/laravel-money'] = '4.0'


            return packages
        },

        projectHasFilamentInstalled() {
            return vemto.projectFolderExists('/app/Filament')
        },

        beforeCodeGenerationEnd() {
            let phpVersionBuffer = vemto.executePhp('-r "echo PHP_VERSION;"'),
                phpVersion = phpVersionBuffer.toString()

            if (vemto.versionIsSmallerThan(phpVersion, '8.0.0')) {
                vemto.log.error('[FILAMENT ERROR] You have a smaller PHP version than required to use the Filament v2 (>= 8.0)')
                vemto.generator.abort()
            }

            if (!this.projectHasFilamentInstalled()) {
                vemto.log.message('Installing the Laravel Filament package...')
                vemto.executeComposer('update')
            }

            let selectedCruds = this.crudsSelectedForFilament()

            if (!selectedCruds.length) return

            this.addSelectedCrudsToRepository(selectedCruds)

            this.crudRepository.forEach(crud => {
                this.resolveCrudRelationships(crud)
            })

            this.generateFilamentFiles()
        },

        beforeRenderModel(template, content) {
            if (this.projectHasFilamentInstalled()) {
                return content
            }

            let data = template.getData(),
                model = data.model

            if (model.name == 'User') {
                return this.prepareUserModel(content, model)
            }

            return content
        },

        prepareUserModel(content, model) {
            this.renderFilamentTrait()

            return this.addFilamentTraitToUserModel(content, model)
        },

        renderFilamentTrait() {
            let basePath = 'app/Models/Traits/',
                options = {
                    formatAs: 'php'
                }

            vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'files/traits/FilamentTrait.vemtl', `${basePath}/FilamentTrait.php`, options)
        },

        addFilamentTraitToUserModel(content, model) {
            let phpFile = vemto.parsePhp(content)

            vemto.log.message(`Adding Filament trait to ${model.name} model...`)

            phpFile.addUseStatement('App\\Models\\Traits\\FilamentTrait')
            phpFile.addUseStatement('Filament\\Models\\Contracts\\FilamentUser')

            phpFile.onClass(model.name).addTrait('FilamentTrait')

            let fileCode = phpFile.getCode(),
                finalCode = fileCode.replace(
                    'class User extends Authenticatable',
                    'class User extends Authenticatable implements FilamentUser'
                )

            return finalCode
        },

        addSelectedCrudsToRepository(cruds) {
            let projectCruds = vemto.getProject().getMainCruds()

            cruds.forEach(crud => {
                let crudData = projectCruds.find(projectCrud => projectCrud.id === crud.id)

                if (!crudData) return

                crudData = this.generatePluginConfigForCrud(crudData, crud.inputs, crud.relationships, false)

                this.crudRepository.push(crudData)
            })
        },

        resolveCrudRelationships(crud, crudIsFromPluginConfig = true) {
            let relationships = this.getAllRelationshipsFromModel(crud.model)

            relationships.forEach(rel => {
                let crudRelationshipData = crud.pluginConfig.relationships ?
                    crud.pluginConfig.relationships[rel.id] :
                    null

                let relationshipIsNotSelected = !crudRelationshipData || !crudRelationshipData.selected

                if (crudIsFromPluginConfig && relationshipIsNotSelected) return

                let relModelCrud = rel.model.getMainCruds()[0],
                    crudModelExistsOnRepository = this.crudRepository.find(crud => crud.model.id === rel.model.id)

                if (crudModelExistsOnRepository) return

                if (!relModelCrud) {
                    relModelCrud = vemto.createFakeCrudFromModel(rel.model)
                }

                relModelCrud = this.generatePluginConfigForCrud(relModelCrud, true, {}, true)

                this.crudRepository.push(relModelCrud)

                this.resolveCrudRelationships(relModelCrud, false)
            })
        },

        generatePluginConfigForCrud(crud, inputs, relationships, isMasterDetail = false) {
            if (!crud.pluginConfig) {
                crud.pluginConfig = {}
            }

            crud.pluginConfig.inputs = inputs
            crud.pluginConfig.relationships = relationships

            if (isMasterDetail) {
                crud.pluginConfig.isMasterDetail = true
            } else {
                crud.pluginConfig.isSelectedCrud = true
            }

            return crud
        },

        projectCustomTemplateFilesPath() {
            let defaultTemplatesPath = "default-files-templates";
            let project_name = vemto.getProject().name

            let projectTemplatesPath = project_name + '-files-templates'
            if (vemto.pluginFileExists(projectTemplatesPath)) {
                return projectTemplatesPath + "/";
            }

            vemto.log.warning("templates folder for project " + project_name + ": " + projectTemplatesPath + " not found, using: " + defaultTemplatesPath)

            return defaultTemplatesPath + "/";

        },

        generateFilamentFiles() {
            let basePath = 'app/Filament'
            let langPath = 'lang'

            vemto.log.message('Generating Filament Resources...')

            vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'files/traits/HasDescendingOrder.vemtl', `${basePath}/Traits/HasDescendingOrder.php`, {})


            let localizationKeys = {};
            let _that = this;

            this.crudRepository.forEach(crud => {
                if (this.checkNested(crud.model, "name")) {
                    vemto.log.message('Building localization for Crud Model Name: ' + crud.model.name)
                    localizationKeys[crud.model.name] = crud.model.name
                        //localizationKeys.push([crud.model.name, crud.model.name]) //[crud.model.name] = crud.model.name
                }
            })

            vemto.log.message('crud repository')
            vemto.log.detail(this.crudRepository)
            this.crudRepository.forEach(crud => {
                let crudModelRelationships = this.getAllRelationshipsFromModel(crud.model),
                    modelRelationshipsManager = this.getCrudModelRelationshipsManager(crud, crudModelRelationships)

                vemto.log.message('curd model relationships for ' + crud.model.name)
                vemto.log.detail(crudModelRelationships)
                let options = this.getOptionsForFilamentResource(crud)


                if (this.checkNested(crud, "name")) {
                    vemto.log.message('Crud Name: ' + crud.name)
                    localizationKeys[crud.name] = crud.name
                        //localizationKeys.push([crud.name, crud.name])
                }

                //vemto.log.message("inputS")
                //vemto.log.detail(options.data.crud.inputs)
                crud.inputs.forEach(function(input) {

                    if (input.type == 'select' && !input.relationshipId) {
                        vemto.log.message('--> Lang for ' + input.name + ' options')
                        vemto.log.detail(input)
                        input.items.forEach(function(selectOption) {
                            localizationKeys[selectOption.label] = selectOption.label
                        })
                    }


                    if (_that.checkNested(input, "label")) {
                        vemto.log.message('--> Lang for ' + input.name + ' label')
                        localizationKeys[input.label] = input.label
                    }



                })




                //vemto.log.message('FilamentResource Options')
                //vemto.log.detail(options)

                vemto.log.message('Generating FilamentResource for ' + crud.model.name)
                vemto.log.message('FilamentResource Inputs')
                vemto.log.detail(options.data.crud.inputs)
                vemto.log.message('FilamentResource TABLE Inputs')
                vemto.log.detail(options.data.crudTableInputs)

                vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'files/FilamentResource.vemtl', `${basePath}/Resources/${crud.model.name}Resource.php`, options)
                vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'files/pages/Edit.vemtl', `${basePath}/Resources/${crud.model.name}Resource/Pages/Edit${crud.model.name}.php`, options)
                vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'files/pages/View.vemtl', `${basePath}/Resources/${crud.model.name}Resource/Pages/View${crud.model.name}.php`, options)
                vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'files/pages/List.vemtl', `${basePath}/Resources/${crud.model.name}Resource/Pages/List${crud.model.plural}.php`, options)
                vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'files/pages/Create.vemtl', `${basePath}/Resources/${crud.model.name}Resource/Pages/Create${crud.model.name}.php`, options)

                this.generateFilters(crud)

                if (!modelRelationshipsManager.length) return

                this.generateRelationshipsManager(modelRelationshipsManager, crud, basePath)

            })

            let langKeysOptions = {}

            localizationKeys['Created at from'] = 'Created From';
            localizationKeys['Created at until'] = 'Created Until';
            localizationKeys['Updated at from'] = 'Updated From';
            localizationKeys['Updated at until'] = 'Updated Until';

            langKeysOptions.data = { "langKeysVal": JSON.stringify(localizationKeys, null, 2) } //JSON.stringify(localizationKeys)
                //langKeysOptions.formatAs = "js"
                //vemto.log.detail(stringKeys)
            vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'LangKeys.vemtl', `${langPath}/en.json`, langKeysOptions)

            //vemto.log.message("LOCALIZATION KEYS")
            //vemto.log.detail(localizationKeys)
        },

        generateFilters(crud) {
            if (!crud || !crud.model) return

            let basePath = 'app/Filament/Filters',
                filters = ['DateRange']

            filters.forEach(filter => {
                if (filter == 'DateRange' && crud.model.hasTimestampFields()) {
                    vemto.renderTemplate(this.projectCustomTemplateFilesPath() + `files/filters/${filter}.vemtl`, `${basePath}/${filter}Filter.php`, {})
                }
            })

        },

        generateRelationshipsManager(modelRelationshipsManager, crud, basePath) {
            modelRelationshipsManager.forEach(rel => {
                let relModelCrud = this.crudRepository.find(crudData => crudData.model.id === rel.model.id)

                if (!relModelCrud) return

                let relationshipOptions = this.getOptionsForFilamentResource(relModelCrud, true, rel, crud.model)

                vemto.log.message('RelationshipOptions')
                vemto.log.detail(relationshipOptions)




                vemto.log.message('Relationship Manager for: ' + rel.name + ' of: ' + crud.model.name)
                vemto.log.message('Relationship Inputs')
                vemto.log.detail(relationshipOptions.data.crud.inputs)
                vemto.log.message('Relationship TABLE Inputs')
                vemto.log.detail(relationshipOptions.data.crudTableInputs)


                vemto.renderTemplate(this.projectCustomTemplateFilesPath() + 'files/ResourceManager.vemtl',
                    `${basePath}/Resources/${crud.model.name}Resource/RelationManagers/${rel.model.plural.case('pascalCase')}RelationManager.php`,
                    relationshipOptions
                )
            })
        },

        getOptionsForFilamentResource(crud, isRelationManager = false, rel = {}, inverseRelationshipModel = {}) {

            let options = {
                formatAs: 'php',
                data: {
                    crud,
                    getTypeForFilament: this.getTypeForFilament,
                    crudTableInputs: this.getInputsForTable(crud),
                    crudHasTextInputs: this.crudHasTextInputs(crud),
                    getTableType: input => this.getTableType(input),
                    inputCanBeSearchable: input => this.inputCanBeSearchable(input),
                    inputIsMoney: input => this.inputIsMoney(input),
                    getValidationFromInput: input => this.getValidationFromInput(input),
                    getRelationshipInputName: input => this.getRelationshipInputName(input),
                    inputCanBeSearchableIndividually: input => this.inputCanBeSearchableIndividually(input),

                },
                modules: [
                    { name: 'crud', id: crud.id },
                    { name: 'crud-settings', id: crud.id }
                ]
            }



            if (isRelationManager) {
                options.data.inverseRelationshipModel = inverseRelationshipModel

                options.data.relationshipInputs = crud.inputs

                if (rel.foreignKey) {
                    options.data.relationshipInputs = crud.inputs.filter(input => {
                        return input.field && (input.field.id != rel.foreignKey.id)
                    })
                }

                return options
            }

            let crudModelRelationships = this.getAllRelationshipsFromModel(crud.model)

            options.data.crudModelRelationships = crudModelRelationships
            options.data.modelRelationshipsManager = this.getCrudModelRelationshipsManager(crud, crudModelRelationships)
            options.data.projectName = vemto.getProject().name

            return options
        },

        getCrudModelRelationshipsManager(crud, crudModelRelationships) {
            let crudPluginData = vemto.getPluginData().cruds,
                relationshipsAllowedByFilament = ['morphMany', 'hasMany', 'belongsToMany']

            return crudModelRelationships.filter(relationship => {
                if (!relationshipsAllowedByFilament.includes(relationship.type)) {
                    return false
                }

                if (crud.pluginConfig.isMasterDetail) {
                    return true
                }

                let relationshipData = crudPluginData[crud.id].relationships[relationship.id] ?
                    crudPluginData[crud.id].relationships[relationship.id] :
                    null

                if (!relationshipData) {
                    return false
                }

                let repositoryHasCrudForRelModel = this.crudRepository.some(crud => crud.model.id == relationship.model.id)

                return repositoryHasCrudForRelModel && relationshipData.selected
            })
        },

        getRelationshipInputName(input) {
            let relModel = input.relationship.model,
                relModelLabel = relModel.getLabelFieldName()

            return `${input.relationship.name.case('camelCase')}.${relModelLabel}`
        },

        getTableType(input) {
            if (input.isForRelationship()) {
                return 'TextColumn'
            }

            if (input.isImage()) {
                return 'ImageColumn'
            }

            if (input.isCheckbox()) {
                return 'IconColumn'
            }

            return 'TextColumn'
        },

        getInputsForTable(crud) {
            let textInputs = crud.inputs.filter(input => !input.isFile() && !input.isJson() && !input.isHidden() && input.onIndex)

            return textInputs
        },




        getTypeForFilament(input) {
            let textInputs = ['email', 'url', 'password', 'text', 'number']

            if (textInputs.includes(input.type)) {
                return 'TextInput'
            }



            if (input.isForRelationship()) {
                return 'Select'
            }

            if (input.isJson()) return 'KeyValue';

            if (input.isDate()) return 'DatePicker'

            if (input.isCheckbox()) return 'Toggle'
            

            //if (input.isTextarea()) return 'RichEditor'

            if (input.isTextarea()) return 'MarkdownEditor'

            if (input.isFileOrImage()) return 'FileUpload'

            if (input.isDatetime()) return 'DateTimePicker'

            if (input.isColor()) return 'ColorPicker'

            return input.type.case('pascalCase')
        },

        crudHasTextInputs(crud) {
            return crud.hasTextInputs() || crud.hasEmailInputs() || crud.hasUrlInputs() || crud.hasPasswordInputs() || crud.hasNumericInputs()
        },

        getAllRelationshipsFromModel(model) {
            let basicRelationships = model.getAllRelationships(),
                morphRelationships = model.getAllMorphRelationships()

            return [].concat(
                basicRelationships, morphRelationships
            )
        },

        beforeRunnerEnd() {
            let projectSettings = vemto.getProject()

            vemto.openLink(`${projectSettings.url}/admin`)
        },
 
        getValidationFromInput(input) {
            let inputValidation = input.convertValidationToArrayForTemplate(input.validation),
                tableName = input.field.entity.table,
                fieldName = input.field.name

            let excludedValidations = [
                `'unique:${tableName},${fieldName}',?`,
                "'required',?",
                "'nullable',?"
            ]

            excludedValidations.forEach(regex => {
                let regexObj = new RegExp(regex, 'g')

                inputValidation = inputValidation.replace(regexObj, '')
            })

            return inputValidation
        },

        inputCanBeSearchable(input) {
            //return !input.isDateOrDatetime() && !input.isPassword() && !input.isJson() && !input.isCheckbox() && !input.isForRelationship() && !input.isFileOrImage()
            const serachabble =  !input.isDateOrDatetime() && !input.isPassword() && !input.isJson() && !input.isCheckbox()   && !input.isFileOrImage() && !input.isSelect() || ( input.isSelect() && input.isForRelationship() ) 
            vemto.log.message('inputCanBeSearchable '+ input.name+' '+serachabble.toString())
            
            return serachabble
        },

        inputCanBeSearchableIndividually(input) {
            return input.isText() || input.isEmail() || input.isUrl() || input.isNumeric()
        },
        checkNested(obj, ...props) {
            for (const prop of props) {
                if (!obj || !Object.prototype.hasOwnProperty.call(obj, prop)) {
                    return false;
                }
                obj = obj[prop];
            }
            return true;
        },
        inputIsMoney(input) {

            var moneyRelatedFieldWords = [
                'price',
                'tax_amount',
                'debt_amount',
                'credit_amount',
                'money_amount',
                'deposit_amount',
                'total_money_amount',
                'sub_total_money_amount',
                'discount_money_amount',
            ];

            if (input.isNumeric() && moneyRelatedFieldWords.some(word => input.name.includes(word))) {
                return true;
            }
            return false;
        }

    }
}