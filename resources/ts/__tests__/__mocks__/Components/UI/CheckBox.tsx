import * as React from "react";

import { CheckBoxProps } from "../../../../types/Components/UI/CheckBox.ts";

class CheckBoxMock extends React.Component<CheckBoxProps> {
    render(): React.ReactNode {
        const { id, name, value, checked, onChange, label } = this.props;

        return (
            <div
                data-testid={`checkbox-${id}`}
                data-name={name}
                data-value={value}
                data-checked={checked ? "true" : "false"}
            >
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                />
                <label htmlFor={id}>{label}</label>
            </div>
        );
    }
}

export default CheckBoxMock;
