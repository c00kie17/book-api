import { BookListProps } from "../types/Components/BookList.ts";
import { SortDirection } from "../types/Enums/SortDirection.ts";
import { Book } from "../types/Services/BookService.ts";

import BookRow from "./BookRow";
import TableHeaderField from "./UI/TableHeaderField.tsx";

export default function BookList({
    books,
    bookService,
    sortBy,
    sortDirection,
    searchTerm,
    onSort,
}: BookListProps) {
    const handleSort = (field: string, direction: SortDirection) => {
        onSort(field, direction);
    };

    return (
        <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <TableHeaderField width="80px">ID</TableHeaderField>
                        <TableHeaderField
                            sortable
                            sortKey="title"
                            currentSortKey={sortBy}
                            currentSortDirection={sortDirection}
                            onSort={handleSort}
                        >
                            Title
                        </TableHeaderField>
                        <TableHeaderField
                            sortable
                            sortKey="author"
                            currentSortKey={sortBy}
                            currentSortDirection={sortDirection}
                            onSort={handleSort}
                        >
                            Author
                        </TableHeaderField>
                        <TableHeaderField width="120px" align="center">
                            Actions
                        </TableHeaderField>
                    </tr>
                </thead>
                <tbody>
                    {books && books.length > 0 ? (
                        books.map((book: Book) => (
                            <BookRow
                                key={book.id}
                                book={book}
                                bookService={bookService}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-6">
                                {searchTerm
                                    ? "No books match your search"
                                    : "No books found"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
