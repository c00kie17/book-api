<?php

namespace App\Http\Requests;

use App\Enums\ExportFormat;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BookExportRequest extends FormRequest
{
    /**
     * The allowed fields for book exports.
     */
    public const ALLOWED_EXPORT_FIELDS = ['title', 'author'];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // No authentication required for this app
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'file_format' => ['required', Rule::in(ExportFormat::values())],
            'fields' => ['required', 'array', 'min:1'],
            'fields.*' => ['required', Rule::in(self::ALLOWED_EXPORT_FIELDS)],
        ];
    }

    /**
     * Get the validated export format.
     */
    public function getFileFormat(): ExportFormat
    {
        $formatValue = $this->validated('file_format');

        return ExportFormat::from($formatValue);
    }

    /**
     * Get the validated export fields.
     * If no fields are provided, returns all allowed fields.
     *
     * @return array<string>
     */
    public function getFields(): array
    {
        return $this->validated('fields');
    }
}
