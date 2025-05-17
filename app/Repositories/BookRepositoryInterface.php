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
     * @return Collection<int, Book>
     */
    public function all(): Collection;

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
}
