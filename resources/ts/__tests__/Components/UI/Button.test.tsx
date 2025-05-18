
import { render, screen, fireEvent } from "@testing-library/react";
import {ButtonVariant} from "../../../types/Components/UI/Button.ts";
import Button from "../../../Components/UI/Button.tsx";


describe("Button Component", () => {
    test("renders with children content", () => {
        render(<Button>Click me</Button>);

        expect(screen.getByRole("button", {name: "Click me"})).toBeInTheDocument();
    });

    test("applies primary variant styles by default", () => {
        render(<Button>Click me</Button>);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-blue-500");
        expect(button).toHaveClass("hover:bg-blue-600");
        expect(button).toHaveClass("text-white");
    });

    test("applies success variant styles when specified", () => {
        render(<Button variant={ButtonVariant.SUCCESS}>Success</Button>);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-green-500");
        expect(button).toHaveClass("hover:bg-green-600");
        expect(button).toHaveClass("text-white");
    });

    test("applies secondary variant styles when specified", () => {
        render(<Button variant={ButtonVariant.SECONDARY}>Secondary</Button>);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-gray-500");
        expect(button).toHaveClass("hover:bg-gray-600");
        expect(button).toHaveClass("text-white");
    });

    test("applies danger variant styles when specified", () => {
        render(<Button variant={ButtonVariant.DANGER}>Danger</Button>);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-red-500");
        expect(button).toHaveClass("hover:bg-red-600");
        expect(button).toHaveClass("text-white");
    });

    test("calls onClick handler when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Clickable Button</Button>);

        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

})
