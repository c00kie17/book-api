<?php

namespace Tests\Feature\Http\Controllers\Book;

use App\Exceptions\BookUpdateException;
use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\TestHelperTrait;

class UpdateTest extends TestCase
{
    use RefreshDatabase;
    use TestHelperTrait;

    public function test_update_changes_author_with_valid_data()
    {
        $book = Book::factory()->create([
            'author' => 'Original Author',
        ]);

        $updateData = [
            'author' => 'Updated Author',
        ];

        $response = $this->patchJson(route('books.update', ['book' => $book->id]), $updateData);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Book updated successfully',
        ]);

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

        $response = $this->patchJson(route('books.update', ['book' => $book->id]), $updateData);

        $response->assertStatus(500);
        $response->assertJson([
            'message' => 'Failed to update book:Failed to update book: Database error',
            'errors' => [
                'general' => 'Failed to update book: Database error',
            ],
        ]);

        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'author' => $originalAuthor,
        ]);
    }
}
