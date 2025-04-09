<?php
/**
*  Generated with: https://github.com/kamansoft/vemto-filament-plugin
*  by: kamansoft.com
*/
namespace App\Filament\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasDescendingOrder
{
    protected function getTableQuery(): Builder
    {
        return static::getModel()::query()->latest();
    }
}