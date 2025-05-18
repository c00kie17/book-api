<?php

namespace App\Traits\Controllers;

use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

trait FileDownloadTrait
{
    /**
     * Create response for file download.
     */
    protected function downloadResponse(string $content, string $filename, string $mimeType): StreamedResponse
    {
        $headers = [
            'Content-Type' => $mimeType,
        ];

        $callback = function () use ($content) {
            echo $content;
        };

        return Response::streamDownload(
            $callback,
            $filename,
            $headers,
        );
    }
}
