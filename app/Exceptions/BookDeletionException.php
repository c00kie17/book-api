<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class BookDeletionException extends Exception
{
    /**
     * Create a book deletion exception instance.
     *
     * @param  string  $message  The exception message
     * @param  int  $code  The exception code
     * @param  Throwable|null  $previous  The previous throwable used for exception chaining
     *
     * @return void
     */
    public function __construct(string $message = 'Failed to delete book', int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
