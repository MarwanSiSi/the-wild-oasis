import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../../services/apiBookings";

export function useTodaysActivities() {
  const { isPending, data: activities } = useQuery({
    queryKey: ["todays-activities"],
    queryFn: getStaysTodayActivity,
  });

  return { isPending, activities };
}
