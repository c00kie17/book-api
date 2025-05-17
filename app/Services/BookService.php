<?php

namespace App\Services;

use App\Enums\SortDirection;
use App\Exceptions\BookCreationException;
use App\Exceptions\BookDeletionException;
use App\Exceptions\BookUpdateException;
use App\Models\Book;
use App\Repositories\BookRepositoryInterface;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class BookService
{
    public function __construct(
        protected BookRepositoryInterface $bookRepository,
    ) {}

    /**
     * Get a complete list of all books.
     *
     * @param  string  $sortBy  Field to sort by
     * @param  SortDirection  $sortDirection  Sort direction
     * @param  string  $searchTerm  author or title name to filter by
     */
    public function getAll(string $sortBy = 'id', SortDirection $sortDirection = SortDirection::DESC, string $searchTerm = ''): Collection
    {
        if (trim($searchTerm) !== '') {
            return $this->bookRepository->search(
                $searchTerm,
                $sortBy,
                $sortDirection->value,
            );
        }

        return $this->bookRepository->all($sortBy, $sortDirection->value);
    }

    /**
     * Add a new book to the system.
     *
     * @param  array{title: string, author: string}  $data  Book information
     *
     * @throws BookCreationException
     *
     * @return Book Book object
     */
    public function create(array $data): Book
    {
        try {
            return $this->bookRepository->create($data);
        } catch (Exception $e) {
            Log::error('Book creation failed: ' . $e->getMessage(), [
                'exception' => $e,
            ]);

            throw new BookCreationException(
                'Failed to create book: Database error',
                0,
                $e,
            );
        }
    }

    /**
     * Delete a book by ID.
     *
     * @param  int  $id  The ID of the book to delete
     *
     * @throws BookDeletionException
     *
     * @return bool True if deletion was successful
     */
    public function delete(int $id): bool
    {
        try {
            return $this->bookRepository->delete($id);
        } catch (Exception $e) {
            Log::error('Book deletion failed: ' . $e->getMessage(), [
                'exception' => $e,
                'id' => $id,
            ]);

            throw new BookDeletionException(
                'Failed to delete book: Database error',
                0,
                $e,
            );
        }
    }

    /**
     * Update a book by ID.
     *
     * @param  int  $id  The ID of the book to update
     *
     * @throws BookUpdateException
     *
     * @return Book The updated document
     */
    public function updateAuthor(int $id, string $author): Book
    {
        $bookData = [
            'author' => $author,
        ];

        try {
            return $this->bookRepository->update($id, $bookData);
        } catch (Exception $e) {
            Log::error('Book updating failed: ' . $e->getMessage(), [
                'exception' => $e,
                'id' => $id,
            ]);

            throw new BookUpdateException(
                'Failed to update book: Database error',
                0,
                $e,
            );
        }
    }
}
