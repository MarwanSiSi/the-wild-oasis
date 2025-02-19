import { useMutation } from "@tanstack/react-query";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";
import { deleteCabin } from "../../../services/apiCabins";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";

export function useDeleteCabin() {
  const { invalidateQuery } = useUseQueryClient();

  const { isPending: isDeleting, mutate: removeCabin } = useMutation({
    mutationFn: (cabinId: number) => deleteCabin(cabinId),

    onMutate: () => {
      const loadingToastId = showLoadingToast("Deleting cabin");

      return { loadingToastId };
    },

    onSuccess: (_, __, context) => {
      // Dismiss the loading toast
      toast.dismiss(context.loadingToastId);

      showSuccessToast("Cabin deleted successfully");

      // Invalidate the cabins query to refresh the data
      invalidateQuery(["cabins"]);
    },

    onError: (error: PostgrestError, _, context) => {
      toast.dismiss(context?.loadingToastId);

      showErrorToast("Error deleting cabin");

      console.error("Error deleting cabin", error);
    },
  });

  return { isDeleting, removeCabin };
}
