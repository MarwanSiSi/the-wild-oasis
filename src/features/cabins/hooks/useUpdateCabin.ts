import { useMutation } from "@tanstack/react-query";
import { createEditFunction } from "../../../services/apiCabins";
import { FieldValues } from "react-hook-form";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";

export function useUpdateCabin(invalidateQuery: (query: string[]) => void) {
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ data, id }: { data: FieldValues; id: number }) =>
      createEditFunction(data, id),

    onMutate: () => {
      const loadingToastId = showLoadingToast("Updating cabin");

      return { loadingToastId };
    },

    onSuccess: (_, __, context) => {
      // Dismiss the loading toast
      toast.dismiss(context.loadingToastId);

      showSuccessToast("Cabin Updated successfully");

      // Invalidate the cabins query to refresh the data
      invalidateQuery(["cabins"]);
    },

    onError: (error: PostgrestError, _, context) => {
      toast.dismiss(context?.loadingToastId);

      showErrorToast("Error updating cabin");

      console.error("Error updating cabin", error);
    },
  });

  return { isUpdating, updateCabin };
}
