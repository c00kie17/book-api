import { render, screen } from "@testing-library/react";

import ExportForm from "../../Components/ExportForm";
import { BookServiceMock } from "../__mocks__/Services/BookService";

jest.mock("../../Components/UI/CheckBox.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/CheckBox.tsx"),
);

jest.mock("../../Components/UI/CheckBoxGroup.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/CheckBoxGroup.tsx"),
);

jest.mock("../../Components/UI/RadioButton.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/RadioButton.tsx"),
);

jest.mock("../../Components/UI/RadioGroup.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/RadioGroup.tsx"),
);

jest.mock("../../Components/UI/Model.tsx", () =>
    jest.requireActual("../__mocks__/Components/UI/Modal.tsx"),
);

describe("ExportForm Component", () => {
    const bookServiceMock = new BookServiceMock();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders form in modal when isOpen is true", () => {
        render(
            <ExportForm
                isOpen={true}
                onClose={mockOnClose}
                bookService={bookServiceMock}
            />,
        );

        expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
        expect(screen.getByTestId("mock-modal")).toHaveAttribute(
            "data-title",
            "Export Books",
        );

        expect(screen.getByTestId("radio-group")).toBeInTheDocument();
        expect(screen.getByTestId("radio-group")).toHaveAttribute(
            "data-label",
            "Export Format",
        );

        expect(
            screen.getByTestId("radio-button-format-csv"),
        ).toBeInTheDocument();
        expect(screen.getByTestId("radio-button-format-csv")).toHaveAttribute(
            "data-checked",
            "true",
        );

        expect(
            screen.getByTestId("radio-button-format-xml"),
        ).toBeInTheDocument();
        expect(screen.getByTestId("radio-button-format-xml")).toHaveAttribute(
            "data-checked",
            "false",
        );

        expect(screen.getByTestId("checkbox-group")).toBeInTheDocument();
        expect(screen.getByTestId("checkbox-group")).toHaveAttribute(
            "data-label",
            "Fields to Export",
        );

        expect(screen.getByTestId("checkbox-field-title")).toBeInTheDocument();
        expect(screen.getByTestId("checkbox-field-title")).toHaveAttribute(
            "data-checked",
            "true",
        );

        expect(screen.getByTestId("checkbox-field-author")).toBeInTheDocument();
        expect(screen.getByTestId("checkbox-field-author")).toHaveAttribute(
            "data-checked",
            "true",
        );
    });
});
