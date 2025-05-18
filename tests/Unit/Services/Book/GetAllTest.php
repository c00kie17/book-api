<?php

namespace Tests\Unit\Services\Book;

use App\Enums\SortDirection;
use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;
use PHPUnit\Framework\Attributes\Test;

class GetAllTest extends BaseTestCase
{
    #[Test]
    public function get_get_all_books_returns_all_books_from_repository()
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
    public function get_get_all_books_when_no_books_returns_empty_collection()
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

    public function test_get_all_with_empty_search_term_returns_all_books(): void
    {
        $expectedBooks = new Collection([
            new Book(['id' => 1, 'title' => 'Book 1', 'author' => 'Author 1']),
            new Book(['id' => 2, 'title' => 'Book 2', 'author' => 'Author 2']),
        ]);

        $this->bookRepository->shouldReceive('all')
            ->once()
            ->with('id', SortDirection::DESC->value)
            ->andReturn($expectedBooks);

        $result = $this->bookService->getAll('id', SortDirection::DESC, '');
        $this->assertSame($expectedBooks, $result);
    }

    public function test_get_all_books_searches_for_books_when_search_term_provided(): void
    {
        $searchTerm = 'test';
        $expectedBooks = new Collection([
            new Book(['id' => 1, 'title' => 'test Book', 'author' => 'Author 1']),
        ]);

        $this->bookRepository->shouldReceive('search')
            ->once()
            ->with($searchTerm, 'author', SortDirection::DESC->value)
            ->andReturn($expectedBooks);

        $result = $this->bookService->getAll('author', SortDirection::DESC, $searchTerm);
        $this->assertSame($expectedBooks, $result);
    }
}
