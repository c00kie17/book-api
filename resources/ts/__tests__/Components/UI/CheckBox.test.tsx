import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "../../../Components/UI/CheckBox.tsx";


describe("Checkbox Component", () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders with label", () => {
        render(
            <Checkbox
                id="test-checkbox"
                label="Test Label"
                checked={false}
                onChange={mockOnChange}
            />
        );

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });


    test("renders in unchecked state when checked is false", () => {
        render(
            <Checkbox
                id="test-checkbox"
                label="Test Label"
                checked={false}
                onChange={mockOnChange}
            />
        );

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    test("renders in checked state when checked is true", () => {
        render(
            <Checkbox
                id="test-checkbox"
                label="Test Label"
                checked={true}
                onChange={mockOnChange}
            />
        );

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    test("calls onChange when clicked", () => {
        render(
            <Checkbox
                id="test-checkbox"
                label="Test Label"
                checked={false}
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByRole("checkbox"));
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});
