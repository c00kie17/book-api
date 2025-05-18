import * as React from "react";

import {
    ButtonProps,
    ButtonVariant,
} from "../../../../types/Components/UI/Button.ts";

class ButtonMock extends React.Component<ButtonProps> {
    render(): React.ReactNode {
        const {
            variant = ButtonVariant.PRIMARY,
            children,
            fullWidth = false,
            className = "",
            ...props
        } = this.props;

        return (
            <button
                data-testid={`button-${variant}`}
                data-fullwidth={fullWidth}
                className={className}
                {...props}
            >
                {children}
            </button>
        );
    }
}

export default ButtonMock;
