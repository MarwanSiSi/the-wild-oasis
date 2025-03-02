import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";

export function useLogout() {
  const navigate = useNavigate();
  const { queryClient } = useUseQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // Remove all queries
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoggingOut };
}
