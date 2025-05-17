import { ArrowUp, ArrowDown } from "lucide-react";

import { SortableTableHeaderProps } from "../types/Components/SortableTableHeader.ts";
import { SortDirection } from "../types/Enums/SortDirection.ts";

export default function SortableTableHeader({
    column,
    label,
    currentSort,
    currentDirection,
    bookService,
    searchTerm,
}: SortableTableHeaderProps) {
    const isSorted = currentSort === column;
    const newDirection =
        isSorted && currentDirection === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC;

    const handleSort = () => {
        return searchTerm !== ""
            ? bookService.getAllBooks(column, newDirection, searchTerm)
            : bookService.getAllBooks(column, newDirection);
    };

    return (
        <th className="text-left px-4 py-3 border-b">
            <button
                onClick={handleSort}
                className="flex items-center group cursor-pointer bg-transparent border-0 p-0 text-left"
                data-testid={`sort-header-${column}`}
            >
                <span>{label}</span>
                <span className="ml-1">
                    {isSorted ? (
                        currentDirection === SortDirection.ASC ? (
                            <ArrowUp
                                className="h-4 w-4"
                                data-testid="sort-arrow-up"
                            />
                        ) : (
                            <ArrowDown
                                className="h-4 w-4"
                                data-testid="sort-arrow-down"
                            />
                        )
                    ) : (
                        <span className="invisible group-hover:visible">
                            <ArrowUp className="h-4 w-4 opacity-30" />
                        </span>
                    )}
                </span>
            </button>
        </th>
    );
}
