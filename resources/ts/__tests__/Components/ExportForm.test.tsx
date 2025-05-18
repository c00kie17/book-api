import {
    render,
    screen,
    fireEvent,
    RenderResult,
} from "@testing-library/react";

import ExportForm from "../../Components/ExportForm";
import { IBookService } from "../../Services/IBookService";
import { ExportFormat } from "../../types/Enums/ExportFormat";
import { BookServiceMock } from "../__mocks__/Services/BookService";

describe("ExportForm Component", () => {
    const bookServiceMock: IBookService = new BookServiceMock();
    const mockOnClose: jest.Mock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("does not render when isOpen is false", () => {
        const { container }: RenderResult = render(
            <ExportForm
                isOpen={false}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );
        expect(container.firstChild).toBeNull();
    });

    test("renders form when isOpen is true", () => {
        render(
            <ExportForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        expect(screen.getByText("Export Books")).toBeInTheDocument();
        expect(screen.getByText("Export Format")).toBeInTheDocument();
        expect(screen.getByText("Fields to Export")).toBeInTheDocument();
        expect(screen.getByLabelText("Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Author")).toBeInTheDocument();
    });

    test("calls onClose when cancel button is clicked", () => {
        render(
            <ExportForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        fireEvent.click(screen.getByText("Cancel"));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("submits form with export data", () => {
        render(
            <ExportForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        expect(screen.getByLabelText("Title")).toBeChecked();
        expect(screen.getByLabelText("Author")).toBeChecked();

        fireEvent.click(screen.getByText("Export"));

        expect(bookServiceMock.exportBooks).toHaveBeenCalledWith(
            ExportFormat.CSV,
            ["title", "author"],
        );

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("updates fields when checkboxes are toggled", () => {
        render(
            <ExportForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        fireEvent.click(screen.getByLabelText("Title"));
        fireEvent.click(screen.getByText("Export"));
        expect(bookServiceMock.exportBooks).toHaveBeenCalledWith(
            ExportFormat.CSV,
            ["author"],
        );
    });

    test("updates format when dropdown is changed", () => {
        render(
            <ExportForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        fireEvent.click(screen.getByLabelText("XML"));
        fireEvent.click(screen.getByLabelText("Title"));
        fireEvent.click(screen.getByText("Export"));

        expect(bookServiceMock.exportBooks).toHaveBeenCalledWith(
            ExportFormat.XML,
            ["author"],
        );
    });

    test("disables export button when no fields are selected", () => {
        render(
            <ExportForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        fireEvent.click(screen.getByLabelText("Title"));
        fireEvent.click(screen.getByLabelText("Author"));

        const exportButton = screen.getByText("Export");
        expect(exportButton).toBeDisabled();

        expect(
            screen.getByText("Please select at least one field to export"),
        ).toBeInTheDocument();
    });
});
