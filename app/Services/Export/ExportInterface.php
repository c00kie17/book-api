<?php

namespace App\Services\Export;

use Illuminate\Support\Collection;

interface ExportInterface
{
    /**
     * Convert a collection to an exportable format.
     */
    public function format(Collection $items, array $fields = []): string;

    /**
     * Get the MIME type for this format.
     */
    public function getMimeType(): string;

    /**
     * Get the file extension for this format.
     */
    public function getFileExtension(): string;
}
