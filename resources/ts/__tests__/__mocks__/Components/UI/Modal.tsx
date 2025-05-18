
import * as React from "react";
import {ModalProps} from "../../../../types/Components/UI/Model.ts";

class ModalMock extends React.Component<ModalProps> {
    render(): React.ReactNode {
        const {
            isOpen,
            onClose,
            title,
            primaryActionText,
            onPrimaryAction,
            isPrimaryActionDisabled,
            isProcessing,
            children
        } = this.props;

        if (!isOpen) return null;

        return (
            <div
                data-testid="mock-modal"
                data-title={title}
                data-primary-action-text={primaryActionText}
                data-is-disabled={isPrimaryActionDisabled ? "true" : "false"}
                data-is-processing={isProcessing ? "true" : "false"}
            >
                <div data-testid="modal-header">
                    <h2>{title}</h2>
                </div>
                <div data-testid="modal-content">{children}</div>
                <div data-testid="modal-actions">
                    <button
                        onClick={onClose}
                        data-testid="modal-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onPrimaryAction}
                        disabled={isPrimaryActionDisabled || isProcessing}
                        data-testid="modal-primary"
                    >
                        {primaryActionText}
                    </button>
                </div>
            </div>
        );
    }
}

export default ModalMock;
