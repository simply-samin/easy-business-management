<?php

use App\Http\Controllers\BusinessController;
use App\Http\Controllers\DemoTableController;
use App\Http\Controllers\OutletController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('table', DemoTableController::class)->name('table');

    Route::resource('businesses', BusinessController::class);
    Route::resource('businesses.outlets', OutletController::class)
        ->except(['index', 'show'])
        ->scoped();
});

require __DIR__.'/settings.php';
