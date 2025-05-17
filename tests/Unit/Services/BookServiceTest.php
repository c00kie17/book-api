<?php

namespace Tests\Unit\Services;

use App\Enums\SortDirection;
use App\Models\Book;
use App\Repositories\BookRepositoryInterface;
use App\Services\BookService;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Mockery;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class BookServiceTest extends TestCase
{
    private BookService $bookService;

    private $bookRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->bookRepository = Mockery::mock(BookRepositoryInterface::class);
        $this->bookService = new BookService($this->bookRepository);
    }

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

    #[Test]
    public function get_all_books_returns_all_books_from_repository()
    {
        $expectedBooks = new Collection([
            new Book(['id' => 1, 'title' => 'Book 1', 'author' => 'Author 1']),
            new Book(['id' => 2, 'title' => 'Book 2', 'author' => 'Author 2']),
        ]);

        $this->bookRepository->shouldReceive('all')
            ->once()
            ->with('id', SortDirection::DESC->value)
            ->andReturn($expectedBooks);

        $result = $this->bookService->getAll();
        $this->assertSame($expectedBooks, $result);
    }

    #[Test]
    public function test_get_all_with_custom_sorting(): void
    {
        $books = new Collection([
            new Book(['id' => 2, 'title' => 'Book B', 'author' => 'Author 2']),
            new Book(['id' => 1, 'title' => 'Book A', 'author' => 'Author 1']),
        ]);

        $this->bookRepository
            ->shouldReceive('all')
            ->with('title', SortDirection::DESC->value)
            ->once()
            ->andReturn($books);

        $result = $this->bookService->getAll('title', SortDirection::DESC);

        $this->assertSame($books, $result);
        $this->assertCount(2, $result);
    }

    #[Test]
    public function get_all_books_when_no_books_returns_empty_collection()
    {
        $emptyCollection = new Collection;
        $this->bookRepository->shouldReceive('all')
            ->once()
            ->with('id', SortDirection::DESC->value)
            ->andReturn($emptyCollection);

        $result = $this->bookService->getAll();

        $this->assertInstanceOf(Collection::class, $result);
        $this->assertTrue($result->isEmpty());
    }

    #[Test]
    public function delete_book_when_valid_id_deletes_book()
    {
        $bookId = 1;

        $this->bookRepository->shouldReceive('delete')
            ->once()
            ->with($bookId)
            ->andReturn(true);

        $result = $this->bookService->delete($bookId);

        $this->assertTrue($result);
    }

    #[Test]
    public function delete_book_when_invalid_id_throws_exception()
    {
        $invalidId = 999;

        $this->bookRepository->shouldReceive('delete')
            ->once()
            ->with($invalidId)
            ->andThrow(new Exception('Book not found'));

        $this->expectException(\App\Exceptions\BookDeletionException::class);
        $this->expectExceptionMessage('Failed to delete book: Database error');

        $this->bookService->delete($invalidId);
    }

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

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
