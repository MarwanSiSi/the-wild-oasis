import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../../services/apiAuth";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { toast } from "sonner";

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: (data: { fullName: string; email: string; password: string }) =>
      signupApi(data),

    onMutate: () => {
      const loadingToastId = showLoadingToast(
        "Please wait while we create the new user..."
      );

      return { loadingToastId };
    },

    onSuccess: (data, _, context) => {
      toast.dismiss(context.loadingToastId);
      console.log("User signed up", data);

      showSuccessToast("User signed up successfully");
    },

    onError: (_, __, context) => {
      toast.dismiss(context?.loadingToastId);
      showErrorToast("Failed to create new user");
    },
  });

  return { signup, isSigningUp };
}
