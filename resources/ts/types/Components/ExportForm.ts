import { IBookService } from "../../Services/IBookService.ts";

export interface ExportFormProps {
    isOpen: boolean;
    onClose: () => void;
    bookService: IBookService;
}
