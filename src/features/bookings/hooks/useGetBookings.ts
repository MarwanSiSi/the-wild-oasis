import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { Filter, Sort } from "../../../types/bookings";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";
import { PAGE_SIZE } from "../../../utils/constants";

export function useGetBookings() {
  const { queryClient } = useUseQueryClient();
  const [searchParams] = useSearchParams();

  // Extract query parameters
  const filterValue = searchParams.get("status") || "all";
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const page = Number(searchParams.get("page")) || 1;

  // Parse sortByValue into field and direction
  const [field, direction] = sortByValue.split("-");
  const validDirection =
    direction === "asc" || direction === "desc" ? direction : "desc";

  // Define filters and sort
  const filters: Filter[] = [
    { field: "status", value: filterValue, method: "eq" },
  ];
  const sort: Sort[] = [{ field, direction: validDirection }];

  // Reset page to 1 when filter changes
  useEffect(() => {
    searchParams.set("page", "1");
  }, [filterValue]);

  // Fetch bookings data
  const { data, isPending: isFetching } = useQuery({
    queryKey: ["bookings", filterValue, field, validDirection, page],
    queryFn: async () => {
      const response = await getBookings({ filters, sort }, page);
      return { bookings: response.data, count: response.count ?? 0 };
    },
  });

  // Pre-fetch next and previous pages
  const pageCount = Math.ceil((data?.count ?? 0) / PAGE_SIZE);

  const prefetchPage = async (pageNumber: number) => {
    await queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, field, validDirection, pageNumber],
      queryFn: async () => {
        const response = await getBookings({ filters, sort }, pageNumber);
        return { bookings: response.data, count: response.count ?? 0 };
      },
    });
  };

  if (page < pageCount) prefetchPage(page + 1); // Pre-fetch next page
  if (page > 1) prefetchPage(page - 1); // Pre-fetch previous page

  return {
    bookings: data?.bookings,
    count: data?.count,
    isFetching,
  };
}
