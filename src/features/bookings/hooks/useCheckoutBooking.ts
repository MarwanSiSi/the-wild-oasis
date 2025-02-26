import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { toast } from "sonner";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";
import { Booking } from "../../../types/bookings";

export function useCheckoutBooking() {
  const { invalidateQuery } = useUseQueryClient();

  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Record<keyof Booking, string | number | boolean>>;
    }) => updateBooking(id, data),

    onMutate: () => {
      // Show a loading toast
      const loadingToastId = showLoadingToast("Checking out booking...");

      return { loadingToastId };
    },

    onSuccess: (data, __, context) => {
      // Dismiss the loading toast
      toast.dismiss(context.loadingToastId);
      // Show a success toast
      showSuccessToast(`Booking #${data.id} was successfully checked out.`);
      // Invalidate the query
      invalidateQuery(undefined, { active: true });
    },

    onError: (_, __, context) => {
      // Dismiss the loading toast
      toast.dismiss(context?.loadingToastId);
      // Show an error toast
      showErrorToast("Failed to check out booking.");
    },
  });

  return { checkOut, isCheckingOut };
}
