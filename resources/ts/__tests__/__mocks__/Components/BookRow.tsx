import * as React from "react";

import { BookRowProps } from "../../../types/Components/BookRow";

class BookRowMock extends React.Component<BookRowProps> {
    render(): React.ReactNode {
        const { book } = this.props;

        return (
            <tr data-testid={`book-row-${book.id}`}>
                <td>{book.title}</td>
                <td>{book.author}</td>
            </tr>
        );
    }
}

export default BookRowMock;
