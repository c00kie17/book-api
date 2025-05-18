import { render, screen } from "@testing-library/react";

import BookList from "../../Components/BookList";
import { SortDirection } from "../../types/Enums/SortDirection";
import { Book } from "../../types/Services/BookService";
import { BookServiceMock } from "../__mocks__/Services/BookService";

jest.mock("../../Components/BookRow.tsx", () =>
    jest.requireActual("../__mocks__/Components/BookRow.tsx")
);

jest.mock("../../Components/UI/TableHeaderField.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/TableHeaderField.tsx")
);

describe("BookList Component", () => {
    const bookServiceMock = new BookServiceMock();
    const mockOnSort = jest.fn();

    const mockBooks: Book[] = [
        { id: 1, title: "Test Book 1", author: "Author 1" },
        { id: 2, title: "Test Book 2", author: "Author 2" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders books when provided", () => {
        render(
            <BookList
                books={mockBooks}
                bookService={bookServiceMock}
                sortBy="id"
                sortDirection={SortDirection.DESC}
                searchTerm=""
                onSort={mockOnSort}
            />
        );

        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Author")).toBeInTheDocument();
        expect(screen.getByText("Actions")).toBeInTheDocument();


        expect(screen.getAllByTestId(/^book-row-/)).toHaveLength(2);

        expect(screen.getByTestId("book-row-1")).toBeInTheDocument();
        expect(screen.getByTestId("book-row-2")).toBeInTheDocument();
    });

    test("displays 'No books found' when books array is empty", () => {
        render(
            <BookList
                books={[]}
                bookService={bookServiceMock}
                sortBy="id"
                sortDirection={SortDirection.DESC}
                searchTerm=""
                onSort={mockOnSort}
            />
        );

        expect(screen.getByText("No books found")).toBeInTheDocument();
    });

    test("displays 'No books match your search' when books array is empty and searchTerm is provided", () => {
        render(
            <BookList
                books={[]}
                bookService={bookServiceMock}
                sortBy="id"
                sortDirection={SortDirection.DESC}
                searchTerm="test query"
                onSort={mockOnSort}
            />
        );

        expect(screen.getByText("No books match your search")).toBeInTheDocument();
    });

});
