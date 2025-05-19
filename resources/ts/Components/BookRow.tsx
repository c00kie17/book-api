import { BookRowProps } from "../types/Components/BookRow.ts";
import { ButtonVariant } from "../types/Components/UI/Button.ts";

import Button from "./UI/Button.tsx";
import TableRowField from "./UI/TableRowField.tsx";

export default function BookRow({
    book,
    bookService,
    onDeleted,
    onUpdated,
}: BookRowProps) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
            bookService.deleteBook(
                book.id,
                () => {
                    if (onDeleted) onDeleted();
                },
                (error) => {
                    console.error("Error deleting book:", error);
                    alert("Failed to delete book. Please try again.");
                },
            );
        }
    };

    const handleUpdateAuthor = (newAuthor: string) => {
        bookService.updateBook(
            book.id,
            { author: newAuthor },
            () => {
                if (onUpdated) onUpdated();
            },
            (error) => {
                console.error("Error updating book:", error);
                alert("Failed to update book. Please try again.");
            },
        );
    };

    return (
        <tr>
            <TableRowField value={book.id.toString()} />
            <TableRowField value={book.title} />
            <TableRowField
                value={book.author}
                editable={true}
                onUpdate={handleUpdateAuthor}
            />
            <td className="px-4 py-2 border-b">
                <Button
                    variant={ButtonVariant.DANGER}
                    onClick={handleDelete}
                    className="py-1 px-3 text-sm"
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}
