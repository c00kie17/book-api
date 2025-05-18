import { ReactNode } from "react";

export interface CheckBoxGroupProps {
    label: string;
    children: ReactNode;
    error?: string;
    className?: string;
}
