import { IBookService } from "../../Services/IBookService";
import { Book } from "../Services/BookService";

export type BookRowProps = {
    book: Book;
    bookService: IBookService;
    onDeleted?: () => void;
    onUpdated?: () => void;
};
