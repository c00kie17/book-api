import { Pencil, Check, X } from "lucide-react";
import { useState, ChangeEvent } from "react";

import { EditableFieldProps } from "../../types/Components/UI/EditableField.ts";

export default function EditableField({
    value,
    onUpdate,
    className = "",
    label,
    placeholder = "Enter value...",
}: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<string>(value);
    const [originalValue] = useState<string>(value);

    const handleUpdate = (): void => {
        if (currentValue.trim() === "") return;
        onUpdate(currentValue);
        setIsEditing(false);
    };

    const handleCancel = (): void => {
        setIsEditing(false);
        setCurrentValue(originalValue);
    };

    if (isEditing) {
        return (
            <div className={`flex items-center space-x-2 ${className}`}>
                {label && (
                    <span className="text-sm text-gray-500">{label}:</span>
                )}
                <input
                    type="text"
                    value={currentValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCurrentValue(e.target.value)
                    }
                    className="border rounded px-2 py-1 flex-grow"
                    placeholder={placeholder}
                    autoFocus
                />
                <button
                    onClick={handleUpdate}
                    className="text-green-500 hover:text-green-600"
                    title="Save"
                    disabled={currentValue.trim() === ""}
                >
                    <Check className="h-5 w-5" />
                </button>
                <button
                    onClick={handleCancel}
                    className="text-red-500 hover:text-red-600"
                    title="Cancel"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        );
    }

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            {label && <span className="text-sm text-gray-500">{label}:</span>}
            <span>{value}</span>
            <button
                onClick={() => {
                    setCurrentValue(value);
                    setIsEditing(true);
                }}
                className="text-blue-500 hover:text-blue-600"
                title="Edit"
            >
                <Pencil className="h-4 w-4" />
            </button>
        </div>
    );
}
