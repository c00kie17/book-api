import { ChangeEvent } from "react";

export interface FormInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    type?: string;
    className?: string;
}
