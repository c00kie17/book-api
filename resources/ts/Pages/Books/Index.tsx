import { Head } from "@inertiajs/react";
import { useState } from "react";

import BookForm from "../../Components/BookForm";
import BookList from "../../Components/BookList";
import BookService from "../../Services/BookService";
import { IndexProps } from "../../types";

export default function Index({ books }: IndexProps) {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const bookService = new BookService();

    return (
        <>
            <Head title="Book Management" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Book List
                    </h1>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                    >
                        Add New Book
                    </button>
                </div>

                <BookList books={books} bookService={bookService} />

                <BookForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    bookService={bookService}
                />
            </div>
        </>
    );
}
