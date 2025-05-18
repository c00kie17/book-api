<?php

namespace App\Providers;

use App\Enums\ExportFormat;
use App\Repositories\BookRepositoryInterface;
use App\Repositories\EloquentBookRepository;
use App\Services\Export\CSVExportService;
use App\Services\Export\XMLExportService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(BookRepositoryInterface::class, EloquentBookRepository::class);

        $this->app->bind(ExportFormat::CSV->value, CSVExportService::class);
        $this->app->bind(ExportFormat::XML->value, XMLExportService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {}
}
