import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matchesService } from "../services/matches";
import type { CreateMatchRequest, Match } from "../types/match";

export const useCreateMatch = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<Match, Error, CreateMatchRequest>({
    mutationFn: matchesService.createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });
  return mutation;
};
