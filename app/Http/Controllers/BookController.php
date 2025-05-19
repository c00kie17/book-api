<?php

namespace App\Http\Controllers;

use App\Exceptions\BookCreationException;
use App\Http\Requests\BookCreateRequest;
use App\Http\Requests\BookExportRequest;
use App\Http\Requests\BookGetAllRequest;
use App\Http\Requests\BookUpdateRequest;
use App\Models\Book;
use App\Services\BookService;
use App\Traits\Controllers\FileDownloadTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookController extends Controller
{
    use FileDownloadTrait;

    public function __construct(
        protected BookService $bookService,
    ) {}

    /**
     * Display a listing of the books.
     */
    public function getAll(BookGetAllRequest $request): JsonResponse
    {
        $sortField = $request->getSortField();
        $sortDirection = $request->getSortDirection();
        $searchTerm = $request->getSearchTerm();

        $books = $this->bookService->getAll($sortField, $sortDirection, $searchTerm);

        return response()->json([
            'data' => $books,
        ]);
    }

    /**
     * Store a newly created book.
     */
    public function store(BookCreateRequest $request): JsonResponse
    {
        try {
            $book = $this->bookService->create($request->validated());

            return response()->json([
                'data' => $book,
                'message' => 'Book created successfully',
            ]);
        } catch (BookCreationException $e) {
            return response()->json([
                'message' => 'Failed to create book: ' . $e->getMessage(),
                'errors' => ['general' => $e->getMessage()],
            ], 500);
        }
    }

    /**
     * Remove the specified book from storage.
     */
    public function destroy(Book $book): JsonResponse
    {
        try {
            $this->bookService->delete($book->id);

            return response()->json([
                'data' => $book,
                'message' => 'Book deleted successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to delete book: ' . $e->getMessage(),
                'errors' => ['general' => $e->getMessage()],
            ], 500);
        }
    }

    /**
     * Edit a specified book in storage.
     */
    public function update(BookUpdateRequest $request, Book $book): JsonResponse
    {
        try {
            $validatedRequest = $request->validated();
            $this->bookService->updateAuthor($book->id, $validatedRequest['author']);

            return response()->json([
                'data' => $book,
                'message' => 'Book updated successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to update book:' . $e->getMessage(),
                'errors' => ['general' => $e->getMessage()],
            ], 500);

        }
    }

    /**
     * Export books data in CSV or XML format.
     */
    public function export(BookExportRequest $request): StreamedResponse
    {
        $format = $request->getFileFormat();
        $fields = $request->getFields();

        $exportService = app($format->value);

        $books = $this->bookService->getAll();

        $filename = 'books_export.' . $exportService->getFileExtension();

        $content = $exportService->format($books, $fields);

        return $this->downloadResponse(
            $content,
            $filename,
            $exportService->getMimeType(),
        );
    }
}
