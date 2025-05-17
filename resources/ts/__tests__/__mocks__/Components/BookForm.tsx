import * as React from "react";

import { BookFormProps } from "../../../types/Components/BookForm";

class BookFormMock extends React.Component<BookFormProps> {
    render(): React.ReactNode {
        const { isOpen, onClose } = this.props;

        if (!isOpen) return null;

        return (
            <div data-testid="book-form">
                <h2>Add New Book</h2>
                <button onClick={onClose}>Cancel</button>
            </div>
        );
    }
}

export default BookFormMock;
