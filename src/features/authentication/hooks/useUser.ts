import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/apiAuth";

export function useUser() {
  const { data: user, isPending: isFetchingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    user,
    isFetchingUser,
    isAuthenticated: user?.role === "authenticated",
  };
}
