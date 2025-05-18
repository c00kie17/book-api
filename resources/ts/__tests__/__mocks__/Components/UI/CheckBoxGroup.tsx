import * as React from "react";

import { CheckBoxGroupProps } from "../../../../types/Components/UI/CheckBoxGroup.ts";

class CheckBoxGroupMock extends React.Component<CheckBoxGroupProps> {
    render(): React.ReactNode {
        const { label, error, children } = this.props;

        return (
            <div
                data-testid="checkbox-group"
                data-label={label}
                data-error={error}
            >
                <div data-testid="checkbox-group-label">{label}</div>
                <div data-testid="checkbox-group-options">{children}</div>
                {error && <div data-testid="checkbox-group-error">{error}</div>}
            </div>
        );
    }
}

export default CheckBoxGroupMock;
