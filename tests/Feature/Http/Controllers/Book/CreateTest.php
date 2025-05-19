<?php

namespace Tests\Feature\Http\Controllers\Book;

use App\Exceptions\BookCreationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\TestHelperTrait;

class CreateTest extends TestCase
{
    use RefreshDatabase;
    use TestHelperTrait;

    public function test_store_creates_book_with_valid_data()
    {
        $bookData = [
            'title' => 'New Test Book',
            'author' => 'New Test Author',
        ];

        $response = $this->postJson(route('books.store'), $bookData);

        $response->assertStatus(200);

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
        $response = $this->postJson(route('books.store'), $bookData);

        $response->assertStatus(500);

        $response->assertJson([
            'message' => 'Failed to create book: Failed to create book: Database error',
            'errors' => [
                'general' => 'Failed to create book: Database error',
            ],
        ]);

        $this->assertDatabaseMissing('books', $bookData);
    }
}
