<?php

use App\Http\Controllers\BusinessController;
use App\Http\Controllers\DemoTableController;
use App\Http\Controllers\OutletController;
use App\Http\Controllers\PartyContactPersonController;
use App\Http\Controllers\PartyController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('table', DemoTableController::class)->name('table');

    Route::singleton('business', BusinessController::class);
    Route::resource('businesses.outlets', OutletController::class)
        ->except(['index', 'show'])
        ->scoped();
    Route::resource('product-categories', ProductCategoryController::class)->except(['show']);
    Route::resource('products', ProductController::class)->except(['show']);
    Route::resource('parties', PartyController::class);
    Route::resource('parties.party-contact-persons', PartyContactPersonController::class)
        ->except(['index', 'show'])
        ->scoped();
});

require __DIR__.'/settings.php';
