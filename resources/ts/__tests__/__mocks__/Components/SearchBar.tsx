import * as React from "react";

import { SearchBarProps } from "../../../types/Components/SearchBar";

class SearchBarMock extends React.Component<SearchBarProps> {
    render(): React.ReactNode {
        const { initialValue = "", onSearch, onClear } = this.props;

        return (
            <div
                data-testid="search-bar"
                data-initial-value={initialValue || ""}
            >
                <input
                    type="text"
                    data-testid="search-input"
                    defaultValue={initialValue}
                    onChange={(e) => {
                        if (e.target.value.trim()) {
                            onSearch(e.target.value);
                        } else {
                            onClear();
                        }
                    }}
                />
                <button data-testid="clear-button" onClick={onClear}>
                    Clear
                </button>
            </div>
        );
    }
}

export default SearchBarMock;
