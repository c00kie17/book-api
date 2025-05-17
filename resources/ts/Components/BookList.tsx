import { BookListProps } from "../types/Components/BookList.ts";
import { Book } from "../types/Services/BookService.ts";

import BookRow from "./BookRow";
import SortableTableHeader from "./SortableTableHeader";

export default function BookList({
    books,
    bookService,
    sortBy,
    sortDirection,
    searchTerm,
}: BookListProps) {
    return (
        <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-3 border-b">ID</th>
                        <SortableTableHeader
                            column="title"
                            label="Title"
                            currentSort={sortBy}
                            currentDirection={sortDirection}
                            bookService={bookService}
                            searchTerm={searchTerm}
                        />
                        <SortableTableHeader
                            column="author"
                            label="Author"
                            currentSort={sortBy}
                            currentDirection={sortDirection}
                            bookService={bookService}
                            searchTerm={searchTerm}
                        />
                        <th className="text-left px-4 py-3 border-b">
                            Actions
                        </th>
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
