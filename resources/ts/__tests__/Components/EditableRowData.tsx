import { render, screen, fireEvent } from "@testing-library/react";

import EditableRowData from "../../Components/EditableRowData";
import { IBookService } from "../../Services/IBookService";
import { Book } from "../../types/Services/BookService";
import { BookServiceMock } from "../__mocks__/Services/BookService";

describe("EditableRowData Component", () => {
    const mockBook: Book = {
        id: 1,
        title: "Test Book",
        author: "Original Author",
    };
    const bookServiceMock: IBookService = new BookServiceMock();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders in non-editing mode by default", () => {
        render(
            <EditableRowData book={mockBook} bookService={bookServiceMock} />,
        );

        expect(screen.getByText("Original Author")).toBeInTheDocument();
        expect(screen.getByTitle("Edit")).toBeInTheDocument();
    });

    test("switches to edit mode when edit button is clicked", () => {
        render(
            <EditableRowData book={mockBook} bookService={bookServiceMock} />,
        );

        fireEvent.click(screen.getByTitle("Edit"));

        expect(screen.getByRole("textbox")).toHaveValue("Original Author");
        expect(screen.getByTitle("Save")).toBeInTheDocument();
        expect(screen.getByTitle("Cancel")).toBeInTheDocument();
    });

    test("calls updateBook with new author when save button is clicked", () => {
        render(
            <EditableRowData book={mockBook} bookService={bookServiceMock} />,
        );

        fireEvent.click(screen.getByTitle("Edit"));

        fireEvent.change(screen.getByRole("textbox"), {
            target: { value: "Updated Author" },
        });

        fireEvent.click(screen.getByTitle("Save"));

        expect(bookServiceMock.updateBook).toHaveBeenCalled();
        expect(bookServiceMock.updateBook).toHaveBeenCalledWith(
            1,
            { author: "Updated Author" },
            expect.any(Function),
        );
    });

    test("reverts to original author when cancel button is clicked", () => {
        render(
            <EditableRowData book={mockBook} bookService={bookServiceMock} />,
        );

        fireEvent.click(screen.getByTitle("Edit"));

        fireEvent.change(screen.getByRole("textbox"), {
            target: { value: "Updated Author" },
        });

        fireEvent.click(screen.getByTitle("Cancel"));

        expect(screen.getByText("Original Author")).toBeInTheDocument();
        expect(bookServiceMock.updateBook).not.toHaveBeenCalled();
    });
});
