import { render, screen } from "@testing-library/react";

import TableRowField from "../../../Components/UI/TableRowField.tsx";

describe("TableRowField Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with basic value", () => {
        render(
            <table>
                <tbody>
                    <tr>
                        <TableRowField value="Test Value" />
                    </tr>
                </tbody>
            </table>,
        );

        expect(screen.getByText("Test Value")).toBeInTheDocument();
    });
});
