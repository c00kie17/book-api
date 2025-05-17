import { Pencil, Check, X } from "lucide-react";
import { useState, ChangeEvent } from "react";

import { EditableRowDataProps } from "../types/Components/EditableRowData.ts";

export default function EditableRowData({
    book,
    bookService,
}: EditableRowDataProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [author, setAuthor] = useState<string>(book.author);
    const [originalAuthor] = useState<string>(book.author);

    const handleUpdate = (): void => {
        bookService.updateBook(book.id, { author }, () => {
            setIsEditing(false);
        });
    };

    const handleCancel = (): void => {
        setIsEditing(false);
        setAuthor(originalAuthor);
    };

    if (isEditing) {
        return (
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={author}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setAuthor(e.target.value)
                    }
                    className="border rounded px-2 py-1 flex-grow"
                    autoFocus
                />
                <button
                    onClick={handleUpdate}
                    className="text-green-500 hover:text-green-600"
                    title="Save"
                >
                    <Check className="h-5 w-5" />
                </button>
                <button
                    onClick={handleCancel}
                    className="text-red-500 hover:text-red-600"
                    title="Cancel"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2">
            <span>{author}</span>
            <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-600"
                title="Edit"
            >
                <Pencil className="h-4 w-4" />
            </button>
        </div>
    );
}
