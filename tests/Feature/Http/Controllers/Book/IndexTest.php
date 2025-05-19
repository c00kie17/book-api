<?php

namespace Tests\Feature\Http\Controllers\Book;

use App\Models\Book;
use App\Services\BookService;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

    public function test_get_all_handles_no_parameters(): void
    {
        $response = $this->getJson(route('books.index'));

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'author', 'created_at', 'updated_at'],
            ],
        ]);
        $response->assertJsonCount(3, 'data');
    }

    public function test_get_all_handles_only_sort_field_provided(): void
    {
        $response = $this->getJson(route('books.index', ['sort_by' => 'title']));

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');

        $titles = collect($response->json('data'))->pluck('title')->all();
        $this->assertEquals(['Z Book', 'M Book', 'A Book'], $titles);
    }

    public function test_get_all_handles_only_sort_direction_provided(): void
    {
        $response = $this->getJson(route('books.index', ['sort_direction' => 'asc']));

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');

        $expectedIds = Book::orderBy('id', 'asc')->pluck('id')->all();
        $responseIds = collect($response->json('data'))->pluck('id')->all();
        $this->assertEquals($expectedIds, $responseIds, 'Books should be sorted by ID in ascending order');
    }

    public function test_get_all_returns_with_book_sorted_and_filtered(): void
    {
        Book::create(['title' => 'New 1', 'author' => 'Me']);
        Book::create(['title' => 'New 2', 'author' => 'Me']);

        $response = $this->getJson(route('books.index', [
            'search_term' => 'New',
            'sort_by' => 'title',
            'sort_direction' => 'desc',
        ]));

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');

        $books = $response->json('data');
        $this->assertEquals('New 2', $books[0]['title']);
        $this->assertEquals('New 1', $books[1]['title']);
    }

    public function test_get_all_shows_empty_array_when_no_books()
    {
        $mockService = Mockery::mock(BookService::class);
        $mockService->shouldReceive('getAll')
            ->once()
            ->andReturn(collect());

        $this->app->instance(BookService::class, $mockService);

        $response = $this->getJson(route('books.index'));

        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
    }

    public function test_get_all_handles_invalid_search_term(): void
    {
        $response = $this->getJson(route('books.index', [
            'sort_by' => 'id',
            'sort_direction' => 'asc',
            'search_term' => ['multiple', 'search', 'terms'],
        ]));

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['search_term']);
    }

    public function test_get_all_handles_only_search_term_field_provided(): void
    {
        $response = $this->getJson(route('books.index', ['search_term' => 'Book']));

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }
}
