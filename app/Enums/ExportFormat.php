<?php

namespace App\Enums;

enum ExportFormat: string
{
    case CSV = 'csv';
    case XML = 'xml';

    /**
     * Get all available format values.
     *
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get the service binding key for this format.
     */
    public function getBindingKey(): string
    {
        return 'export.' . $this->value;
    }
}
