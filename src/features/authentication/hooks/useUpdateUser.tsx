import { useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../../../services/apiAuth";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../utils/helpers";
import { toast } from "sonner";
import { useUseQueryClient } from "../../../hooks/useUseQueryClient";

export function useUpdateUser() {
  const { queryClient } = useUseQueryClient();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: ({
      data: { fullName, avatar, password },
    }: {
      data: { fullName?: string; avatar?: File | null; password?: string };
    }) => updateCurrentUser({ password, fullName, avatar }),

    onMutate: () => {
      const loadingToastId = showLoadingToast("Updating user data...");

      return { loadingToastId };
    },

    onSuccess: (data, __, context) => {
      toast.dismiss(context.loadingToastId);

      showSuccessToast("User data updated successfully");

      queryClient.setQueryData(["user"], data?.user);
    },

    onError: (error, _, context) => {
      console.log(error);
      toast.dismiss(context?.loadingToastId);

      showErrorToast(error.message);
    },
  });

  return { updateUser, isUpdatingUser };
}
