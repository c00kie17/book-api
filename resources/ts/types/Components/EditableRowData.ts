import BookService from "../../Services/BookService.ts";
import { Book } from "../Services/BookService.ts";

export type EditableRowDataProps = {
    book: Book;
    bookService: BookService;
};
