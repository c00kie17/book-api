<?php

use App\Http\Controllers\ViewController;
use App\Http\Controllers\OpenAPIController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ViewController::class, 'index'])->name('home');
if (app()->environment(['local', 'staging'])) {
    Route::get('/openapi.json', [OpenAPIController::class, 'getSpec'])->name('api.docs.spec');
    Route::get('/api/docs', [OpenAPIController::class, 'index'])->name('api.docs');
}
