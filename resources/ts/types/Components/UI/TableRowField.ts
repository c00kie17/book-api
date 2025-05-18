export interface TableRowFieldProps {
    value: string;
    editable?: boolean;
    onUpdate?: (value: string) => void;
    className?: string;
    align?: "left" | "center" | "right";
}
