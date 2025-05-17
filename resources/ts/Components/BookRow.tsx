import { BookRowProps } from "../types/Components/BookRow.ts";

import EditableRowData from "./EditableRowData";

export default function BookRow({ book, bookService }: BookRowProps) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
            bookService.deleteBook(book.id);
        }
    };

    return (
        <tr>
            <td className="px-4 py-2 border-b">{book.id}</td>
            <td className="px-4 py-2 border-b">{book.title}</td>
            <td className="px-4 py-2 border-b">
                <EditableRowData book={book} bookService={bookService} />
            </td>
            <td className="px-4 py-2 border-b">
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}
