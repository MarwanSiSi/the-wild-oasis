import { useMutation } from "@tanstack/react-query";
import { checkInBooking } from "../../../services/apiBookings";
import { showLoadingToast } from "../../../utils/helpers";
import { toast } from "sonner";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";

import { useNavigate } from "react-router";
import { Booking } from "../../../types/bookings";

export function useUpdateBooking() {
  const navigate = useNavigate();

  const { invalidateQuery } = useUseQueryClient();

  const { mutate: updateBooking, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { [key: string]: string | boolean };
    }) => checkInBooking(id, data),

    onMutate: () => {
      const loadingToastId = showLoadingToast("Checking in booking...");

      return { loadingToastId };
    },

    onSuccess: (data: Booking, __, context) => {
      toast.dismiss(context.loadingToastId);

      toast.success(`Booking #${data.id} was successfully checked in.`);

      invalidateQuery(undefined, { active: true });

      navigate("/");
    },

    onError: (_, __, context) => {
      toast.dismiss(context?.loadingToastId);

      toast.error("Failed to check in booking.");
    },
  });

  return { updateBooking, isCheckingIn };
}
