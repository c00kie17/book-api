import { IBookService } from "../../../Services/IBookService";
import { SortDirection } from "../../../types/Enums/SortDirection.ts";
import { Book, BookData } from "../../../types/Services/BookService";

export class BookServiceMock implements IBookService {
    createBook = jest.fn(
        (
            _data: BookData,
            onSuccess?: () => void,
            _onError?: (error: unknown) => void,
        ) => {
            if (onSuccess) onSuccess();
        },
    );

    deleteBook = jest.fn(
        (
            _id: number,
            onSuccess?: () => void,
            _onError?: (error: unknown) => void,
        ) => {
            if (onSuccess) onSuccess();
        },
    );

    updateBook = jest.fn(
        (
            _id: number,
            _data: Partial<Book>,
            onSuccess?: () => void,
            _onError?: (error: unknown) => void,
        ) => {
            if (onSuccess) onSuccess();
        },
    );

    getAllBooks(
        _field: string,
        _direction: SortDirection,
        _searchTerm?: string,
        onSuccess?: () => void,
        _onError?: (errors: unknown) => void,
    ) {
        if (onSuccess) onSuccess();
    }
}
