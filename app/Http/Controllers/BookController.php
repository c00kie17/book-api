<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookCreateRequest;
use App\Http\Requests\BookIndexRequest;
use App\Http\Requests\BookUpdateRequest;
use App\Models\Book;
use App\Services\BookService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function __construct(
        protected BookService $bookService,
    ) {}

    /**
     * Display a listing of the books.
     */
    public function index(BookIndexRequest $request): Response
    {
        $sortField = $request->getSortField();
        $sortDirection = $request->getSortDirection();

        $books = $this->bookService->getAll($sortField, $sortDirection);

        return Inertia::render('Books/Index', [
            'books' => $books,
            'sortBy' => $sortField,
            'sortDirection' => $sortDirection->value,
        ]);
    }

    /**
     * Store a newly created book.
     */
    public function store(BookCreateRequest $request): RedirectResponse
    {
        try {
            $book = $this->bookService->create($request->validated());

            return to_route('books.index')
                ->with('success', 'Book created successfully');
        } catch (\App\Exceptions\BookCreationException $e) {
            return to_route('books.index')
                ->with('error', 'Failed to create book: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified book from storage.
     */
    public function destroy(Book $book): RedirectResponse
    {
        try {
            $this->bookService->delete($book->id);

            return to_route('books.index')
                ->with('success', 'Book deleted successfully');
        } catch (Exception $e) {
            return to_route('books.index')
                ->with('error', 'Failed to delete book: ' . $e->getMessage());
        }
    }

    /**
     * Edit a specified book in storage.
     */
    public function update(BookUpdateRequest $request, Book $book): RedirectResponse
    {
        try {
            $validatedRequest = $request->validated();
            $this->bookService->updateAuthor($book->id, $validatedRequest['author']);

            return to_route('books.index')
                ->with('success', 'Book updated successfully');
        } catch (Exception $e) {
            return to_route('books.index')
                ->with('error', 'Failed to update book: ' . $e->getMessage());
        }
    }
}
