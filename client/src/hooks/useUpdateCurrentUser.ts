import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users";

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: usersService.updateCurrentUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["currentUser"], updatedUser);
    },
  });

  return mutation;
};
