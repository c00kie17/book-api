import { waitFor } from "@testing-library/react";
import axios from "axios";

import API_CONFIG from "../../../config.ts";
import BookService from "../../Services/BookService";
import { IBookService } from "../../Services/IBookService.js";
import { SortDirection } from "../../types/Enums/SortDirection.ts";
import { Book, BookData } from "../../types/Services/BookService";

jest.mock("axios");

describe("BookService", () => {
    let bookService: IBookService;
    let mockedAxios: jest.MockedFunction<typeof axios>;

    beforeEach(() => {
        jest.clearAllMocks();
        bookService = new BookService(API_CONFIG.BASE_URL);
        mockedAxios = axios as jest.MockedFunction<typeof axios>;
    });

    test("createBook calls router.post with correct parameters", async () => {
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        const mockData: BookData = {
            title: "Test Book",
            author: "Test Author",
        };

        mockedAxios.mockResolvedValue({
            data: {
                data: { id: 1, title: "Test Book", author: "Test Author" },
                message: "Book created successfully",
            },
        });

        bookService.createBook(mockData, mockOnSuccess, mockOnError);

        await waitFor(() => {
            expect(mockedAxios).toHaveBeenCalledWith({
                method: "post",
                url: `${API_CONFIG.BASE_URL}/books`,
                data: mockData,
                responseType: "json",
            });

            expect(mockOnSuccess).toHaveBeenCalledWith({
                id: 1,
                title: "Test Book",
                author: "Test Author",
            });
        });
    });

    test("deleteBook calls axios with correct parameters", async () => {
        const bookId: number = 1;
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        mockedAxios.mockImplementationOnce(async () => {
            return {
                data: {
                    message: "Book deleted successfully",
                },
            };
        });

        bookService.deleteBook(bookId, mockOnSuccess, mockOnError);

        await waitFor(() => {
            expect(mockedAxios).toHaveBeenCalledWith({
                method: "delete",
                url: `${API_CONFIG.BASE_URL}/books/1`,
                data: undefined,
                responseType: "json",
            });

            expect(mockOnSuccess).toHaveBeenCalled();
        });
    });

    test("updateBook calls axios with correct parameters", async () => {
        const bookId: number = 1;
        const mockData: Partial<Book> = { author: "Updated Author" };
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        mockedAxios.mockImplementationOnce(async () => {
            return {
                data: {
                    data: {
                        id: 1,
                        title: "Test Book",
                        author: "Updated Author",
                    },
                    message: "Book updated successfully",
                },
            };
        });

        bookService.updateBook(bookId, mockData, mockOnSuccess, mockOnError);

        await waitFor(() => {
            expect(mockedAxios).toHaveBeenCalledWith({
                method: "patch",
                url: `${API_CONFIG.BASE_URL}/books/1`,
                data: mockData,
                responseType: "json",
            });

            expect(mockOnSuccess).toHaveBeenCalledWith({
                id: 1,
                title: "Test Book",
                author: "Updated Author",
            });
        });
    });

    test("getAllBooks calls axios with correct parameters", async () => {
        const field = "title";
        const direction = SortDirection.DESC;
        const searchTerm = "something";
        const mockOnSuccess = jest.fn();
        const mockOnError = jest.fn();

        const mockBooks = [
            { id: 1, title: "Book 1", author: "Author 1" },
            { id: 2, title: "Book 2", author: "Author 2" },
        ];

        mockedAxios.mockImplementationOnce(async () => {
            return {
                data: {
                    data: mockBooks,
                },
            };
        });

        bookService.getAllBooks(
            field,
            direction,
            searchTerm,
            mockOnSuccess,
            mockOnError,
        );

        await waitFor(() => {
            expect(mockedAxios).toHaveBeenCalledWith({
                method: "get",
                url: `${API_CONFIG.BASE_URL}/books?sort_by=title&sort_direction=desc&search_term=something`,
                data: undefined,
                responseType: "json",
            });

            expect(mockOnSuccess).toHaveBeenCalledWith(mockBooks);
        });
    });
});
