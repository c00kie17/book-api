import { render, screen } from "@testing-library/react";

import CreateForm from "../../Components/CreateForm";
import { BookServiceMock } from "../__mocks__/Services/BookService";

jest.mock("@inertiajs/react", () => ({
    useForm: () => ({
        data: { title: "", author: "" },
        setData: jest.fn(),
        processing: false,
        errors: {},
        reset: jest.fn(),
    }),
}));

jest.mock("../../Components/UI/FormInput.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/FormInput.tsx"),
);

jest.mock("../../Components/UI/Model.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/Modal.tsx"),
);

describe("CreateForm Component", () => {
    const bookServiceMock = new BookServiceMock();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders form in modal when isOpen is true", () => {
        render(
            <CreateForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
        expect(screen.getByTestId("mock-modal")).toHaveAttribute(
            "data-title",
            "Add New Book",
        );

        expect(screen.getByTestId("form-input-title")).toBeInTheDocument();
        expect(screen.getByTestId("form-input-title")).toHaveAttribute(
            "data-label",
            "Title",
        );

        expect(screen.getByTestId("form-input-author")).toBeInTheDocument();
        expect(screen.getByTestId("form-input-author")).toHaveAttribute(
            "data-label",
            "Author",
        );
    });
});
