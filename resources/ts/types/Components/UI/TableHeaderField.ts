import { ReactNode } from "react";

import { SortDirection } from "../../Enums/SortDirection.ts";

export interface TableHeaderFieldProps {
    children: ReactNode;
    className?: string;
    align?: "left" | "center" | "right";
    width?: string;

    sortable?: boolean;
    sortKey?: string;
    currentSortKey?: string;
    currentSortDirection?: SortDirection;
    onSort?: (sortKey: string, direction: SortDirection) => void;
}
