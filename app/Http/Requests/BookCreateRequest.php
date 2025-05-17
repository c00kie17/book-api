<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookCreateRequest extends FormRequest
{
    /**
     * Determine if the current user can perform this request.
     */
    public function authorize(): bool
    {
        return true; // No authentication required for this app
    }

    /**
     * Validation rules for book creation/updates.
     *
     * @return array<string, string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
        ];
    }
}
