<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class BookUpdateException extends Exception
{
    /**
     * Create a book update exception instance.
     *
     * @param  string  $message  The exception message
     * @param  int  $code  The exception code
     * @param  Throwable|null  $previous  The previous throwable used for exception chaining
     *
     * @return void
     */
    public function __construct(string $message = 'Failed to update book', int $code = 0, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
