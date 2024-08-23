import { RouterProvider } from "react-router-dom";
import "./global.css";
import { router } from "./routes";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop" defaultTheme="dark">
        <QueryClientProvider client={queryClient} >
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster />
        <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
