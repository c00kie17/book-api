import { IBookService } from "../../Services/IBookService";

export type BookFormProps = {
    isOpen: boolean;
    onClose: () => void;
    bookService: IBookService;
};
