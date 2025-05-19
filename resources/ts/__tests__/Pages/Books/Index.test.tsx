import { render, screen, fireEvent } from "@testing-library/react";

import Index from "../../../Pages/Books/Index";
import { SortDirection } from "../../../types/Enums/SortDirection.ts";
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

jest.mock("../../../Components/CreateForm.tsx", () =>
    jest.requireActual("../../__mocks__/Components/CreateForm.tsx"),
);

jest.mock("../../../Components/BookList", () =>
    jest.requireActual("../../__mocks__/Components/BookList.tsx"),
);

jest.mock("../../../Components/UI/TableHeaderField.tsx", () =>
    jest.requireActual("../../__mocks__/Components/SortableTableHeader.tsx"),
);

jest.mock("../../../Components/SearchBar", () =>
    jest.requireActual("../../__mocks__/Components/SearchBar.tsx"),
);

jest.mock("../../../Components/ExportForm", () =>
    jest.requireActual("../../__mocks__/Components/ExportForm.tsx"),
);

jest.mock("../../../Services/BookService", () => {
    const { BookServiceMock } = jest.requireActual(
        "../../__mocks__/Services/BookService",
    );
    const mockInstance = new BookServiceMock();
    mockInstance.getAllBooks.mockImplementation(
        (
            _field: string,
            _direction: SortDirection,
            _searchTerm: string,
            onSuccess?: (data: Book[]) => void,
        ) => {
            if (onSuccess) {
                onSuccess([
                    { id: 1, title: "Book 1", author: "Author 1" },
                    { id: 2, title: "Book 2", author: "Author 2" },
                ]);
            }
        },
    );
    return jest.fn(() => mockInstance);
});

describe("Index Page Component", () => {
    const mockBooks: Book[] = [
        { id: 1, title: "Book 1", author: "Author 1" },
        { id: 2, title: "Book 2", author: "Author 2" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders book list with provided books", () => {
        render(<Index />);

        const bookList = screen.getByTestId("book-list");
        expect(bookList).toBeInTheDocument();
        expect(JSON.parse(bookList.getAttribute("data-books") || "[]")).toEqual(
            mockBooks,
        );
    });

    test("renders search bar", () => {
        render(<Index />);

        const searchBar = screen.getByTestId("search-bar");
        expect(searchBar).toBeInTheDocument();

        const searchInput = screen.getByTestId("search-input");
        expect(searchInput).toBeInTheDocument();
    });

    test("opens book form when Add New Book button is clicked", () => {
        render(<Index />);

        expect(screen.queryByTestId("book-form")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Add New Book"));

        expect(screen.getByTestId("book-form")).toBeInTheDocument();
    });

    test("closes book form when form is closed", () => {
        render(<Index />);

        fireEvent.click(screen.getByText("Add New Book"));
        expect(screen.getByTestId("book-form")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Cancel"));
        expect(screen.queryByTestId("book-form")).not.toBeInTheDocument();
    });

    test("opens export form when Export button is clicked", () => {
        render(<Index />);

        expect(screen.queryByTestId("export-form")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Export"));

        expect(screen.getByTestId("export-form")).toBeInTheDocument();
    });

    test("closes export form when form is closed", () => {
        render(<Index />);

        fireEvent.click(screen.getByText("Export"));
        expect(screen.getByTestId("export-form")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Cancel"));

        expect(screen.queryByTestId("export-form")).not.toBeInTheDocument();
    });
});
