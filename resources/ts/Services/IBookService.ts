import { Book, BookData } from "../types/Services/BookService";

export interface IBookService {
    /**
     * Creates a new book
     * @param data The book data to create
     * @param onSuccess Optional callback to execute on successful creation
     * @param onError Optional callback to execute on error
     */
    createBook(
        data: BookData,
        onSuccess?: () => void,
        onError?: (errors: unknown) => void,
    ): void;

    /**
     * Deletes a book by ID
     * @param id The ID of the book to delete
     * @param onSuccess Optional callback to execute on successful deletion
     * @param onError Optional callback to execute on error
     */
    deleteBook(
        id: number,
        onSuccess?: () => void,
        onError?: (errors: unknown) => void,
    ): void;

    /**
     * Updates an existing book
     * @param id The ID of the book to update
     * @param data The partial book data to update
     * @param onSuccess Optional callback to execute on successful update
     * @param onError Optional callback to execute on error
     */
    updateBook(
        id: number,
        data: Partial<Book>,
        onSuccess?: () => void,
        onError?: (errors: unknown) => void,
    ): void;
}
