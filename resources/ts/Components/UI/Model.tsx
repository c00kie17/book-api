import { X } from "lucide-react";

import { ButtonVariant } from "../../types/Components/UI/Button.ts";
import { ModalProps } from "../../types/Components/UI/Model.ts";

import Button from "./Button.tsx";

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    primaryActionText,
    onPrimaryAction,
    isPrimaryActionDisabled = false,
    isProcessing = false,
    secondaryActionText = "Cancel",
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            <div
                className={`bg-white rounded-lg shadow-xl w-full max-w-md relative z-10`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6">{children}</div>

                <div className="p-4 border-t flex justify-end space-x-3">
                    <Button
                        variant={ButtonVariant.SECONDARY}
                        type="button"
                        onClick={onClose}
                    >
                        {secondaryActionText}
                    </Button>
                    <Button
                        variant={ButtonVariant.PRIMARY}
                        type="button"
                        onClick={onPrimaryAction}
                        disabled={isPrimaryActionDisabled || isProcessing}
                    >
                        {isProcessing ? "Processing..." : primaryActionText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
