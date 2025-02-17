import { RouterProvider } from "react-router";
import { router } from "./routes";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

// isLoading -> isPending
// cacheTime -> gcTime

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        // position="top-right"
        visibleToasts={1}
        richColors
        toastOptions={{
          style: {
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
