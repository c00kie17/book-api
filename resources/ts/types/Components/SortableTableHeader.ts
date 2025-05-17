import { IBookService } from "../../Services/IBookService.ts";

export type SortableTableHeaderProps = {
    column: string;
    label: string;
    currentSort: string;
    currentDirection: string;
    bookService: IBookService;
};
