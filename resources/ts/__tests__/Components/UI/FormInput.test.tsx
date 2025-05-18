import { render, screen } from "@testing-library/react";

import FormInput from "../../../Components/UI/FormInput.tsx";

describe("FormInput Component", () => {
    test("renders with label and input field", () => {
        render(
            <FormInput
                id="test-input"
                label="Test Label"
                value=""
                onChange={() => {}}
            />,
        );

        expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
        expect(screen.getByLabelText("Test Label").tagName).toBe("INPUT");
    });

    test("shows error message when provided", () => {
        render(
            <FormInput
                id="test-input"
                label="Test Label"
                value=""
                onChange={() => {}}
                error="This field is required"
            />,
        );

        expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    test("applies error styling to input when error is provided", () => {
        render(
            <FormInput
                id="test-input"
                label="Test Label"
                value=""
                onChange={() => {}}
                error="This field is required"
            />,
        );

        const input = screen.getByLabelText("Test Label");
        expect(input).toHaveClass("border-red-500");
        expect(input).not.toHaveClass("border-gray-300");
    });

    test("applies normal styling to input when no error", () => {
        render(
            <FormInput
                id="test-input"
                label="Test Label"
                value=""
                onChange={() => {}}
            />,
        );

        const input = screen.getByLabelText("Test Label");
        expect(input).toHaveClass("border-gray-300");
        expect(input).not.toHaveClass("border-red-500");
    });

    test("displays placeholder when provided", () => {
        render(
            <FormInput
                id="test-input"
                label="Test Label"
                value=""
                onChange={() => {}}
                placeholder="Enter value here"
            />,
        );

        expect(
            screen.getByPlaceholderText("Enter value here"),
        ).toBeInTheDocument();
    });

    test("sets input type when provided", () => {
        render(
            <FormInput
                id="test-input"
                label="Test Label"
                value=""
                onChange={() => {}}
                type="password"
            />,
        );

        const input = screen.getByLabelText("Test Label");
        expect(input).toHaveAttribute("type", "password");
    });
});
