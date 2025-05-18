<?php

namespace Tests\Feature\Http\Controllers\Book;

use App\Enums\ExportFormat;
use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Traits\TestHelperTrait;

class ExportTest extends TestCase
{
    use RefreshDatabase;
    use TestHelperTrait;

    protected function setUp(): void
    {
        parent::setUp();

        Book::factory()->create([
            'title' => 'Test Book 1',
            'author' => 'Test Author 1',
        ]);

        Book::factory()->create([
            'title' => 'Test Book 2',
            'author' => 'Test Author 2',
        ]);
    }

    protected function getStreamedContent($response)
    {
        $responseCallback = $response->getCallback();
        ob_start();
        $responseCallback();
        $content = ob_get_clean();

        return $content;
    }

    public function test_export_returns_csv_file_with_valid_data()
    {
        $response = $this->get(route('books.export', [
            'file_format' => ExportFormat::CSV->value,
            'fields' => ['title'],
        ]));

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');

        $content = $this->getStreamedContent($response);

        $this->assertStringContainsString('Title', $content);
        $this->assertStringContainsString('Test Book 1', $content);
        $this->assertStringContainsString('Test Book 2', $content);
    }

    public function test_export_returns_xml_file_with_valid_data()
    {
        $response = $this->get(route('books.export', [
            'file_format' => ExportFormat::XML->value,
            'fields' => ['title'],
        ]));

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml');

        $content = $this->getStreamedContent($response);

        $this->assertStringContainsString('<books>', $content);
        $this->assertStringContainsString('<book>', $content);
        $this->assertStringContainsString('<title>Test Book 1</title>', $content);
        $this->assertStringContainsString('<title>Test Book 2</title>', $content);
    }

    public function test_export_validates_invalid_format()
    {
        $response = $this->get(route('books.export', [
            'file_format' => 'invalid_format',
            'fields' => ['title', 'author'],
        ]));

        $response->assertStatus(302);
        $response->assertSessionHasErrors('file_format');
    }

    public function test_export_validates_invalid_fields()
    {
        $response = $this->get(route('books.export', [
            'file_format' => ExportFormat::CSV->value,
            'fields' => ['invalid_field'],
        ]));

        $response->assertStatus(302);
        $response->assertSessionHasErrors('fields.*');
    }

    public function test_export_handles_empty_fields()
    {
        $response = $this->get(route('books.export', [
            'file_format' => ExportFormat::CSV->value,
        ]));

        $response->assertStatus(302);
        $response->assertSessionHasErrors('fields*');
    }

    public function test_export_handles_empty_format()
    {
        $response = $this->get(route('books.export', [
            'fields' => ['title', 'author'],
        ]));

        $response->assertStatus(302);
        $response->assertSessionHasErrors('file_format');
    }

    public function test_export_returns_empty_file_when_no_books()
    {
        Book::query()->delete();

        $response = $this->get(route('books.export', [
            'file_format' => ExportFormat::CSV->value,
            'fields' => ['title', 'author'],
        ]));

        $response->assertStatus(200);

        $content = $this->getStreamedContent($response);

        $this->assertStringContainsString('Title,Author', $content);
        $this->assertStringNotContainsString('Test Book', $content);
    }
}
