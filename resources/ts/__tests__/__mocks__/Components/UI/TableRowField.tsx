import * as React from "react";
import {TableRowFieldProps} from "../../../../types/Components/UI/TableRowField.ts";

class TableRowFieldMock extends React.Component<TableRowFieldProps> {
    render(): React.ReactNode {
        const { value, editable = false, onUpdate, className = "", align = "left" } = this.props;

        return (
            <td
                data-testid={`table-row-field-${value.toString().toLowerCase().includes('author') ? 'author' :
                    value.toString() === '1' ? 'id' : 'title'}`}
                data-value={value}
                data-editable={editable ? "true" : "false"}
                data-align={align}
                className={className}
                onClick={() => editable && onUpdate && onUpdate(`updated-${value}`)}
            >
                {value}
            </td>
        );
    }
}

export default TableRowFieldMock;
