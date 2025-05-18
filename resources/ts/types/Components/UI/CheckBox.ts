import { InputHTMLAttributes } from "react";

export interface CheckBoxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    id: string;
    label: string;
    checked: boolean;
    onChange: () => void;
    className?: string;
}
