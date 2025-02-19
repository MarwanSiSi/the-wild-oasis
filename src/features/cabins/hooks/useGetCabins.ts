import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../../services/apiCabins";

export function useGetCabins() {
  const { data: cabins, isPending: isFetching } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isFetching };
}
