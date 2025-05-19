import { render, screen, fireEvent } from "@testing-library/react";

import BookRow from "../../Components/BookRow";
import { BookServiceMock } from "../__mocks__/Services/BookService";

jest.mock("../../Components/UI/TableRowField.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/TableRowField.tsx"),
);

jest.mock("../../Components/UI/Button.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/Button.tsx"),
);

const originalConfirm = window.confirm;
const confirmMock = jest.fn(() => true);

describe("BookRow Component", () => {
    const bookServiceMock = new BookServiceMock();
    const mockBook = {
        id: 1,
        title: "Test Book",
        author: "Test Author",
    };
    const mockOnDeleted = jest.fn();
    const mockOnUpdated = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        window.confirm = confirmMock;
    });

    afterAll(() => {
        window.confirm = originalConfirm;
    });

    test("renders book data correctly", () => {
        render(
            <table>
                <tbody>
                    <BookRow book={mockBook} bookService={bookServiceMock} />
                </tbody>
            </table>,
        );

        expect(screen.getByTestId("table-row-field-id")).toHaveAttribute(
            "data-value",
            "1",
        );
        expect(screen.getByTestId("table-row-field-title")).toHaveAttribute(
            "data-value",
            "Test Book",
        );
        expect(screen.getByTestId("table-row-field-author")).toHaveAttribute(
            "data-value",
            "Test Author",
        );

        expect(screen.getByTestId("button-danger")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    test("calls deleteBook when delete button is clicked and confirmed", async () => {
        render(
            <table>
                <tbody>
                    <BookRow
                        book={mockBook}
                        bookService={bookServiceMock}
                        onDeleted={mockOnDeleted}
                        onUpdated={mockOnUpdated}
                    />
                </tbody>
            </table>,
        );

        fireEvent.click(screen.getByText("Delete"));

        expect(confirmMock).toHaveBeenCalledWith(
            'Are you sure you want to delete "Test Book"?',
        );

        expect(bookServiceMock.deleteBook).toHaveBeenCalled();

        expect(bookServiceMock.deleteBook.mock.calls[0][0]).toBe(1);

        await new Promise(process.nextTick);

        expect(mockOnDeleted).toHaveBeenCalled();
    });
});
