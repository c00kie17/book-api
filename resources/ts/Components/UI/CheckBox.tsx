import { CheckBoxProps } from "../../types/Components/UI/CheckBox.ts";

export default function Checkbox({
    id,
    label,
    checked,
    onChange,
    className = "",
    ...props
}: CheckBoxProps) {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                {...props}
            />
            <label htmlFor={id} className="ml-2 block text-gray-700">
                {label}
            </label>
        </div>
    );
}
