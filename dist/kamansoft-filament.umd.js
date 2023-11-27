(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["kamansoft-filament"] = factory();
	else
		root["kamansoft-filament"] = factory();
})((typeof self !== 'undefined' ? self : this), () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ entry_lib)
});

;// CONCATENATED MODULE: ../../../../usr/local/lib/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ const setPublicPath = (null);

;// CONCATENATED MODULE: ../../../../usr/local/lib/node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??vue-loader-options!../../../../usr/local/lib/node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/Component.vue?vue&type=template&id=6524e1b6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"w-full"},[_c('label',{staticClass:"block text-sm font-bold"},[_vm._v("Filament")]),_c('small',{staticClass:"mb-2"},[_vm._v("Select the CRUDs to generate a Filament Resource")]),_c('div',{staticClass:"mt-5"},[_c('label',{staticClass:"block text-sm font-bold mb-2"},[_vm._v("Project CRUDs")]),_c('div',{staticClass:"form-check mb-3"},[_c('label',{staticClass:"inline-flex items-center",attrs:{"for":"selectAllCruds"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pluginData.allSelected),expression:"pluginData.allSelected"}],staticClass:"form-checkbox",attrs:{"type":"checkbox","id":"selectAllCruds"},domProps:{"checked":Array.isArray(_vm.pluginData.allSelected)?_vm._i(_vm.pluginData.allSelected,null)>-1:(_vm.pluginData.allSelected)},on:{"change":[function($event){var $$a=_vm.pluginData.allSelected,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.pluginData, "allSelected", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.pluginData, "allSelected", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.pluginData, "allSelected", $$c)}},_vm.selectAllData]}}),_c('span',{staticClass:"ml-2 text-gray-800 dark:text-gray-300"},[_vm._v("Select All")])])]),(_vm.pluginData.cruds)?_vm._l((_vm.projectCruds),function(crud){return _c('div',{key:'crud' + crud.id,staticClass:"bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-900 p-2 rounded-md my-3"},[_c('div',{staticClass:"form-check"},[_c('label',{staticClass:"inline-flex items-center text-gray-800",attrs:{"for":crud.id}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pluginData.cruds[crud.id]['selected']),expression:"pluginData.cruds[crud.id]['selected']"}],staticClass:"form-checkbox",attrs:{"type":"checkbox","id":crud.id},domProps:{"checked":Array.isArray(_vm.pluginData.cruds[crud.id]['selected'])?_vm._i(_vm.pluginData.cruds[crud.id]['selected'],null)>-1:(_vm.pluginData.cruds[crud.id]['selected'])},on:{"change":[function($event){var $$a=_vm.pluginData.cruds[crud.id]['selected'],$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.pluginData.cruds[crud.id], 'selected', $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.pluginData.cruds[crud.id], 'selected', $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.pluginData.cruds[crud.id], 'selected', $$c)}},function($event){return _vm.toggleCrudData(crud)}]}}),_c('span',{staticClass:"ml-2 text-gray-800 dark:text-gray-100"},[_vm._v(_vm._s(crud.name))])])]),_c('div',{staticClass:"form-check mt-1 ml-3"},[_c('label',{staticClass:"inline-flex items-center"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pluginData.cruds[crud.id]['inputs']),expression:"pluginData.cruds[crud.id]['inputs']"}],staticClass:"form-checkbox",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.pluginData.cruds[crud.id]['inputs'])?_vm._i(_vm.pluginData.cruds[crud.id]['inputs'],null)>-1:(_vm.pluginData.cruds[crud.id]['inputs'])},on:{"change":[function($event){var $$a=_vm.pluginData.cruds[crud.id]['inputs'],$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.pluginData.cruds[crud.id], 'inputs', $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.pluginData.cruds[crud.id], 'inputs', $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.pluginData.cruds[crud.id], 'inputs', $$c)}},_vm.save]}}),_c('span',{staticClass:"ml-2 text-gray-800 dark:text-gray-300"},[_vm._v("Inputs")])])]),_c('small',{staticClass:"mb-1 ml-3"},[_vm._v("Relationships")]),_vm._l((_vm.getAllRelationshipsFromModel(crud.model)),function(relationship){return _c('div',{key:'rel' + relationship.id,staticClass:"form-check my-1 ml-3"},[_c('label',{staticClass:"inline-flex items-center"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pluginData.cruds[crud.id]['relationships'][relationship.id].selected),expression:"pluginData.cruds[crud.id]['relationships'][relationship.id].selected"}],staticClass:"form-checkbox",attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.pluginData.cruds[crud.id]['relationships'][relationship.id].selected)?_vm._i(_vm.pluginData.cruds[crud.id]['relationships'][relationship.id].selected,null)>-1:(_vm.pluginData.cruds[crud.id]['relationships'][relationship.id].selected)},on:{"change":[function($event){var $$a=_vm.pluginData.cruds[crud.id]['relationships'][relationship.id].selected,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.pluginData.cruds[crud.id]['relationships'][relationship.id], "selected", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.pluginData.cruds[crud.id]['relationships'][relationship.id], "selected", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.pluginData.cruds[crud.id]['relationships'][relationship.id], "selected", $$c)}},_vm.save]}}),_c('span',{staticClass:"ml-2 text-gray-800 dark:text-gray-300"},[_vm._v(_vm._s(((relationship.type.case('pascalCase')) + " (" + (relationship.name.case('pascalCase')) + ")")))])])])})],2)}):_vm._e()],2)])}
var staticRenderFns = []


