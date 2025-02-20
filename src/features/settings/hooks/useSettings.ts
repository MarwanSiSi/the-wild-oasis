import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../../services/apiSettings";
import { Settings } from "../../../types/settings";

export function useSettings() {
  const {
    data: settings,
    isPending: isFetching,
    error,
  } = useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isFetching, error };
}
