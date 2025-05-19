import { Head } from "@inertiajs/react";
import { useState, useEffect, useCallback, useMemo } from "react";

import API_CONFIG from "../../../config.ts";
import BookList from "../../Components/BookList";
import CreateForm from "../../Components/CreateForm.tsx";
import ExportForm from "../../Components/ExportForm.tsx";
import SearchBar from "../../Components/SearchBar.tsx";
import Button from "../../Components/UI/Button.tsx";
import BookService from "../../Services/BookService";
import { ButtonVariant } from "../../types/Components/UI/Button.ts";
import { SortDirection } from "../../types/Enums/SortDirection.ts";
import { Book } from "../../types/Services/BookService.ts";

export default function Index() {
    const [books, setBooks] = useState<Book[]>([]);
    const [sortBy, setSortBy] = useState<string>("id");
    const [sortDirection, setSortDirection] = useState<SortDirection>(
        SortDirection.DESC,
    );
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
    const [_isLoading, setIsLoading] = useState<boolean>(true);
    const bookService = useMemo(() => new BookService(API_CONFIG.BASE_URL), []);

    const fetchBooks = useCallback(() => {
        setIsLoading(true);
        bookService.getAllBooks(
            sortBy,
            sortDirection,
            searchTerm,
            (response) => {
                setBooks(response);
                setIsLoading(false);
            },
            (error) => {
                console.error("Error fetching books:", error);
                setIsLoading(false);
            },
        );
    }, [sortBy, sortDirection, searchTerm, bookService]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    const handleSort = (field: string, direction: SortDirection) => {
        setSortBy(field);
        setSortDirection(direction);
    };

    const handleBookCreated = () => {
        setIsFormOpen(false);
        fetchBooks();
    };

    const handleBookDeleted = () => {
        fetchBooks();
    };

    const handleBookUpdated = () => {
        fetchBooks();
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
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            onClick={() => setIsFormOpen(true)}
                            fullWidth
                            className="sm:w-auto"
                        >
                            Add New Book
                        </Button>
                        <Button
                            variant={ButtonVariant.SUCCESS}
                            onClick={() => setIsExportOpen(true)}
                            fullWidth
                            className="sm:w-auto"
                        >
                            Export
                        </Button>
                    </div>
                </div>

                <BookList
                    books={books}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    searchTerm={searchTerm}
                    onSort={handleSort}
                    bookService={bookService}
                    onBookDeleted={handleBookDeleted}
                    onBookUpdated={handleBookUpdated}
                />

                <CreateForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    bookService={bookService}
                    onBookCreated={handleBookCreated}
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
