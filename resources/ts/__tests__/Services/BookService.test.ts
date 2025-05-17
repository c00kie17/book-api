import { router } from "@inertiajs/react";

import BookService from "../../Services/BookService";
import { IBookService } from "../../Services/IBookService.js";
import { SortDirection } from "../../types/Enums/SortDirection.ts";
import { Book, BookData } from "../../types/Services/BookService";

jest.mock("@inertiajs/react", () => ({
    router: {
        post: jest.fn(),
        delete: jest.fn(),
        patch: jest.fn(),
        get: jest.fn(),
    },
}));

describe("BookService", () => {
    let bookService: IBookService;

    beforeEach(() => {
        jest.clearAllMocks();
        bookService = new BookService();
    });

    test("createBook calls router.post with correct parameters", () => {
        const mockData: BookData = {
            title: "Test Book",
            author: "Test Author",
        };
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        bookService.createBook(mockData, mockOnSuccess, mockOnError);

        expect(router.post).toHaveBeenCalledWith(
            "/books",
            mockData,
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
                preserveState: true,
                preserveScroll: true,
            }),
        );
    });

    test("deleteBook calls router.delete with correct parameters", () => {
        const bookId: number = 1;
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        bookService.deleteBook(bookId, mockOnSuccess, mockOnError);

        expect(router.delete).toHaveBeenCalledWith(
            "/books/1",
            {},
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
                preserveState: true,
                preserveScroll: true,
            }),
        );
    });

    test("updateBook calls router.patch with correct parameters", () => {
        const bookId: number = 1;
        const mockData: Partial<Book> = { author: "Updated Author" };
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        bookService.updateBook(bookId, mockData, mockOnSuccess, mockOnError);

        expect(router.patch).toHaveBeenCalledWith(
            "/books/1",
            mockData,
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
                preserveState: true,
                preserveScroll: true,
            }),
        );
    });

    test("sortBooks calls router.get with correct parameters", () => {
        const field = "title";
        const direction = SortDirection.DESC;

        bookService.sortBooks(field, direction);

        expect(router.get).toHaveBeenCalledWith(
            "/books?sort_by=title&sort_direction=desc",
            {},
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
                preserveState: true,
                preserveScroll: true,
            }),
        );
    });
});
