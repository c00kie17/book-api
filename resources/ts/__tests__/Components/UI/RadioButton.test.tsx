import { render, screen, fireEvent } from "@testing-library/react";
import RadioButton from "../../../Components/UI/RadioButton.tsx";


describe("RadioButton Component", () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders with label", () => {
        render(
            <RadioButton
                id="test-radio"
                label="Test Label"
                value="test-value"
                checked={false}
                onChange={mockOnChange}
                name="test-group"
            />
        );

        expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });


    test("sets name attribute correctly", () => {
        render(
            <RadioButton
                id="test-radio"
                label="Test Label"
                value="test-value"
                checked={false}
                onChange={mockOnChange}
                name="test-group"
            />
        );

        const radio = screen.getByLabelText("Test Label");
        expect(radio).toHaveAttribute("name", "test-group");
    });

    test("sets value attribute correctly", () => {
        render(
            <RadioButton
                id="test-radio"
                label="Test Label"
                value="test-value"
                checked={false}
                onChange={mockOnChange}
                name="test-group"
            />
        );

        const radio = screen.getByLabelText("Test Label");
        expect(radio).toHaveAttribute("value", "test-value");
    });

    test("renders in unchecked state when checked is false", () => {
        render(
            <RadioButton
                id="test-radio"
                label="Test Label"
                value="test-value"
                checked={false}
                onChange={mockOnChange}
                name="test-group"
            />
        );

        const radio = screen.getByRole("radio");
        expect(radio).not.toBeChecked();
    });

    test("renders in checked state when checked is true", () => {
        render(
            <RadioButton
                id="test-radio"
                label="Test Label"
                value="test-value"
                checked={true}
                onChange={mockOnChange}
                name="test-group"
            />
        );

        const radio = screen.getByRole("radio");
        expect(radio).toBeChecked();
    });

    test("calls onChange when clicked", () => {
        render(
            <RadioButton
                id="test-radio"
                label="Test Label"
                value="test-value"
                checked={false}
                onChange={mockOnChange}
                name="test-group"
            />
        );

        fireEvent.click(screen.getByLabelText("Test Label"));
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

});
