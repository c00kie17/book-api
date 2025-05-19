<?php

namespace Tests\Feature\Http\Controllers\Book;

use App\Exceptions\BookDeletionException;
use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\TestHelperTrait;

class DeleteTest extends TestCase
{
    use RefreshDatabase;
    use TestHelperTrait;

    public function test_destroy_deletes_book_with_valid_id()
    {
        $book = Book::factory()->create();

        $response = $this->deleteJson(route('books.destroy', $book->id));

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Book deleted successfully',
        ]);

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

        $response = $this->deleteJson(route('books.destroy', ['book' => $book->id]));

        $response->assertStatus(500);

        $response->assertJson([
            'message' => 'Failed to delete book: Failed to delete book: Database error',
            'errors' => [
                'general' => 'Failed to delete book: Database error',
            ],
        ]);

        $this->assertDatabaseHas('books', [
            'id' => $book->id,
        ]);
    }
}
