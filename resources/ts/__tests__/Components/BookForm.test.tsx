import {
    render,
    screen,
    fireEvent,
    RenderResult,
} from "@testing-library/react";

import BookForm from "../../Components/BookForm";
import { IBookService } from "../../Services/IBookService";
import { BookServiceMock } from "../__mocks__/Services/BookService";

describe("BookForm Component", () => {
    const bookServiceMock: IBookService = new BookServiceMock();
    const mockOnClose: jest.Mock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("does not render when isOpen is false", () => {
        const { container }: RenderResult = render(
            <BookForm
                isOpen={false}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );
        expect(container.firstChild).toBeNull();
    });

    test("renders form when isOpen is true", () => {
        render(
            <BookForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        expect(screen.getByText("Add New Book")).toBeInTheDocument();
        expect(screen.getByLabelText("Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Author")).toBeInTheDocument();
    });

    test("calls onClose when cancel button is clicked", () => {
        render(
            <BookForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        fireEvent.click(screen.getByText("Cancel"));

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("submits form with book data", () => {
        render(
            <BookForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        fireEvent.change(screen.getByLabelText("Title"), {
            target: { value: "New Book Title" },
        });
        fireEvent.change(screen.getByLabelText("Author"), {
            target: { value: "New Book Author" },
        });

        fireEvent.click(screen.getByText("Add Book"));

        expect(bookServiceMock.createBook).toHaveBeenCalled();
    });
});
