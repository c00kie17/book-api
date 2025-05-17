import { router } from "@inertiajs/react";

import { SortDirection } from "../types/Enums/SortDirection.ts";
import {
    BookData,
    Endpoints,
    HttpMethods,
} from "../types/Services/BookService";

import { IBookService } from "./IBookService";

export default class BookService implements IBookService {
    private ENDPOINTS: Endpoints;

    constructor() {
        this.ENDPOINTS = {
            BOOKS: "/books",
            BOOK_BY_ID: (id: number) => `/books/${id}`,
        };
    }

    private handleResponse(
        method: HttpMethods,
        url: string,
        data?: Partial<BookData>,
        onSuccess?: () => void,
        onError?: (errors: unknown) => void,
    ) {
        const requestData = data !== undefined ? data : {};
        return router[method](url, requestData, {
            onSuccess: (_response) => {
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (errors) => {
                if (onError) {
                    onError(errors);
                }
            },
            preserveState: true,
            preserveScroll: true,
        });
    }

    createBook(
        data: BookData,
        onSuccess?: () => void,
        onError?: (errors: unknown) => void,
    ) {
        return this.handleResponse(
            "post",
            this.ENDPOINTS.BOOKS,
            data,
            onSuccess,
            onError,
        );
    }

    deleteBook(
        id: number,
        onSuccess?: () => void,
        onError?: (errors: unknown) => void,
    ) {
        return this.handleResponse(
            "delete",
            this.ENDPOINTS.BOOK_BY_ID(id),
            undefined,
            onSuccess,
            onError,
        );
    }

    updateBook(
        id: number,
        data: Partial<BookData>,
        onSuccess?: () => void,
        onError?: (errors: unknown) => void,
    ) {
        return this.handleResponse(
            "patch",
            this.ENDPOINTS.BOOK_BY_ID(id),
            data,
            onSuccess,
            onError,
        );
    }

    getAllBooks(
        field: string = "id",
        direction: SortDirection = SortDirection.DESC,
        searchTerm: string = "",
        onSuccess?: () => void,
        onError?: (errors: unknown) => void,
    ) {
        const params = new URLSearchParams();
        params.append("sort_by", field);
        params.append("sort_direction", direction);

        if (searchTerm.trim()) {
            params.append("search_term", searchTerm.trim());
        }

        return this.handleResponse(
            "get",
            `${this.ENDPOINTS.BOOKS}?${params.toString()}`,
            {},
            onSuccess,
            onError,
        );
    }
}
