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

                const component =
                    pages[`./Pages/${name}.jsx`] ||
                    pages[`./Pages/${name}.tsx`];

                if (!component) {
                    console.error("Available pages:", Object.keys(pages));
                    console.error(
                        `Page not found: ./Pages/${name}.tsx or ./Pages/${name}.jsx`,
                    );
                }

                return component;
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
