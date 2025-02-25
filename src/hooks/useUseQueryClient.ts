import { useQueryClient } from "@tanstack/react-query";

export function useUseQueryClient() {
  const queryClient = useQueryClient();

  function invalidateQuery(query?: string[], options?: { active: boolean }) {
    queryClient.invalidateQueries({
      queryKey: query,
      ...options,
    });
  }

  return { invalidateQuery, queryClient };
}
