import * as React from "react";

import { RadioGroupProps } from "../../../../types/Components/UI/RadioGroup.ts";

class RadioGroupMock extends React.Component<RadioGroupProps> {
    render(): React.ReactNode {
        const { label, children } = this.props;

        return (
            <div data-testid="radio-group" data-label={label}>
                <div data-testid="radio-group-label">{label}</div>
                <div data-testid="radio-group-options">{children}</div>
            </div>
        );
    }
}

export default RadioGroupMock;
