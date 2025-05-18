import { FormInputProps } from "../../types/Components/UI/FormInput.ts";

export default function FormInput({
    id,
    label,
    value,
    onChange,
    error,
    placeholder,
    type = "text",
    className = "",
}: FormInputProps) {
    return (
        <div className={`mb-5 ${className}`}>
            <label
                htmlFor={id}
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"}`}
                placeholder={placeholder}
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
}
