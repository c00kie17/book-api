import { render, screen } from "@testing-library/react";

import BookList from "../../Components/BookList.tsx";
import BookRow from "../../Components/BookRow.tsx";
import { Book } from "../../types/Services/BookService";
import { BookServiceMock } from "../__mocks__/Services/BookService";

jest.mock("../../Components/BookRow", () => ({
    __esModule: true,
    default: BookRow,
}));

describe("BookList Component", () => {
    const bookServiceMock = new BookServiceMock();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders books when provided", () => {
        const books: Book[] = [
            { id: 1, title: "Test Book 1", author: "Author 1" },
            { id: 2, title: "Test Book 2", author: "Author 2" },
        ];

        render(<BookList books={books} bookService={bookServiceMock} />);

        expect(screen.getByTestId("book-row-1")).toBeInTheDocument();
        expect(screen.getByTestId("book-row-2")).toBeInTheDocument();
    });

    test('displays "No books found" when no books provided', () => {
        render(<BookList books={[]} bookService={bookServiceMock} />);
        expect(screen.getByText("No books found")).toBeInTheDocument();
    });
});
