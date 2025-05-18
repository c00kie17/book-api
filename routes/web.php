<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/books');

Route::resource('books', BookController::class)->only(['index', 'store', 'destroy', 'update']);

Route::get('books/export', [BookController::class, 'export'])->name('books.export');
