import { ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    primaryActionText: string;
    onPrimaryAction: () => void;
    isPrimaryActionDisabled?: boolean;
    isProcessing?: boolean;
    secondaryActionText?: string;
}
