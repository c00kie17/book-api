<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class BookCreationException extends Exception
{
    /**
     * Create a new book creation exception instance.
     *
     * @param  string  $message  The exception message
     * @param  int  $code  The exception code
     * @param  Throwable|null  $previous  The previous throwable used for exception chaining
     *
     * @return void
     */
    public function __construct(string $message = 'Failed to create book', int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
