<?php

namespace Tests\Unit\Services\Book;

use App\Models\Book;
use Exception;
use PHPUnit\Framework\Attributes\Test;

class BookServiceCreateTest extends BaseTest
{
    #[Test]
    public function create_book_delegates_creation_to_repository()
    {
        $bookData = [
            'title' => 'Test Book',
            'author' => 'Test Author',
        ];

        $expectedBook = new Book($bookData);
        $expectedBook->id = 1;

        $this->bookRepository->shouldReceive('create')
            ->once()
            ->with($bookData)
            ->andReturn($expectedBook);

        $result = $this->bookService->create($bookData);
        $this->assertSame($expectedBook, $result);
    }

    #[Test]
    public function create_book_when_repository_throws_exception_handles_error_gracefully()
    {
        $bookData = [
            'title' => 'Test Book',
            'author' => 'Test Author',
        ];

        $this->bookRepository->shouldReceive('create')
            ->once()
            ->with($bookData)
            ->andThrow(new Exception('Database connection failed'));

        $this->expectException(\App\Exceptions\BookCreationException::class);
        $this->expectExceptionMessage('Failed to create book: Database error');

        $this->bookService->create($bookData);
    }
}
