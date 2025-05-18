import { X } from "lucide-react";
import { useState } from "react";

import { ExportFormProps } from "../types/Components/ExportForm.ts";
import { ExportFormat } from "../types/Enums/ExportFormat";

export default function ExportForm({
    isOpen,
    onClose,
    bookService,
}: ExportFormProps) {
    const [format, setFormat] = useState<ExportFormat>(ExportFormat.CSV);
    const [fields, setFields] = useState<string[]>(["title", "author"]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (fields.length === 0) return;
        bookService.exportBooks(format, fields);
        onClose();
    };

    const handleFieldChange = (field: string) => {
        if (fields.includes(field)) {
            setFields(fields.filter((f) => f !== field));
        } else {
            setFields([...fields, field]);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative z-10">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Export Books
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Export Format
                        </label>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center">
                                <input
                                    id="format-csv"
                                    name="format"
                                    type="radio"
                                    value={ExportFormat.CSV}
                                    checked={format === ExportFormat.CSV}
                                    onChange={() => setFormat(ExportFormat.CSV)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="format-csv"
                                    className="ml-2 block text-gray-700"
                                >
                                    CSV
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="format-xml"
                                    name="format"
                                    type="radio"
                                    value={ExportFormat.XML}
                                    checked={format === ExportFormat.XML}
                                    onChange={() => setFormat(ExportFormat.XML)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="format-xml"
                                    className="ml-2 block text-gray-700"
                                >
                                    XML
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                            Fields to Export
                        </label>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center">
                                <input
                                    id="field-title"
                                    name="fields"
                                    type="checkbox"
                                    value="title"
                                    checked={fields.includes("title")}
                                    onChange={() => handleFieldChange("title")}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="field-title"
                                    className="ml-2 block text-gray-700"
                                >
                                    Title
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="field-author"
                                    name="fields"
                                    type="checkbox"
                                    value="author"
                                    checked={fields.includes("author")}
                                    onChange={() => handleFieldChange("author")}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="field-author"
                                    className="ml-2 block text-gray-700"
                                >
                                    Author
                                </label>
                            </div>
                        </div>
                        {fields.length === 0 && (
                            <p className="text-red-500 text-sm mt-1">
                                Please select at least one field to export
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={fields.length === 0}
                            className={`px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                                fields.length === 0
                                    ? "opacity-70 cursor-not-allowed"
                                    : "hover:bg-blue-600 active:bg-blue-700"
                            } transition-colors`}
                        >
                            Export
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
