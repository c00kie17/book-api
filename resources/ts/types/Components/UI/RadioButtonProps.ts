import { InputHTMLAttributes } from "react";

export interface RadioButtonProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    id: string;
    label: string;
    value: string;
    checked: boolean;
    onChange: () => void;
    className?: string;
}
