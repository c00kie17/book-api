import * as React from "react";

import { ExportFormProps } from "../../../types/Components/ExportForm";

class ExportFormMock extends React.Component<ExportFormProps> {
    render(): React.ReactNode {
        const { isOpen, onClose } = this.props;

        if (!isOpen) return null;

        return (
            <div data-testid="export-form">
                <h2>Export Books</h2>
                <div data-testid="export-options">
                    <div data-testid="format-options">
                        <span>CSV</span>
                    </div>
                    <div data-testid="field-options">
                        <span>Title</span>
                        <span>Author</span>
                    </div>
                </div>
                <button data-testid="cancel-button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        );
    }
}

export default ExportFormMock;
