export interface EditableFieldProps {
    value: string;
    onUpdate: (value: string) => void;
    className?: string;
    label?: string;
    placeholder?: string;
}
