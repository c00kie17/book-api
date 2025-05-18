import * as React from "react";
import {EditableFieldProps} from "../../../../types/Components/UI/EditableField.ts";

class EditableFieldMock extends React.Component<EditableFieldProps> {
    render(): React.ReactNode {
        const {
            value,
            onUpdate,
            className = "",
            label,
            placeholder = "Enter value...",
        } = this.props;

        return (
            <div
                data-testid="editable-field"
                data-value={value}
                data-label={label}
                data-placeholder={placeholder}
                className={className}
                onClick={() => onUpdate && onUpdate(`updated-${value}`)}
            >
                Mock Editable Field
            </div>
        );
    }
}

export default EditableFieldMock;
