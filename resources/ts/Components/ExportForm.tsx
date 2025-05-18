import { useState } from "react";

import { ExportFormProps } from "../types/Components/ExportForm.ts";
import { ExportFormat } from "../types/Enums/ExportFormat";

import Checkbox from "./UI/CheckBox.tsx";
import CheckboxGroup from "./UI/CheckBoxGroup.tsx";
import Modal from "./UI/Model.tsx";
import RadioButton from "./UI/RadioButton.tsx";
import RadioGroup from "./UI/RadioGroup.tsx";

export default function ExportForm({
    isOpen,
    onClose,
    bookService,
}: ExportFormProps) {
    const [format, setFormat] = useState<ExportFormat>(ExportFormat.CSV);
    const [fields, setFields] = useState<string[]>(["title", "author"]);
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        if (fields.length === 0) return;

        setIsExporting(true);
        bookService.exportBooks(
            format,
            fields,
            () => {
                setIsExporting(false);
                onClose();
            },
            () => {
                setIsExporting(false);
            },
        );
    };

    const handleFieldChange = (field: string) => {
        if (fields.includes(field)) {
            setFields(fields.filter((f) => f !== field));
        } else {
            setFields([...fields, field]);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Export Books"
            primaryActionText="Export"
            onPrimaryAction={handleExport}
            isPrimaryActionDisabled={fields.length === 0}
            isProcessing={isExporting}
        >
            <div>
                <RadioGroup label="Export Format">
                    <RadioButton
                        id="format-csv"
                        name="format"
                        value={ExportFormat.CSV}
                        checked={format === ExportFormat.CSV}
                        onChange={() => setFormat(ExportFormat.CSV)}
                        label="CSV"
                    />
                    <RadioButton
                        id="format-xml"
                        name="format"
                        value={ExportFormat.XML}
                        checked={format === ExportFormat.XML}
                        onChange={() => setFormat(ExportFormat.XML)}
                        label="XML"
                    />
                </RadioGroup>

                <CheckboxGroup
                    label="Fields to Export"
                    error={
                        fields.length === 0
                            ? "Please select at least one field to export"
                            : undefined
                    }
                >
                    <Checkbox
                        id="field-title"
                        name="fields"
                        value="title"
                        checked={fields.includes("title")}
                        onChange={() => handleFieldChange("title")}
                        label="Title"
                    />
                    <Checkbox
                        id="field-author"
                        name="fields"
                        value="author"
                        checked={fields.includes("author")}
                        onChange={() => handleFieldChange("author")}
                        label="Author"
                    />
                </CheckboxGroup>
            </div>
        </Modal>
    );
}
