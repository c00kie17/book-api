import { IBookService } from "../../Services/IBookService.ts";
import { Book } from "../Services/BookService.ts";

export type EditableRowDataProps = {
    book: Book;
    bookService: IBookService;
};
