import { IBookService } from "../../Services/IBookService";
import { Book } from "../Services/BookService";

export type BookListProps = {
    books: Book[];
    bookService: IBookService;
};
