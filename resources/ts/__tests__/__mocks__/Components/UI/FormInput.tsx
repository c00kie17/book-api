import * as React from "react";
import {FormInputProps} from "../../../../types/Components/UI/FormInput.ts";

class FormInputMock extends React.Component<FormInputProps>  {
    render(): React.ReactNode {
        const { id, label, value, onChange, error, placeholder, className = "" } = this.props;

        return (
            <div
                data-testid={`form-input-${id}`}
                data-label={label}
                data-value={value}
                data-error={error}
                data-placeholder={placeholder}
                className={className}
            >
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        );
    }
}

export default FormInputMock;
