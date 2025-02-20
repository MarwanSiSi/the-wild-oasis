import { PostgrestError } from "@supabase/supabase-js";
import { createEditFunction } from "../../../services/apiCabins";
import { toast } from "sonner";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";

export function useCreateCabin(
  reset?: () => void,
  invalidateQuery?: (query: string[]) => void,
  onCloseModal?: () => void
) {
  const { invalidateQuery: invalidateQueries } = useUseQueryClient();

  const finalInvalidateQuery = invalidateQuery ?? invalidateQueries;

  const { mutate: addCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditFunction,

    onMutate: () => {
      const loadingToastId = showLoadingToast("Adding cabin...");

      return { loadingToastId };
    },
    onError: (error: PostgrestError, _, context) => {
      toast.dismiss(context?.loadingToastId);

      showErrorToast(error.message);
    },
    onSuccess: (_, __, context) => {
      toast.dismiss(context?.loadingToastId);

      showSuccessToast("Cabin added successfully!");

      finalInvalidateQuery(["cabins"]);

      onCloseModal?.(); // Close the modal

      reset?.(); // Reset the form
    },
  });

  return { isCreating, addCabin };
}
