import { RouterProvider, createRouter } from "@tanstack/react-router";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

dayjs.locale("es"); // se aplica globalmente

// Create a new router instance
const router = createRouter({
  context: { user: null }, // Auth context
  routeTree,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider lang="es">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>
);
