export interface Book {
    id: number;
    title: string;
    author: string;
}

export type BookData = Omit<Book, "id">;

export type Endpoints = {
    BOOKS: string;
    BOOK_BY_ID: (id: number) => string;
};

export type HttpMethods = "post" | "delete" | "patch" | "put" | "get";
