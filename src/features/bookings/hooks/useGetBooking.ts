import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings";
import { Booking } from "../../../types/bookings";
import { useParams } from "react-router";

export function useGetBooking() {
  const { bookingId } = useParams();

  const { data: booking, isPending: isFetching } = useQuery<Booking>({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(+bookingId!),
  });

  return { booking, isFetching };
}
