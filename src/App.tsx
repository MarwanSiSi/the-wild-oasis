import { RouterProvider } from "react-router";
import { router } from "./routes";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // Data becomes stale after 30 seconds
      refetchOnWindowFocus: true, // Refetch when the window regains focus
      refetchOnReconnect: true, // Refetch when the network reconnects
      refetchInterval: 30_000, // Refetch every 30 seconds (same as staleTime)
      refetchIntervalInBackground: false, // Only refetch when the app is in the foreground
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
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
