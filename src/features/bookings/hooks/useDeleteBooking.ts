import { useMutation } from "@tanstack/react-query";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";
import { deleteBooking } from "../../../services/apiBookings";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { Booking } from "../../../types/bookings";
import { toast } from "sonner";

export function useDeleteBooking() {
  const { invalidateQuery } = useUseQueryClient();

  const { mutate: removeBooking, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteBooking(id),

    onMutate: () => {
      // Show a loading toast
      const loadingToastId = showLoadingToast("Deleting booking...");

      return { loadingToastId };
    },

    onSuccess: (data: Booking, _, context) => {
      // Dismiss the loading toast
      toast.dismiss(context.loadingToastId);
      // Show a success toast
      showSuccessToast(`Booking #${data.id} was successfully deleted.`);
      // Invalidate the query
      invalidateQuery(undefined, { active: true });
    },

    onError: (_, __, context) => {
      // Dismiss the loading toast
      toast.dismiss(context?.loadingToastId);
      // Show an error toast
      showErrorToast("Failed to delete booking.");
    },
  });

  return { removeBooking, isDeleting };
}
