import { IBookService } from "../../Services/IBookService";
import { Book } from "../Services/BookService.ts";

export type CreateFormProps = {
    isOpen: boolean;
    onClose: () => void;
    bookService: IBookService;
    onBookCreated?: (book: Book) => void;
};
