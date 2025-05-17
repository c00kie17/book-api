export interface SearchBarProps {
    initialValue?: string;
    onSearch: (term: string) => void;
    onClear: () => void;
}
