<?php

namespace Tests\Traits;

use App\Services\BookService;

trait TestHelperTrait
{
    private function mockServiceException(string $method, string $exceptionClass, string $message): void
    {
        $this->mock(BookService::class, function ($mock) use ($method, $exceptionClass, $message) {
            $mock->shouldReceive($method)
                ->once()
                ->andThrow(new $exceptionClass($message));
        });
    }

    private function assertSuccessResponse($response, string $route, string $message): void
    {
        $response->assertRedirect(route($route));
        $response->assertSessionHas('success', $message);
    }
}
