import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matchesService } from "../services/matches";
import type { Match } from "../types/match";

export const useCancelMatch = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Match, Error, string>({
    mutationFn: matchesService.cancelMatch,
    onSuccess: (_data, matchId) => {
      queryClient.invalidateQueries({ queryKey: ["match", matchId] });
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  return mutation;
};
