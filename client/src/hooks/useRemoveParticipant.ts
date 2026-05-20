import { useMutation, useQueryClient } from "@tanstack/react-query";
import { matchesService } from "../services/matches";

type RemoveParticipantVariables = {
  matchId: string;
  userId: string;
};

export const useRemoveParticipant = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, RemoveParticipantVariables>({
    mutationFn: ({ matchId, userId }) =>
      matchesService.removeParticipant(matchId, userId),

    onSuccess: (_data, { matchId }) => {
      queryClient.invalidateQueries({ queryKey: ["participants", matchId] });
      queryClient.invalidateQueries({ queryKey: ["match", matchId] });
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  return mutation;
};
