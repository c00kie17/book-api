import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../Components/UI/Model";
import {ButtonVariant} from "../../../types/Components/UI/Button.ts";

jest.mock("lucide-react", () => ({
    X: () => <span data-testid="close-icon">×</span>
}));

jest.mock("../../../Components/UI/Button", () =>
    jest.requireActual("../../__mocks__/Components/UI/Button.tsx"),
);

describe("Modal Component", () => {
    const mockOnClose = jest.fn();
    const mockOnPrimaryAction = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders nothing when isOpen is false", () => {
        const { container } = render(
            <Modal
                isOpen={false}
                onClose={mockOnClose}
                title="Test Modal"
                primaryActionText="Submit"
                onPrimaryAction={mockOnPrimaryAction}
            >
                <div>Modal content</div>
            </Modal>
        );

        expect(container.firstChild).toBeNull();
    });

    test("renders modal content when isOpen is true", () => {
        render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                title="Test Modal"
                primaryActionText="Submit"
                onPrimaryAction={mockOnPrimaryAction}
            >
                <div>Modal content</div>
            </Modal>
        );

        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Modal content")).toBeInTheDocument();
        expect(screen.getByTestId("close-icon")).toBeInTheDocument();
        expect(screen.getByTestId(`button-${ButtonVariant.PRIMARY}`)).toBeInTheDocument();
        expect(screen.getByTestId(`button-${ButtonVariant.SECONDARY}`)).toBeInTheDocument();
    });

    test("calls onClose when X button is clicked", () => {
        render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                title="Test Modal"
                primaryActionText="Submit"
                onPrimaryAction={mockOnPrimaryAction}
            >
                <div>Modal content</div>
            </Modal>
        );

        fireEvent.click(screen.getByLabelText("Close"));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("calls onClose when secondary button is clicked", () => {
        render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                title="Test Modal"
                primaryActionText="Submit"
                onPrimaryAction={mockOnPrimaryAction}
            >
                <div>Modal content</div>
            </Modal>
        );

        fireEvent.click(screen.getByText("Cancel"));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test("calls onPrimaryAction when primary button is clicked", () => {
        render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                title="Test Modal"
                primaryActionText="Submit"
                onPrimaryAction={mockOnPrimaryAction}
            >
                <div>Modal content</div>
            </Modal>
        );

        fireEvent.click(screen.getByText("Submit"));
        expect(mockOnPrimaryAction).toHaveBeenCalledTimes(1);
    });


    test("disables primary button when isPrimaryActionDisabled is true", () => {
        render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                title="Test Modal"
                primaryActionText="Submit"
                onPrimaryAction={mockOnPrimaryAction}
                isPrimaryActionDisabled={true}
            >
                <div>Modal content</div>
            </Modal>
        );

        const primaryButton = screen.getByText("Submit");
        expect(primaryButton).toBeDisabled();
    });

    test("shows processing text when isProcessing is true", () => {
        render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                title="Test Modal"
                primaryActionText="Submit"
                onPrimaryAction={mockOnPrimaryAction}
                isProcessing={true}
            >
                <div>Modal content</div>
            </Modal>
        );

        expect(screen.getByText("Processing...")).toBeInTheDocument();
        expect(screen.queryByText("Submit")).not.toBeInTheDocument();
    });

    test("disables primary button when isProcessing is true", () => {
        render(
            <Modal
                isOpen={true}
                onClose={mockOnClose}
                title="Test Modal"
                primaryActionText="Submit"
                onPrimaryAction={mockOnPrimaryAction}
                isProcessing={true}
            >
                <div>Modal content</div>
            </Modal>
        );

        const primaryButton = screen.getByText("Processing...");
        expect(primaryButton).toBeDisabled();
    });
});
