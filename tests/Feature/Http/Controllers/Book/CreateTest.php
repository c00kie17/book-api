<?php

namespace Tests\Feature\Http\Book\Controllers;

use App\Exceptions\BookCreationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\TestHelperTrait;

class BookControllerCreateTest extends TestCase
{
    use RefreshDatabase;
    use TestHelperTrait;

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
}
