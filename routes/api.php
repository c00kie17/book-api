<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::get('books/export', [BookController::class, 'export'])->name('books.export');
Route::get('books', [BookController::class, 'getAll'])->name('books.index');
Route::post('books', [BookController::class, 'store'])->name('books.store');
Route::delete('books/{book}', [BookController::class, 'destroy'])->name('books.destroy');
Route::patch('books/{book}', [BookController::class, 'update'])->name('books.update');
