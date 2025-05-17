import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";

import SearchBar from "../../Components/SearchBar";

import advanceTimersByTime = jest.advanceTimersByTime;

jest.mock("lucide-react", () => ({
    Search: () => <div data-testid="search-icon" />,
    X: () => <div data-testid="clear-icon" />,
}));
describe("SearchBar Component", () => {
    const mockOnSearch = jest.fn();
    const mockOnClear = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("renders with placeholder text", () => {
        render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

        expect(
            screen.getByPlaceholderText("Search by title or author..."),
        ).toBeInTheDocument();
    });

    test("renders with initial value", () => {
        render(
            <SearchBar
                initialValue="test query"
                onSearch={mockOnSearch}
                onClear={mockOnClear}
            />,
        );

        expect(
            screen.getByPlaceholderText("Search by title or author..."),
        ).toHaveValue("test query");
    });

    test("clear button is visible only when input has text", () => {
        render(
            <SearchBar
                initialValue=""
                onSearch={mockOnSearch}
                onClear={mockOnClear}
            />,
        );

        const clearButton = screen.queryByTestId("clear-icon");
        expect(clearButton).not.toBeInTheDocument();

        const input = screen.getByPlaceholderText(
            "Search by title or author...",
        );
        act(() => {
            fireEvent.change(input, { target: { value: "test query" } });
        });
        act(() => {
            advanceTimersByTime(500);
        });

        const visibleClearButton = screen.getByTestId("clear-icon");
        expect(visibleClearButton).toBeInTheDocument();
    });

    test("calls onSearch when typing with debounce", async () => {
        render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

        const input = screen.getByPlaceholderText(
            "Search by title or author...",
        );
        act(() => {
            fireEvent.change(input, { target: { value: "test query" } });
        });

        expect(mockOnSearch).not.toHaveBeenCalled();

        act(() => {
            advanceTimersByTime(500);
        });

        expect(mockOnSearch).toHaveBeenCalledWith("test query");
    });

    test("doesn't call onSearch for empty input after debounce", () => {
        render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} />);

        const input = screen.getByPlaceholderText(
            "Search by title or author...",
        );

        act(() => {
            fireEvent.change(input, { target: { value: "   " } });
        });

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(mockOnSearch).not.toHaveBeenCalled();
    });

    test("doesn't call onSearch when form is submitted with empty input", () => {
        render(
            <SearchBar
                initialValue=""
                onSearch={mockOnSearch}
                onClear={mockOnClear}
            />,
        );

        const form = screen.getByRole("textbox").closest("form");
        fireEvent.submit(form!);

        expect(mockOnSearch).not.toHaveBeenCalled();
    });

    test("calls onClear when clear button is clicked", () => {
        render(
            <SearchBar
                initialValue="test query"
                onSearch={mockOnSearch}
                onClear={mockOnClear}
            />,
        );

        const input = screen.getByPlaceholderText(
            "Search by title or author...",
        );
        expect(input).toHaveValue("test query");

        const clearButton = screen.getByRole("button", {
            name: /clear search/i,
        });
        fireEvent.click(clearButton);

        expect(mockOnClear).toHaveBeenCalledTimes(1);

        expect(input).toHaveValue("");
    });
});
