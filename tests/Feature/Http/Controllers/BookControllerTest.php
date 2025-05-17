<?php

namespace Tests\Feature\Http\Controllers;

use App\Exceptions\BookCreationException;
use App\Exceptions\BookDeletionException;
use App\Exceptions\BookUpdateException;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Mockery;
use Tests\TestCase;

class BookControllerTest extends TestCase
{
    use RefreshDatabase;

    private function mockServiceException(string $method, string $exceptionClass, string $message): void
    {
        $this->mock(BookService::class, function ($mock) use ($method, $exceptionClass, $message) {
            $mock->shouldReceive($method)
                ->once()
                ->andThrow(new $exceptionClass($message));
        });
    }

    private function assertSuccessResponse($response, string $route, string $message): void
    {
        $response->assertRedirect(route($route));
        $response->assertSessionHas('success', $message);
    }

    public function test_index_returns_view_with_books()
    {
        $books = collect([
            new Book(['id' => 1, 'title' => 'Test Book 1', 'author' => 'Author 1']),
            new Book(['id' => 2, 'title' => 'Test Book 2', 'author' => 'Author 2']),
        ]);

        $mockService = Mockery::mock(BookService::class);
        $mockService->shouldReceive('getAll')
            ->once()
            ->andReturn($books);

        $this->app->instance(BookService::class, $mockService);

        $response = $this->get(route('books.index'));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Books/Index')
            ->has('books', 2)
            ->where('books.0.title', 'Test Book 1')
            ->where('books.0.author', 'Author 1')
            ->where('books.1.title', 'Test Book 2')
            ->where('books.1.author', 'Author 2'),
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
            ->component('Books/Index')
            ->has('books', 0),
        );
    }

    public function test_store_creates_book_with_valid_data()
    {
        $bookData = [
            'title' => 'New Test Book',
            'author' => 'New Test Author',
        ];

        $response = $this->post(route('books.store'), $bookData);

        $this->assertSuccessResponse($response, 'books.index', 'Book created successfully');

        $this->assertDatabaseHas('books', $bookData);
    }

    public function test_store_validates_required_title()
    {
        $bookData = [
            'author' => 'Test Author',
            // title is missing
        ];

        $response = $this->post(route('books.store'), $bookData);

        $response->assertSessionHasErrors(['title']);
        $response->assertStatus(302);

        $this->assertDatabaseMissing('books', $bookData);
    }

    public function test_store_validates_required_author()
    {
        $bookData = [
            'title' => 'Test Title',
            // author is missing
        ];
        $response = $this->post(route('books.store'), $bookData);

        $response->assertSessionHasErrors(['author']);
        $response->assertStatus(302);

        $this->assertDatabaseMissing('books', $bookData);
    }

    public function test_store_handles_database_errors()
    {
        $this->mockServiceException(
            'create',
            BookCreationException::class,
            'Failed to create book: Database error',
        );

        $bookData = [
            'title' => 'Error Test Book',
            'author' => 'Error Test Author',
        ];
        $response = $this->post(route('books.store'), $bookData);

        $redirectResponse = $this->followRedirects($response);
        $redirectResponse->assertSee('An error occurred while saving the book');

        $this->assertDatabaseMissing('books', $bookData);
    }

    public function test_destroy_deletes_book_with_valid_id()
    {
        $book = Book::factory()->create();
        $response = $this->delete(route('books.destroy', $book->id));

        $this->assertSuccessResponse($response, 'books.index', 'Book deleted successfully');

        $this->assertDatabaseMissing('books', ['id' => $book->id]);
    }

    public function test_destroy_handles_invalid_id_type()
    {
        $response = $this->delete(route('books.destroy', 'invalid-id'));
        $response->assertStatus(404);
    }

    public function test_destroy_handles_database_errors()
    {

        $book = Book::factory()->create();

        $this->mockServiceException(
            'delete',
            BookDeletionException::class,
            'Failed to delete book: Database error',
        );

        $response = $this->delete(route('books.destroy', $book->id));

        $response->assertRedirect(route('books.index'));
        $response->assertSessionHas('error');

        $this->assertDatabaseHas('books', [
            'id' => $book->id,
        ]);
    }

    public function test_update_changes_author_with_valid_data()
    {
        $book = Book::factory()->create([
            'author' => 'Original Author',
        ]);

        $updateData = [
            'author' => 'Updated Author',
        ];

        $response = $this->patch(route('books.update', $book->id), $updateData);

        $this->assertSuccessResponse($response, 'books.index', 'Book updated successfully');

        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'author' => 'Updated Author',
        ]);
    }

    public function test_update_validates_required_author()
    {
        $book = Book::factory()->create();
        $originalAuthor = $book->author;
        $updateData = [];
        $response = $this->patch(route('books.update', $book->id), $updateData);

        $response->assertSessionHasErrors(['author']);
        $response->assertStatus(302);

        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'author' => $originalAuthor,
        ]);
    }

    public function test_update_handles_database_errors()
    {

        $book = Book::factory()->create();
        $originalAuthor = $book->author;

        $this->mockServiceException(
            'updateAuthor',
            BookUpdateException::class,
            'Failed to update book: Database error',
        );

        $updateData = [
            'author' => 'Updated Author',
        ];

        $response = $this->patch(route('books.update', $book->id), $updateData);

        $response->assertRedirect();
        $redirectResponse = $this->followRedirects($response);
        $redirectResponse->assertSee('Failed to update book');

        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'author' => $originalAuthor,
        ]);
    }

    protected function setUp(): void
    {
        parent::setUp();
    }
}
