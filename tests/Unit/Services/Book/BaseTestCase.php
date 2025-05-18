<?php

namespace Tests\Unit\Services\Book;

use App\Repositories\BookRepositoryInterface;
use App\Services\BookService;
use Mockery;
use Tests\TestCase;

/**
 * @abstract
 */
class BaseTestCase extends TestCase
{
    protected BookService $bookService;

    protected $bookRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->bookRepository = Mockery::mock(BookRepositoryInterface::class);
        $this->bookService = new BookService($this->bookRepository);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
