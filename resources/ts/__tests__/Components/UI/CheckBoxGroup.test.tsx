import { render, screen } from "@testing-library/react";
import CheckboxGroup from "../../../Components/UI/CheckBoxGroup";


describe("CheckboxGroup Component", () => {
    test("renders with label and children", () => {
        render(
            <CheckboxGroup label="Test Group">
                <div data-testid="test-child">Child Element</div>
            </CheckboxGroup>
        );

        expect(screen.getByText("Test Group")).toBeInTheDocument();
        expect(screen.getByTestId("test-child")).toBeInTheDocument();
        expect(screen.getByText("Child Element")).toBeInTheDocument();
    });

    test("renders error message when provided", () => {
        render(
            <CheckboxGroup label="Test Group" error="Error message">
                <div>Child Element</div>
            </CheckboxGroup>
        );

        expect(screen.getByText("Error message")).toBeInTheDocument();
        expect(screen.getByText("Error message")).toHaveClass("text-red-500");
    });

});
