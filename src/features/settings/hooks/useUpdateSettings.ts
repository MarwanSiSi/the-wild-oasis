import { useMutation } from "@tanstack/react-query";

import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";
import { updateSetting } from "../../../services/apiSettings";

export function useEditSettings(invalidateQuery: (query: string[]) => void) {
  const { mutate: editSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,

    onMutate: () => {
      const loadingToastId = showLoadingToast("Updating settings");

      return { loadingToastId };
    },

    onSuccess: (_, __, context) => {
      // Dismiss the loading toast
      toast.dismiss(context.loadingToastId);

      showSuccessToast("Settings updated successfully");

      // Invalidate the settings query to refresh the data
      invalidateQuery(["settings"]);
    },

    onError: (error: PostgrestError, _, context) => {
      toast.dismiss(context?.loadingToastId);

      showErrorToast("Error updating settings");

      console.error("Error updating settings", error);
    },
  });

  return { isUpdating, editSetting };
}
