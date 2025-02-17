import { useQueryClient } from "@tanstack/react-query";

export function useUseQueryClient() {
  const queryClient = useQueryClient();

  function invalidateQuery(query: string[]) {
    queryClient.invalidateQueries({
      queryKey: query,
    });
  }

  return { invalidateQuery };
}
