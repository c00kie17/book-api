import * as React from "react";

import { RadioButtonProps } from "../../../../types/Components/UI/RadioButtonProps.ts";

class RadioButtonMock extends React.Component<RadioButtonProps> {
    render(): React.ReactNode {
        const { id, name, value, checked, onChange, label } = this.props;

        return (
            <div
                data-testid={`radio-button-${id}`}
                data-name={name}
                data-value={value}
                data-checked={checked ? "true" : "false"}
            >
                <input
                    type="radio"
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

export default RadioButtonMock;
