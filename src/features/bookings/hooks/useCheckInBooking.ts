import { useMutation } from "@tanstack/react-query";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { toast } from "sonner";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";

import { useNavigate } from "react-router";
import { Booking } from "../../../types/bookings";
import { checkInBooking } from "../../../services/apiBookings";

export function useCheckInBooking() {
  const navigate = useNavigate();

  const { invalidateQuery } = useUseQueryClient();

  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Record<keyof Booking, string | boolean | number>>;
    }) => checkInBooking(id, data),

    onMutate: () => {
      const loadingToastId = showLoadingToast("Checking in booking...");

      return { loadingToastId };
    },

    onSuccess: (data: Booking, __, context) => {
      toast.dismiss(context.loadingToastId);

      showSuccessToast(`Booking #${data.id} was successfully checked in.`);

      invalidateQuery(undefined, { active: true });

      navigate("/");
    },

    onError: (_, __, context) => {
      toast.dismiss(context?.loadingToastId);

      showErrorToast("Failed to check in booking.");
    },
  });

  return { checkIn, isCheckingIn };
}
