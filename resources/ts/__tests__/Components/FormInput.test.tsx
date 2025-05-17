import { render, screen } from "@testing-library/react";

import FormInput from "../../Components/FormInput";

describe("FormInput Component", () => {
    test("renders correctly with label and input", () => {
        render(
            <FormInput
                id="testInput"
                label="Test Label"
                value="Test Value"
                onChange={() => {}}
                placeholder="Test Placeholder"
            />,
        );

        expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Test Placeholder")).toHaveValue(
            "Test Value",
        );
    });

    test("displays error message when provided", () => {
        render(
            <FormInput
                id="testInput"
                label="Test Label"
                value=""
                onChange={() => {}}
                error="This field is required"
            />,
        );

        expect(screen.getByText("This field is required")).toBeInTheDocument();
        const input = screen.getByLabelText("Test Label");
        expect(input.className).toContain("border-red-500");
    });
});
