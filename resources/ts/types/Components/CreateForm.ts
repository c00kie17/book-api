import { IBookService } from "../../Services/IBookService";

export type CreateFormProps = {
    isOpen: boolean;
    onClose: () => void;
    bookService: IBookService;
};
