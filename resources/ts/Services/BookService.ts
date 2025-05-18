import { router } from "@inertiajs/react";
import axios from "axios";
import { saveAs } from "file-saver";

import { ExportFormat } from "../types/Enums/ExportFormat.ts";
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
            BOOKS_EXPORT: "/books/export",
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

    private async handleFileDownload(
        url: string,
        format: ExportFormat,
        onSuccess?: () => void,
        onError?: (error: unknown) => void,
    ): Promise<void> {
        try {
            const response = await axios.get(url, { responseType: "blob" });
            const defaultFilename = `books_export.${format.toString()}`;
            saveAs(new Blob([response.data]), defaultFilename);
            if (onSuccess) onSuccess();
        } catch (error) {
            if (onError) onError(error);
        }
    }

    async exportBooks(
        format: ExportFormat,
        fields: string[],
        onSuccess?: () => void,
        onError?: (error: unknown) => void,
    ): Promise<void> {
        if (fields.length === 0) return;

        const params = new URLSearchParams();
        params.append("file_format", format.toString());
        fields.forEach((field) => params.append("fields[]", field));

        return this.handleFileDownload(
            `${this.ENDPOINTS.BOOKS_EXPORT}?${params.toString()}`,
            format,
            onSuccess,
            onError,
        );
    }
}
