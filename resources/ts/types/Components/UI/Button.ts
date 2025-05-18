import { ButtonHTMLAttributes, ReactNode } from "react";

export enum ButtonVariant {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    SUCCESS = "success",
    DANGER = "danger",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: ReactNode;
    fullWidth?: boolean;
}
