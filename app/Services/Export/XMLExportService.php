<?php

namespace App\Services\Export;

use Illuminate\Support\Collection;
use XMLWriter;

class XMLExportService implements ExportInterface
{
    /**
     * Convert a collection to XML format.
     */
    public function format(Collection $items, array $fields = []): string
    {
        $xml = new XMLWriter;
        $xml->openMemory();
        $xml->startDocument('1.0', 'UTF-8');
        $xml->setIndent(true);

        $xml->startElement('books');

        foreach ($items as $item) {
            $xml->startElement('book');

            foreach ($fields as $field) {
                $xml->startElement($field);
                $xml->text($item->{$field});
                $xml->endElement();
            }

            $xml->endElement();
        }

        $xml->endElement();

        return $xml->outputMemory();
    }

    /**
     * Get the MIME type for XML.
     */
    public function getMimeType(): string
    {
        return 'application/xml';
    }

    /**
     * Get the file extension for XML.
     */
    public function getFileExtension(): string
    {
        return 'xml';
    }
}
