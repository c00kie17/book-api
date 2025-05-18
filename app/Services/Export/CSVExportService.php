<?php

namespace App\Services\Export;

use Illuminate\Support\Collection;

class CSVExportService implements ExportInterface
{
    /**
     * Convert a collection to CSV format.
     */
    public function format(Collection $items, array $fields = []): string
    {
        $output = fopen('php://temp', 'r+');

        fputcsv($output, array_map('ucfirst', $fields));

        foreach ($items as $item) {
            $row = [];
            foreach ($fields as $field) {
                $row[] = $item->{$field};
            }
            fputcsv($output, $row);
        }

        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return $csv;
    }

    /**
     * Get the MIME type for CSV.
     */
    public function getMimeType(): string
    {
        return 'text/csv';
    }

    /**
     * Get the file extension for CSV.
     */
    public function getFileExtension(): string
    {
        return 'csv';
    }
}
