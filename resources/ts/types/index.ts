import { SortDirection } from "./Enums/SortDirection.ts";
import { Book } from "./Services/BookService.ts";

export type IndexProps = {
    books: Book[];
    sortBy?: string;
    sortDirection?: SortDirection;
    searchTerm?: string;
};
