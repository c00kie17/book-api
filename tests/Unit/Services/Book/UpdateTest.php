<?php

namespace Tests\Unit\Services\Book;

use App\Models\Book;
use Exception;
use PHPUnit\Framework\Attributes\Test;

class BookServiceUpdateTest extends BaseTest
{
    #[Test]
    public function update_author_with_valid_id_updates_author_successfully()
    {
        $bookId = 1;
        $newAuthor = 'Updated Author Name';
        $expectedData = ['author' => $newAuthor];

        $updatedBook = new Book([
            'id' => $bookId,
            'title' => 'Test Book',
            'author' => $newAuthor,
        ]);

        $this->bookRepository->shouldReceive('update')
            ->once()
            ->with($bookId, $expectedData)
            ->andReturn($updatedBook);

        $result = $this->bookService->updateAuthor($bookId, $newAuthor);

        $this->assertInstanceOf(Book::class, $result);
        $this->assertEquals($newAuthor, $result->author);
    }

    #[Test]
    public function update_author_when_repository_throws_exception_throws_book_update_exception()
    {
        $bookId = 1;
        $newAuthor = 'Updated Author Name';
        $expectedData = ['author' => $newAuthor];

        $this->bookRepository->shouldReceive('update')
            ->once()
            ->with($bookId, $expectedData)
            ->andThrow(new Exception('Database error occurred'));

        $this->expectException(\App\Exceptions\BookUpdateException::class);
        $this->expectExceptionMessage('Failed to update book: Database error');

        $this->bookService->updateAuthor($bookId, $newAuthor);
    }
}
