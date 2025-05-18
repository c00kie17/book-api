import * as React from "react";

import { TableHeaderFieldProps } from "../../../../types/Components/UI/TableHeaderField.ts";

class TableHeaderFieldMock extends React.Component<TableHeaderFieldProps> {
    render(): React.ReactNode {
        const {
            width,
            align = "left",
            sortable = false,
            sortKey,
            children,
        } = this.props;

        return (
            <th
                data-testid={`table-header-${sortKey || "default"}`}
                data-width={width}
                data-align={align}
                data-sortable={sortable ? "true" : "false"}
            >
                {children}
            </th>
        );
    }
}

export default TableHeaderFieldMock;
