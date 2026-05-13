import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matchesService } from "../services/matches";

export const useLeaveMatch = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, string>({
    mutationFn: matchesService.leaveMatch,
    onSuccess: (_data, matchId) => {
      queryClient.invalidateQueries({ queryKey: ["participants", matchId] });
      queryClient.invalidateQueries({ queryKey: ["match", matchId] });
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
  return mutation;
};
