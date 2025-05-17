<?php

namespace App\Http\Requests;

use App\Enums\SortDirection;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BookIndexRequest extends FormRequest
{
    /**
     * The allowed sort fields for books.
     */
    public const ALLOWED_SORT_FIELDS = ['id', 'author', 'title'];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'sort_by' => ['sometimes', Rule::in(self::ALLOWED_SORT_FIELDS)],
            'sort_direction' => ['sometimes', Rule::in(['asc', 'desc'])],
            'search_term' => ['sometimes', 'nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Get the validated sort field.
     */
    public function getSortField(): string
    {
        return $this->input('sort_by', 'id');
    }

    /**
     * Get the validated sort direction.
     */
    public function getSortDirection(): SortDirection
    {
        $direction = strtolower($this->input('sort_direction', 'desc'));

        return match ($direction) {
            'desc' => SortDirection::DESC,
            default => SortDirection::ASC
        };
    }

    /**
     * Get the validated search term.
     */
    public function getSearchTerm(): ?string
    {
        return $this->input('search_term', '');
    }
}
