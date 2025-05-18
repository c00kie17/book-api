import { render, screen, fireEvent } from "@testing-library/react";

import TableHeaderField from "../../../Components/UI/TableHeaderField.tsx";
import { SortDirection } from "../../../types/Enums/SortDirection.ts";

jest.mock("lucide-react", () => ({
    ArrowUp: () => <span data-testid="arrow-up">↑</span>,
    ArrowDown: () => <span data-testid="arrow-down">↓</span>,
}));

jest.mock("../../../Components/UI/EditableField.tsx", () =>
    jest.requireActual("../../__mocks__/Components/UI/EditableField.tsx"),
);

describe("TableHeaderField Component", () => {
    test("renders with children content", () => {
        render(
            <table>
                <thead>
                    <tr>
                        <TableHeaderField>Header Text</TableHeaderField>
                    </tr>
                </thead>
            </table>,
        );

        expect(screen.getByText("Header Text")).toBeInTheDocument();
    });

    test("renders as plain header when not sortable", () => {
        render(
            <table>
                <thead>
                    <tr>
                        <TableHeaderField sortable={false}>
                            Header Text
                        </TableHeaderField>
                    </tr>
                </thead>
            </table>,
        );

        expect(
            screen.queryByTestId("sort-header-undefined"),
        ).not.toBeInTheDocument();
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    test("shows up arrow when column is sorted ascending", () => {
        const mockOnSort = jest.fn();

        render(
            <table>
                <thead>
                    <tr>
                        <TableHeaderField
                            sortable={true}
                            sortKey="name"
                            currentSortKey="name"
                            currentSortDirection={SortDirection.ASC}
                            onSort={mockOnSort}
                        >
                            Header Text
                        </TableHeaderField>
                    </tr>
                </thead>
            </table>,
        );

        expect(screen.getByTestId("arrow-up")).toBeInTheDocument();
        expect(screen.queryByTestId("arrow-down")).not.toBeInTheDocument();
    });

    test("shows down arrow when column is sorted descending", () => {
        const mockOnSort = jest.fn();

        render(
            <table>
                <thead>
                    <tr>
                        <TableHeaderField
                            sortable={true}
                            sortKey="name"
                            currentSortKey="name"
                            currentSortDirection={SortDirection.DESC}
                            onSort={mockOnSort}
                        >
                            Header Text
                        </TableHeaderField>
                    </tr>
                </thead>
            </table>,
        );

        expect(screen.getByTestId("arrow-down")).toBeInTheDocument();
        expect(screen.queryByTestId("arrow-up")).not.toBeInTheDocument();
    });

    test("does not show sort arrows when not sorted", () => {
        const mockOnSort = jest.fn();

        render(
            <table>
                <thead>
                    <tr>
                        <TableHeaderField
                            sortable={true}
                            sortKey="name"
                            currentSortKey="other"
                            onSort={mockOnSort}
                        >
                            Header Text
                        </TableHeaderField>
                    </tr>
                </thead>
            </table>,
        );

        expect(screen.queryByTestId("arrow-up")).not.toBeInTheDocument();
        expect(screen.queryByTestId("arrow-down")).not.toBeInTheDocument();
    });

    test("calls onSort with sortKey and ASC when unsorted column is clicked", () => {
        const mockOnSort = jest.fn();

        render(
            <table>
                <thead>
                    <tr>
                        <TableHeaderField
                            sortable={true}
                            sortKey="name"
                            currentSortKey="other"
                            onSort={mockOnSort}
                        >
                            Header Text
                        </TableHeaderField>
                    </tr>
                </thead>
            </table>,
        );

        fireEvent.click(screen.getByTestId("sort-header-name"));

        expect(mockOnSort).toHaveBeenCalledTimes(1);
        expect(mockOnSort).toHaveBeenCalledWith("name", SortDirection.ASC);
    });

    test("toggles sort direction from ASC to DESC when already sorted column is clicked", () => {
        const mockOnSort = jest.fn();

        render(
            <table>
                <thead>
                    <tr>
                        <TableHeaderField
                            sortable={true}
                            sortKey="name"
                            currentSortKey="name"
                            currentSortDirection={SortDirection.ASC}
                            onSort={mockOnSort}
                        >
                            Header Text
                        </TableHeaderField>
                    </tr>
                </thead>
            </table>,
        );

        fireEvent.click(screen.getByTestId("sort-header-name"));

        expect(mockOnSort).toHaveBeenCalledTimes(1);
        expect(mockOnSort).toHaveBeenCalledWith("name", SortDirection.DESC);
    });
});
