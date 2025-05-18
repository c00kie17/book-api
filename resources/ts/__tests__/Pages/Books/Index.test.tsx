import { render, screen, fireEvent } from "@testing-library/react";

import Index from "../../../Pages/Books/Index";
import { Book } from "../../../types/Services/BookService.js";

jest.mock("@inertiajs/react", () => ({
    router: {
        post: jest.fn(),
        delete: jest.fn(),
        patch: jest.fn(),
    },
    useForm: () => ({
        data: {},
        setData: jest.fn(),
        processing: false,
        errors: {},
        reset: jest.fn(),
        post: jest.fn(),
        delete: jest.fn(),
        patch: jest.fn(),
    }),
    Head: ({ title }: { title: string }) => (
        <title data-testid="page-title">{title}</title>
    ),
}));

jest.mock("../../../Components/BookForm.tsx", () =>
    jest.requireActual("../../__mocks__/Components/BookForm.tsx"),
);

jest.mock("../../../Components/BookList", () =>
    jest.requireActual("../../__mocks__/Components/BookList.tsx"),
);

jest.mock("../../../Components/SortableTableHeader", () =>
    jest.requireActual("../../__mocks__/Components/SortableTableHeader.tsx"),
);

jest.mock("../../../Components/SearchBar", () =>
    jest.requireActual("../../__mocks__/Components/SearchBar.tsx"),
);

jest.mock("../../../Components/ExportForm", () =>
    jest.requireActual("../../__mocks__/Components/ExportForm.tsx"),
);

describe("Index Page Component", () => {
    const mockBooks: Book[] = [
        { id: 1, title: "Book 1", author: "Author 1" },
        { id: 2, title: "Book 2", author: "Author 2" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders book list with provided books", () => {
        render(<Index books={mockBooks} />);

        const bookList = screen.getByTestId("book-list");
        expect(bookList).toBeInTheDocument();
        expect(JSON.parse(bookList.getAttribute("data-books") || "[]")).toEqual(
            mockBooks,
        );
    });

    test("renders search bar", () => {
        render(<Index books={mockBooks} />);

        const searchBar = screen.getByTestId("search-bar");
        expect(searchBar).toBeInTheDocument();

        const searchInput = screen.getByTestId("search-input");
        expect(searchInput).toBeInTheDocument();
    });

    test("opens book form when Add New Book button is clicked", () => {
        render(<Index books={mockBooks} />);

        expect(screen.queryByTestId("book-form")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Add New Book"));

        expect(screen.getByTestId("book-form")).toBeInTheDocument();
    });

    test("closes book form when form is closed", () => {
        render(<Index books={mockBooks} />);

        fireEvent.click(screen.getByText("Add New Book"));
        expect(screen.getByTestId("book-form")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Cancel"));
        expect(screen.queryByTestId("book-form")).not.toBeInTheDocument();
    });

    test("opens export form when Export button is clicked", () => {
        render(<Index books={mockBooks} />);

        expect(screen.queryByTestId("export-form")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Export"));

        expect(screen.getByTestId("export-form")).toBeInTheDocument();
    });

    test("closes export form when form is closed", () => {
        render(<Index books={mockBooks} />);

        fireEvent.click(screen.getByText("Export"));
        expect(screen.getByTestId("export-form")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Cancel"));

        expect(screen.queryByTestId("export-form")).not.toBeInTheDocument();
    });
});
