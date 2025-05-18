import { render, screen } from "@testing-library/react";
import RadioGroup from "../../../Components/UI/RadioGroup";


describe("RadioGroup Component", () => {
    test("renders with label", () => {
        render(
            <RadioGroup label="Test Group Label">
                <div data-testid="child-element">Child Content</div>
            </RadioGroup>
        );

        expect(screen.getByText("Test Group Label")).toBeInTheDocument();
    });

    test("renders children content", () => {
        render(
            <RadioGroup label="Test Group">
                <div data-testid="child-element">Child Content</div>
            </RadioGroup>
        );

        expect(screen.getByTestId("child-element")).toBeInTheDocument();
        expect(screen.getByText("Child Content")).toBeInTheDocument();
    });

});
