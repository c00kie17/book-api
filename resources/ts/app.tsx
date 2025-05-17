import { createInertiaApp } from "@inertiajs/react";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

(async () => {
    try {
        await createInertiaApp({
            resolve: (name) => {
                // @ts-expect-error - Import.meta.glob returns Record<string, unknown> but we need component modules
                const pages = import.meta.glob<{
                    default: React.ComponentType<unknown>;
                }>("./Pages/**/*.{jsx,tsx}", { eager: true });

                return (
                    pages[`./Pages/${name}.jsx`] || pages[`./Pages/${name}.tsx`]
                );
            },
            setup({ el, App, props }) {
                if (el instanceof HTMLElement) {
                    createRoot(el).render(createElement(App, props));
                }
            },
        });
        console.log("Inertia app initialized successfully");
    } catch (error) {
        console.error("Failed to initialize Inertia app:", error);
    }
})();
