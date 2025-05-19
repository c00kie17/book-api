import { useForm } from "@inertiajs/react";
import { useState } from "react";

import { CreateFormProps } from "../types/Components/CreateForm.ts";
import { Book, BookData } from "../types/Services/BookService";

import FormInput from "./UI/FormInput.tsx";
import Modal from "./UI/Model.tsx";

export default function CreateForm({
    isOpen,
    onClose,
    onBookCreated,
    bookService,
}: CreateFormProps) {
    const { data, setData, processing, errors, reset } = useForm<BookData>({
        title: "",
        author: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);

        bookService.createBook(
            data,
            (book: Book) => {
                setIsSubmitting(false);
                reset();
                if (onBookCreated) onBookCreated(book);
            },
            () => {
                setIsSubmitting(false);
            },
        );
    };

    if (!isOpen) return null;

    const isFormValid = !!data.title && !!data.author;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Book"
            primaryActionText="Add Book"
            onPrimaryAction={handleSubmit}
            isPrimaryActionDisabled={!isFormValid}
            isProcessing={isSubmitting || processing}
        >
            <div>
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
            </div>
        </Modal>
    );
}
