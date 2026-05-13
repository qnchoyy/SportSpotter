import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matchesService } from "../services/matches";

type JoinMatchVariables = { matchId: string; team: number };

export const useJoinMatch = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, JoinMatchVariables>({
    mutationFn: ({ matchId, team }) => matchesService.joinMatch(matchId, team),
    onSuccess: (_data, { matchId }) => {
      queryClient.invalidateQueries({ queryKey: ["participants", matchId] });
      queryClient.invalidateQueries({ queryKey: ["match", matchId] });
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  return mutation;
};
