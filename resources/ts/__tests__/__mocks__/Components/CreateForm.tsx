import * as React from "react";

import { CreateFormProps } from "../../../types/Components/CreateForm.ts";

class BookFormMock extends React.Component<CreateFormProps> {
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
