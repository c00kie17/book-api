import axios, { AxiosRequestConfig } from "axios";
import { saveAs } from "file-saver";

import { ExportFormat } from "../types/Enums/ExportFormat.ts";
import { SortDirection } from "../types/Enums/SortDirection.ts";
import {
    Book,
    BookData,
    Endpoints,
    HttpMethods,
} from "../types/Services/BookService";

import { IBookService } from "./IBookService";

export default class BookService implements IBookService {
    private ENDPOINTS: Endpoints;
    readonly API_BASE_URL: string;

    constructor(baseUrl: string) {
        this.API_BASE_URL = baseUrl;
        this.ENDPOINTS = {
            BOOKS: "books",
            BOOK_BY_ID: (id: number) => `books/${id}`,
            BOOKS_EXPORT: "books/export",
        };
    }

    private async handleRequest<T>(
        method: HttpMethods,
        path: string,
        data?: unknown,
        onSuccess?: (data: T) => void,
        onError?: (error: unknown) => void,
        blob = false,
    ): Promise<void> {
        try {
            const fullUrl = `${this.API_BASE_URL}/${path}`;
            const options = {
                method,
                url: fullUrl,
                data:
                    method !== "get" && method !== "delete" ? data : undefined,
                responseType: blob ? "blob" : "json",
            } as AxiosRequestConfig;

            const response = await axios(options);

            if (onSuccess) {
                if (blob) {
                    onSuccess(response.data);
                } else {
                    onSuccess(response.data.data);
                }
            }
        } catch (error) {
            console.error(`API request failed:`, error);
            if (onError) onError(error);
        }
    }
    async createBook(
        data: BookData,
        onSuccess?: (data: Book) => void,
        onError?: (errors: unknown) => void,
    ): Promise<void> {
        return this.handleRequest(
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
    ): Promise<void> {
        return this.handleRequest(
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
    ): Promise<void> {
        return this.handleRequest(
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
        onSuccess?: (data: Book[]) => void,
        onError?: (errors: unknown) => void,
    ) {
        const params = new URLSearchParams();
        params.append("sort_by", field);
        params.append("sort_direction", direction);

        if (searchTerm.trim()) {
            params.append("search_term", searchTerm.trim());
        }

        return this.handleRequest(
            "get",
            `${this.ENDPOINTS.BOOKS}?${params.toString()}`,
            {},
            onSuccess,
            onError,
        );
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

        return this.handleRequest<Blob>(
            "get",
            `${this.ENDPOINTS.BOOKS_EXPORT}?${params.toString()}`,
            undefined,
            (data) => {
                const defaultFilename = `books_export.${format.toString()}`;
                saveAs(new Blob([data]), defaultFilename);
                if (onSuccess) onSuccess();
            },
            onError,
            true,
        );
    }
}
