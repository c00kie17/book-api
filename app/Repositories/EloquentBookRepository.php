<?php

namespace App\Repositories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Collection;

class EloquentBookRepository implements BookRepositoryInterface
{
    public function __construct(
        protected Book $model,
    ) {}

    public function create(array $data): Book
    {
        return $this->model->create($data);
    }

    public function all(string $sortBy = 'id', string $sortDirection = 'asc'): Collection
    {
        return $this->model
            ->orderBy($sortBy, $sortDirection)
            ->get();
    }

    public function delete(int $id): bool
    {
        $book = $this->model->findOrFail($id);

        return $book->delete();
    }

    public function update(int $id, array $data): Book
    {
        $book = $this->model->findOrFail($id);
        $book->fill($data);
        $book->save();

        return $book;
    }
}
