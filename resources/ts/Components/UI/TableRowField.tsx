import { TableRowFieldProps } from "../../types/Components/UI/TableRowField.ts";

import EditableField from "./EditableField.tsx";

export default function TableRowField({
    value,
    editable = false,
    onUpdate,
    className = "",
    align = "left",
}: TableRowFieldProps) {
    const alignmentClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    const baseTdClasses = `px-4 py-2 border-b ${alignmentClasses[align]} ${className}`;

    if (editable && onUpdate) {
        return (
            <td className={baseTdClasses}>
                <EditableField value={value} onUpdate={onUpdate} />
            </td>
        );
    }

    return <td className={baseTdClasses}>{value}</td>;
}
