<?php

namespace Tests\Unit\Services\Export;

use App\Services\Export\CSVExportService;
use App\Services\Export\ExportInterface;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

class CSVTest extends TestCase
{
    protected ExportInterface $csvExportService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->csvExportService = new CSVExportService;
    }

    public function test_format_returns_csv_from_collection()
    {
        $items = new Collection([
            (object) ['name' => 'John', 'email' => 'john@example.com'],
            (object) ['name' => 'Jane', 'email' => 'jane@example.com'],
        ]);

        $fields = ['name', 'email'];

        $service = new CSVExportService;
        $csv = $service->format($items, $fields);

        $expected = "Name,Email\nJohn,john@example.com\nJane,jane@example.com\n";

        $this->assertEquals($expected, $csv);
    }

    public function test_format_returns_only_headers_when_collection_is_empty()
    {
        $items = new Collection([]);
        $fields = ['name', 'email'];

        $service = new CSVExportService;
        $csv = $service->format($items, $fields);

        $expected = "Name,Email\n";

        $this->assertEquals($expected, $csv);
    }

    public function test_get_mime_type_returns_valid_mime_type()
    {
        $mime_type = $this->csvExportService->getMimeType();
        $this->assertEquals('text/csv', $mime_type);
    }

    public function test_get_file_extension_returns_csv()
    {
        $extension = $this->csvExportService->getFileExtension();
        $this->assertEquals('csv', $extension);
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }
}
