import { Search, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

import { SearchBarProps } from "../types/Components/SearchBar.ts";

export default function SearchBar({
    initialValue = "",
    onSearch,
    onClear,
}: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState<string>(initialValue);
    const [debouncedTerm, setDebouncedTerm] = useState<string>(initialValue);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        setDebouncedTerm("");
        onClear();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== debouncedTerm) {
                setDebouncedTerm(searchTerm);
                if (searchTerm.trim()) {
                    onSearch(searchTerm);
                } else if (initialValue) {
                    onClear();
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, debouncedTerm, onSearch, onClear, initialValue]);

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center">
                <div className="absolute left-3 text-gray-400">
                    <Search className="h-5 w-5" />
                </div>

                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>
        </form>
    );
}
