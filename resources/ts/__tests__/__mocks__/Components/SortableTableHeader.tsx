import * as React from "react";

interface SortableTableHeaderProps {
    column: string;
    label: string;
    currentSort: string;
    currentDirection: string;
}

class SortableTableHeaderMock extends React.Component<SortableTableHeaderProps> {
    render(): React.ReactNode {
        const { column, label, currentSort } = this.props;
        const isSorted = currentSort === column;

        return (
            <th data-testid={`header-${column}`} data-sorted={isSorted}>
                <a href="#">{label}</a>
                {isSorted && <span data-testid="sort-indicator">↕</span>}
            </th>
        );
    }
}

export default SortableTableHeaderMock;
