import { useForm } from "@inertiajs/react";
import { X } from "lucide-react";
import { FormEvent } from "react";

import { BookFormProps } from "../types/Components/BookForm";
import { BookData } from "../types/Services/BookService";

import FormInput from "./FormInput";

export default function BookForm({
    isOpen,
    onClose,
    bookService,
}: BookFormProps) {
    const { data, setData, processing, errors, reset } = useForm<BookData>({
        title: "",
        author: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        bookService.createBook(data, () => {
            reset();
            onClose();
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative z-10">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Add New Book
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <FormInput
                        id="title"
                        label="Title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        error={errors.title}
                        placeholder="Enter book title"
                    />

                    <FormInput
                        id="author"
                        label="Author"
                        value={data.author}
                        onChange={(e) => setData("author", e.target.value)}
                        error={errors.author}
                        placeholder="Enter author name"
                        className="mb-6"
                    />

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ${processing ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600 active:bg-blue-700"} transition-colors`}
                        >
                            {processing ? "Adding..." : "Add Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
