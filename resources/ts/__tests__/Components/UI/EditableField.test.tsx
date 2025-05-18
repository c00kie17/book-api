import { render, screen, fireEvent } from "@testing-library/react";
import EditableField from "../../../Components/UI/EditableField.tsx";

jest.mock("lucide-react", () => ({
    Pencil: () => <span data-testid="pencil-icon">✏️</span>,
    Check: () => <span data-testid="check-icon">✓</span>,
    X: () => <span data-testid="x-icon">✗</span>,
}));

describe("EditableField Component", () => {
    const mockOnUpdate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders in view mode by default", () => {
        render(
            <EditableField
                value="Initial Value"
                onUpdate={mockOnUpdate}
            />
        );

        expect(screen.getByText("Initial Value")).toBeInTheDocument();
        expect(screen.getByTestId("pencil-icon")).toBeInTheDocument();
        expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
        expect(screen.queryByTestId("x-icon")).not.toBeInTheDocument();
    });

    test("renders with label when provided", () => {
        render(
            <EditableField
                value="Initial Value"
                onUpdate={mockOnUpdate}
                label="Test Label"
            />
        );

        expect(screen.getByText("Test Label:")).toBeInTheDocument();
        expect(screen.getByText("Initial Value")).toBeInTheDocument();
    });

    test("switches to edit mode when edit button is clicked", () => {
        render(
            <EditableField
                value="Initial Value"
                onUpdate={mockOnUpdate}
            />
        );

        fireEvent.click(screen.getByTitle("Edit"));

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("Initial Value");
        expect(screen.getByTitle("Save")).toBeInTheDocument();
        expect(screen.getByTitle("Cancel")).toBeInTheDocument();
    });

    test("updates input value when typing", () => {
        render(
            <EditableField
                value="Initial Value"
                onUpdate={mockOnUpdate}
            />
        );

        fireEvent.click(screen.getByTitle("Edit"));

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Updated Value" } });

        expect(input).toHaveValue("Updated Value");
    });

    test("calls onUpdate with new value when save button is clicked", () => {
        render(
            <EditableField
                value="Initial Value"
                onUpdate={mockOnUpdate}
            />
        );

        fireEvent.click(screen.getByTitle("Edit"));

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Updated Value" } });

        fireEvent.click(screen.getByTitle("Save"));

        expect(mockOnUpdate).toHaveBeenCalledWith("Updated Value");
        expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    });

    test("reverts to original value when cancel button is clicked", () => {
        render(
            <EditableField
                value="Initial Value"
                onUpdate={mockOnUpdate}
            />
        );

        fireEvent.click(screen.getByTitle("Edit"));

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Updated Value" } });

        fireEvent.click(screen.getByTitle("Cancel"));

        expect(screen.getByText("Initial Value")).toBeInTheDocument();
        expect(mockOnUpdate).not.toHaveBeenCalled();
    });

    test("prevents saving empty values", () => {
        render(
            <EditableField
                value="Initial Value"
                onUpdate={mockOnUpdate}
            />
        );

        fireEvent.click(screen.getByTitle("Edit"));

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "" } });

        const saveButton = screen.getByTitle("Save");
        expect(saveButton).toBeDisabled();

        fireEvent.click(saveButton);
        expect(mockOnUpdate).not.toHaveBeenCalled();
    });

    test("handles whitespace-only values as empty", () => {
        render(
            <EditableField
                value="Initial Value"
                onUpdate={mockOnUpdate}
            />
        );

        fireEvent.click(screen.getByTitle("Edit"));

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "   " } });

        const saveButton = screen.getByTitle("Save");
        expect(saveButton).toBeDisabled();
    });

});
