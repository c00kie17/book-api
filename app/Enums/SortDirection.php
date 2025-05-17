<?php

namespace App\Enums;

enum SortDirection: string
{
    case ASC = 'asc';
    case DESC = 'desc';

    public static function default(): self
    {
        return self::ASC;
    }

    public static function fromString(string $direction): self
    {
        return match (strtolower($direction)) {
            'desc' => self::DESC,
            default => self::ASC,
        };
    }

    public static function values(): array
    {
        return [
            self::ASC->value,
            self::DESC->value,
        ];
    }
}