;// CONCATENATED MODULE: ../../../../usr/local/lib/node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/Component.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const Componentvue_type_script_lang_js_ = ({
    data() {
        return {
            projectCruds: [],
            pluginData: [],
            vemtoProject: {}
        }
    },

    created() {
        this.vemtoProject = window.vemtoApi.getProject()
        this.pluginData = window.vemtoApi.getPluginData()
        this.projectCruds = this.vemtoProject.getMainCruds()

        if(this.pluginData.cruds) {
            this.checkNewProjectCruds()
            this.checkNewModelRelationships()
        }
    },

    methods: {
        checkNewModelRelationships() {
            this.projectCruds.forEach(crud => {
                let crudPluginData = this.pluginData.cruds.find(crudData => crudData && crudData.id === crud.id)

                if(!crudPluginData) return

                let crudModelRelationships = this.getAllRelationshipsFromModel(crud.model)

                crudModelRelationships.forEach(rel => {
                    if(!crudPluginData.relationships[rel.id]) {
                        this.$set(this.pluginData.cruds[crud.id].relationships, rel.id, { selected: false })
                    }
                })
            })

            this.save()
        },

        getAllRelationshipsFromModel(model) {
            let basicRelationships = model.getAllRelationships(),
                morphRelationships = model.getAllMorphRelationships()

            return [].concat(
                basicRelationships, morphRelationships
            )
        },

        toggleCrudData(crud) {
            let crudData = this.pluginData.cruds[crud.id]

            if(!crudData || !crudData.relationships) return

            this.$set(crudData, 'inputs', crudData.selected)

            crudData.relationships.forEach((rel, index) => {
                if(!rel) return

                if(!crudData.relationships[index]) return

                this.$set(crudData.relationships[index], 'selected', crudData.selected)
            })

            this.toggleCrudModule(crud.id, crudData.selected)
            this.save()
        },

        selectAllData(event) {
            let isChecked = event.target.checked

            this.pluginData.cruds.forEach((crudData, crudId) => {
                if(!crudData) return

                crudData.selected = isChecked
                crudData.inputs = isChecked

                this.toggleCrudModule(crudId, isChecked)

                crudData.relationships.forEach((rel, index) => {
                    if(!rel) return
                    
                    crudData.relationships[index].selected = isChecked
                })
            })

            this.save()
        },

        toggleCrudModule(crudId, selected) {
            if(selected) {
                this.vemtoProject.purgeRemovedModule('crud-settings', crudId)
                return
            }

            this.vemtoProject.registerRemovedModule('crud-settings', crudId)
        },
        
        checkNewProjectCruds() {
            this.projectCruds.forEach(crud => {
                if(this.pluginData.cruds[crud.id]) return

                let crudData = { 'selected': false, id: crud.id, 'inputs': false, 'relationships': [] },
                    crudRelationships = this.getAllRelationshipsFromModel(crud.model)

                if(crudRelationships.length) {
                    crudRelationships.forEach(rel => {
                        crudData.relationships[rel.id] = {}
                        crudData.relationships[rel.id].selected = false
                    })
                }

                this.$set(this.pluginData.cruds, crud.id, crudData)
            })

            this.save()
        },

        save: window.vemtoApi.debounce(function() {
            window.vemtoApi.savePluginData({
                cruds: this.pluginData.cruds,
                allSelected: this.pluginData.allSelected
            })
        }, 300)
    }
});

;// CONCATENATED MODULE: ./src/Component.vue?vue&type=script&lang=js&
 /* harmony default export */ const src_Componentvue_type_script_lang_js_ = (Componentvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ../../../../usr/local/lib/node_modules/@vue/cli-service/node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/Component.vue





/* normalize component */
;
var component = normalizeComponent(
  src_Componentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const Component = (component.exports);
;// CONCATENATED MODULE: ../../../../usr/local/lib/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ const entry_lib = (Component);


__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=kamansoft-filament.umd.js.map