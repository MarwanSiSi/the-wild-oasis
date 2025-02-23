import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../../services/apiCabins";
import { Cabin } from "../../../types/cabin";

export function useGetCabins() {
  const { data: cabins, isPending: isFetching } = useQuery<Cabin[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isFetching };
}
