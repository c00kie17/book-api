import {
    ButtonProps,
    ButtonVariant,
} from "../../types/Components/UI/Button.ts";

const getVariantStyles = (variant: ButtonVariant): string => {
    switch (variant) {
        case ButtonVariant.PRIMARY:
            return "bg-blue-500 hover:bg-blue-600 text-white";
        case ButtonVariant.SECONDARY:
            return "bg-gray-500 hover:bg-gray-600 text-white";
        case ButtonVariant.SUCCESS:
            return "bg-green-500 hover:bg-green-600 text-white";
        case ButtonVariant.DANGER:
            return "bg-red-500 hover:bg-red-600 text-white";
        default:
            return "bg-blue-500 hover:bg-blue-600 text-white";
    }
};

export default function Button({
    variant = ButtonVariant.PRIMARY,
    children,
    fullWidth = false,
    className = "",
    ...props
}: ButtonProps) {
    const variantStyle = getVariantStyles(variant);

    const baseColor =
        variant === ButtonVariant.PRIMARY ? "blue" : variant.toLowerCase();

    return (
        <button
            className={`
        ${variantStyle}
        py-2 px-4
        rounded-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${baseColor}-500
        transition-colors
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}
