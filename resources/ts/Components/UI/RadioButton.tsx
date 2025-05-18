import { RadioButtonProps } from "../../types/Components/UI/RadioButtonProps.ts";

export default function RadioButton({
    id,
    label,
    value,
    checked,
    onChange,
    name,
    className = "",
    ...props
}: RadioButtonProps) {
    return (
        <div className={`flex items-center ${className}`}>
            <input
                id={id}
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
                name={name}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                {...props}
            />
            <label htmlFor={id} className="ml-2 block text-gray-700">
                {label}
            </label>
        </div>
    );
}
