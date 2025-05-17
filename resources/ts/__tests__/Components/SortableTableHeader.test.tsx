import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";

import SortableTableHeader from "../../Components/SortableTableHeader.tsx";
import { SortDirection } from "../../types/Enums/SortDirection.ts";
import { BookServiceMock } from "../__mocks__/Services/BookService";

jest.mock("lucide-react", () => ({
    ArrowUp: ({
        className,
        ...props
    }: {
        className?: string;
        [key: string]: unknown;
    }) => (
        <div className={className} {...props}>
            ↑
        </div>
    ),
    ArrowDown: ({
        className,
        ...props
    }: {
        className?: string;
        [key: string]: unknown;
    }) => (
        <div className={className} {...props}>
            ↓
        </div>
    ),
}));

const TableWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <table>
        <thead>
            <tr>{children}</tr>
        </thead>
    </table>
);
describe("SortableTableHeader Component", () => {
    const bookServiceMock = new BookServiceMock();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(bookServiceMock, "getAllBooks");
    });

    test("renders with correct label and visual indicators", () => {
        render(
            <TableWrapper>
                <SortableTableHeader
                    column="title"
                    label="Book Title"
                    currentSort="id"
                    currentDirection={SortDirection.ASC}
                    bookService={bookServiceMock}
                    searchTerm={""}
                />
            </TableWrapper>,
        );

        expect(screen.getByText("Book Title")).toBeInTheDocument();

        expect(screen.queryByTestId("sort-arrow-up")).not.toBeInTheDocument();
        expect(screen.queryByTestId("sort-arrow-down")).not.toBeInTheDocument();

        expect(screen.getByTestId("sort-header-title")).toBeInTheDocument();
    });

    test("displays correct arrow based on current sort state", () => {
        render(
            <TableWrapper>
                <SortableTableHeader
                    column="title"
                    label="Book Title"
                    currentSort="title"
                    currentDirection={SortDirection.ASC}
                    bookService={bookServiceMock}
                    searchTerm={""}
                />
            </TableWrapper>,
        );

        expect(screen.getByTestId("sort-arrow-up")).toBeInTheDocument();
        expect(screen.queryByTestId("sort-arrow-down")).not.toBeInTheDocument();
    });

    test("handles click events and toggles sort direction correctly", () => {
        render(
            <TableWrapper>
                <SortableTableHeader
                    column="title"
                    label="Book Title"
                    currentSort="title"
                    currentDirection={SortDirection.ASC}
                    bookService={bookServiceMock}
                    searchTerm={""}
                />
            </TableWrapper>,
        );

        expect(screen.getByTestId("sort-arrow-up")).toBeInTheDocument();
        expect(screen.queryByTestId("sort-arrow-down")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("sort-header-title"));

        expect(bookServiceMock.getAllBooks).toHaveBeenCalledWith(
            "title",
            SortDirection.DESC,
        );
    });

    test("calls getAllBooks without searchTerm when searchTerm is not provided", () => {
        render(
            <TableWrapper>
                <SortableTableHeader
                    column="title"
                    label="Book Title"
                    currentSort="title"
                    currentDirection={SortDirection.ASC}
                    bookService={bookServiceMock}
                />
            </TableWrapper>,
        );

        fireEvent.click(screen.getByTestId("sort-header-title"));

        expect(bookServiceMock.getAllBooks).toHaveBeenCalledWith(
            "title",
            SortDirection.DESC,
            undefined,
        );
    });

    test("calls getAllBooks with searchTerm when searchTerm is provided and not empty", () => {
        const searchTerm = "test query";

        render(
            <TableWrapper>
                <SortableTableHeader
                    column="title"
                    label="Book Title"
                    currentSort="title"
                    currentDirection={SortDirection.ASC}
                    bookService={bookServiceMock}
                    searchTerm={searchTerm}
                />
            </TableWrapper>,
        );

        fireEvent.click(screen.getByTestId("sort-header-title"));

        expect(bookServiceMock.getAllBooks).toHaveBeenCalledWith(
            "title",
            SortDirection.DESC,
            searchTerm,
        );
    });
});
