<?php

namespace App\Repositories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;

interface BookRepositoryInterface
{
    /**
     * Create a new book in the database.
     *
     * @param  array{title: string, author: string}  $data  Book creation data
     */
    public function create(array $data): Book;

    /**
     * Retrieve all books from the database.
     *
     * @param  string  $sortBy  Field to sort by
     * @param  string  $sortDirection  Sort direction (asc or desc)
     *
     * @return Collection<int, Book>
     */
    public function all(string $sortBy = 'id', string $sortDirection = 'desc'): Collection;

    /**
     * Delete a book from the database.
     *
     * @param  int  $id  The ID of the book to delete
     *
     * @return bool True if deletion was successful
     */
    public function delete(int $id): bool;

    /**
     * Update a book in the database.
     *
     * @param  int  $id  The ID of the book to update
     * @param  array  $data  The data to update
     *
     * @return Book The updated book
     */
    public function update(int $id, array $data): Book;

    /**
     * Search books by title or author.
     *
     * @param  string  $searchTerm  The search term
     * @param  string  $sortBy  Field to sort by
     * @param  string  $sortDirection  Sort direction (asc or desc)
     *
     * @return Collection<int, Book>
     */
    public function search(string $searchTerm, string $sortBy = 'id', string $sortDirection = 'desc'): Collection;
}
