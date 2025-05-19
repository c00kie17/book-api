import { IBookService } from "../../Services/IBookService";
import { SortDirection } from "../Enums/SortDirection.ts";
import { Book } from "../Services/BookService";

export type BookListProps = {
    books: Book[];
    bookService: IBookService;
    sortBy?: string;
    sortDirection?: SortDirection;
    searchTerm?: string;
    onSort: (field: string, direction: SortDirection) => void;
    onBookDeleted?: () => void;
    onBookUpdated?: () => void;
};
