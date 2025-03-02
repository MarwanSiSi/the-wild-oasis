import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import { showErrorToast } from "../../../utils/helpers";
import { useNavigate } from "react-router";
import { useUseQueryClient } from "./../../../hooks/useUseQueryClient";

export function useLogin() {
  const navigate = useNavigate();
  const { queryClient } = useUseQueryClient();

  const {
    data: user,
    isPending: isLoggingIn,
    mutate: login,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      // Redirect to dashboard
      navigate("/", { replace: true });
    },

    onError: (error) => {
      // Show error toast
      showErrorToast(error.message);
    },
  });

  return { user, isLoggingIn, login };
}
