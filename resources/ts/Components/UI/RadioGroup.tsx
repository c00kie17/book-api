import { RadioGroupProps } from "../../types/Components/UI/RadioGroup.ts";

export default function RadioGroup({
    label,
    children,
    className = "",
}: RadioGroupProps) {
    return (
        <div className={`mb-6 ${className}`}>
            <label className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <div className="mt-2 space-y-2">{children}</div>
        </div>
    );
}
