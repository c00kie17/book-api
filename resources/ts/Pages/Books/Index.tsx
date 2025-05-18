import { Head } from "@inertiajs/react";
import { useState } from "react";

import BookForm from "../../Components/BookForm.tsx";
import BookList from "../../Components/BookList";
import ExportForm from "../../Components/ExportForm.tsx";
import SearchBar from "../../Components/SearchBar.tsx";
import BookService from "../../Services/BookService";
import { IndexProps } from "../../types";
import { SortDirection } from "../../types/Enums/SortDirection.ts";

export default function Index({
    books,
    sortBy,
    sortDirection,
    searchTerm,
}: IndexProps) {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
    const bookService = new BookService();

    const handleSearch = (term: string) => {
        bookService.getAllBooks(sortBy, sortDirection, term);
    };

    const handleClearSearch = () => {
        bookService.getAllBooks(sortBy, sortDirection);
    };

    const handleSort = (field: string, direction: SortDirection) => {
        bookService.getAllBooks(field, direction);
    };

    return (
        <>
            <Head title="Book Management" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Book List
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                        <div className="w-full sm:w-64">
                            <SearchBar
                                initialValue={searchTerm}
                                onSearch={handleSearch}
                                onClear={handleClearSearch}
                            />
                        </div>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
                        >
                            Add New Book
                        </button>
                        <button
                            onClick={() => setIsExportOpen(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
                        >
                            Export
                        </button>
                    </div>
                </div>

                <BookList
                    books={books}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    searchTerm={searchTerm}
                    onSort={handleSort}
                    bookService={bookService}
                />

                <BookForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    bookService={bookService}
                />

                <ExportForm
                    isOpen={isExportOpen}
                    onClose={() => setIsExportOpen(false)}
                    bookService={bookService}
                />
            </div>
        </>
    );
}
