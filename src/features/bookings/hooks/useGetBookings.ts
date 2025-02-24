import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { Booking } from "../../../types/bookings";

export function useGetBookings() {
  const { data: bookings, isPending: isFetching } = useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isFetching };
}
