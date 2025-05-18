import { CheckBoxGroupProps } from "../../types/Components/UI/CheckBoxGroup.ts";

export default function CheckboxGroup({
    label,
    children,
    error,
    className = "",
}: CheckBoxGroupProps) {
    return (
        <div className={`mb-6 ${className}`}>
            <label className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <div className="mt-2 space-y-2">{children}</div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
