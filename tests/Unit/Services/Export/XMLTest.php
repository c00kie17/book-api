<?php

namespace Tests\Unit\Services\Export;

use App\Services\Export\ExportInterface;
use App\Services\Export\XMLExportService;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

class XMLTest extends TestCase
{
    protected ExportInterface $xmlExportService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->xmlExportService = new XMLExportService;
    }

    public function test_format_returns_xml_from_collection()
    {
        $items = new Collection([
            (object) ['name' => 'John', 'email' => 'john@example.com'],
            (object) ['name' => 'Jane', 'email' => 'jane@example.com'],
        ]);

        $fields = ['name', 'email'];

        $service = new XMLExportService;
        $xml = $service->format($items, $fields);

        $this->assertStringContainsString('<books>', $xml);
        $this->assertStringContainsString('<book>', $xml);
        $this->assertStringContainsString('<name>John</name>', $xml);
        $this->assertStringContainsString('<email>john@example.com</email>', $xml);
        $this->assertStringContainsString('<name>Jane</name>', $xml);
        $this->assertStringContainsString('<email>jane@example.com</email>', $xml);
    }

    public function test_format_returns_empty_books_element_when_collection_is_empty()
    {
        $items = new Collection([]);
        $fields = ['name', 'email'];

        $service = new XMLExportService;
        $xml = $service->format($items, $fields);

        $this->assertStringContainsString('<books', $xml);
        $this->assertStringNotContainsString('<book>', $xml);
    }

    public function test_get_mime_type_returns_valid_mime_type()
    {
        $mime_type = $this->xmlExportService->getMimeType();
        $this->assertEquals('application/xml', $mime_type);
    }

    public function test_get_file_extension_returns_xml()
    {
        $extension = $this->xmlExportService->getFileExtension();
        $this->assertEquals('xml', $extension);
    }
}
