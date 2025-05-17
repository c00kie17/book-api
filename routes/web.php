<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::resource('books', BookController::class)->only(['index', 'store', 'destroy', 'update']);

Route::redirect('/', '/books');
