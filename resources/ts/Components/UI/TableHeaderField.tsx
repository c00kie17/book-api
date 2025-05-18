import { ArrowUp, ArrowDown } from "lucide-react";

import { TableHeaderFieldProps } from "../../types/Components/UI/TableHeaderField.ts";
import { SortDirection } from "../../types/Enums/SortDirection";

export default function TableHeaderField({
    children,
    className = "",
    align = "left",
    width,
    sortable = false,
    sortKey,
    currentSortKey,
    currentSortDirection = SortDirection.ASC,
    onSort,
}: TableHeaderFieldProps) {
    const alignmentClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    const style = width ? { width } : {};

    const isSorted = sortable && sortKey && currentSortKey === sortKey;

    const handleSort = () => {
        if (!sortable || !sortKey || !onSort) return;

        const newDirection =
            isSorted && currentSortDirection === SortDirection.ASC
                ? SortDirection.DESC
                : SortDirection.ASC;

        onSort(sortKey, newDirection);
    };

    return (
        <th
            className={`${alignmentClasses[align]} px-4 py-3 border-b ${className}`}
            style={style}
        >
            {sortable && sortKey && onSort ? (
                <button
                    onClick={handleSort}
                    className="flex items-center group cursor-pointer bg-transparent border-0 p-0"
                    data-testid={`sort-header-${sortKey}`}
                >
                    <span>{children}</span>
                    <span className="ml-1">
                        {isSorted ? (
                            currentSortDirection === SortDirection.ASC ? (
                                <ArrowUp
                                    className="h-4 w-4"
                                    data-testid="arrow-up"
                                />
                            ) : (
                                <ArrowDown
                                    className="h-4 w-4"
                                    data-testid="arrow-down"
                                />
                            )
                        ) : (
                            <span className="invisible group-hover:visible">
                                <div></div>
                            </span>
                        )}
                    </span>
                </button>
            ) : (
                children
            )}
        </th>
    );
}
