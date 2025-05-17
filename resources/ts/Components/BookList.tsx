import { BookListProps } from "../types/Components/BookList.ts";
import { Book } from "../types/Services/BookService.ts";

import BookRow from "./BookRow";

export default function BookList({ books, bookService }: BookListProps) {
    return (
        <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-3 border-b">ID</th>
                        <th className="text-left px-4 py-3 border-b">Title</th>
                        <th className="text-left px-4 py-3 border-b">Author</th>
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
                                No books found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
