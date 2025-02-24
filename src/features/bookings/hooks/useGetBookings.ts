import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { Booking } from "../../../types/bookings";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

export function useGetBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1) Get the status filter value from the URL
  const filterValue = searchParams.get("status") || "all";

  // 2) Get the sortBy value from the URL
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";

  // Extract field and direction from sortByValue
  const [field, direction] = sortByValue.split("-");

  // Ensure direction is "asc" or "desc"
  const validDirection =
    direction === "asc" || direction === "desc" ? direction : "desc";

  // 3) PAGINATION
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: "1",
    });
  }, [filterValue]);

  const { data, isPending: isFetching } = useQuery<{
    bookings: Booking[];
    count: number;
  }>({
    queryKey: [
      "bookings",
      { field: "status", value: filterValue },
      { field, direction: validDirection },
      page,
    ],
    queryFn: async () => {
      const response = await getBookings(
        {
          filters: [{ field: "status", value: filterValue, method: "eq" }],
          sort: [
            {
              field,
              direction: validDirection, // Use the validated direction
            },
          ],
        },
        page
      );

      return { bookings: response.data, count: response.count ?? 0 };
    },
  });

  return { bookings: data?.bookings, count: data?.count, isFetching };
}
