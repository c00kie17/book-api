<?php

namespace Tests\Feature\Http\Controllers\Book;

use App\Models\Book;
use App\Services\BookService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Mockery;
use Tests\TestCase;

class IndexTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Book::factory()->create(['title' => 'Z Book', 'author' => 'A Author']);
        Book::factory()->create(['title' => 'A Book', 'author' => 'Z Author']);
        Book::factory()->create(['title' => 'M Book', 'author' => 'M Author']);
    }

    public function test_index_handles_no_parameters(): void
    {
        $response = $this->get(route('books.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('books', 3)
            ->where('sortBy', 'id')
            ->where('sortDirection', 'desc'),
        );
    }

    public function test_index_handles_only_sort_field_provided(): void
    {
        $response = $this->get(route('books.index', ['sort_by' => 'title']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('books', 3)
            ->where('sortBy', 'title')
            ->where('sortDirection', 'desc'),
        );
    }

    public function test_index_handles_only_sort_direction_provided(): void
    {
        $response = $this->get(route('books.index', ['sort_direction' => 'asc']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('books', 3)
            ->where('sortBy', 'id')
            ->where('sortDirection', 'asc'),
        );
    }

    public function test_index_returns_with_book_sorted_and_filtered(): void
    {
        Book::create(['title' => 'New 1', 'author' => 'Me']);
        Book::create(['title' => 'New 2', 'author' => 'Me']);

        $response = $this->get(route('books.index', [
            'search_term' => 'New',
            'sort_by' => 'title',
            'sort_direction' => 'desc',
        ]));

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->has('books', 2)
            ->where('searchTerm', 'New')
            ->where('sortBy', 'title')
            ->where('sortDirection', 'desc')
            ->where('books.0.title', 'New 2')
            ->where('books.1.title', 'New 1'),
        );
    }

    public function test_index_shows_empty_message_when_no_books()
    {
        $mockService = Mockery::mock(BookService::class);
        $mockService->shouldReceive('getAll')
            ->once()
            ->andReturn(collect());

        $this->app->instance(BookService::class, $mockService);

        $response = $this->get(route('books.index'));

        $response->assertInertia(fn (Assert $page) => $page
            ->has('books', 0),
        );
    }

    public function test_index_handles_invalid_search_term(): void
    {
        $response = $this->get(route('books.index', [
            'sort_by' => 'id',
            'sort_direction' => 'asc',
            'search_term' => ['multiple', 'search', 'terms'],
        ]));

        $response->assertStatus(302);
        $response->assertSessionHasErrors('search_term');
    }

    public function test_index_handles_only_search_term_field_provided(): void
    {
        $response = $this->get(route('books.index', ['search_term' => 'Book']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('books', 3)
            ->where('sortBy', 'id')
            ->where('sortDirection', 'desc'),
        );
    }
}
