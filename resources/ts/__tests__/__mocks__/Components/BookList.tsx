import * as React from "react";

import { BookListProps } from "../../../types/Components/BookList";

class BookListMock extends React.Component<BookListProps> {
    render(): React.ReactNode {
        const { books } = this.props;

        return (
            <div data-testid="book-list" data-books={JSON.stringify(books)}>
                {books && books.length > 0
                    ? "Books Available"
                    : "No books found"}
            </div>
        );
    }
}

export default BookListMock;
