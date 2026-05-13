import { useQuery } from "@tanstack/react-query";
import type { Participant } from "../types/participant";
import { matchesService } from "../services/matches";

export const useMatchParticipants = (matchId?: string) => {
  const { data, isLoading, error } = useQuery<Participant[]>({
    queryKey: ["participants", matchId],
    queryFn: () => matchesService.getParticipants(matchId!),
    enabled: !!matchId,
  });

  return {
    participants: data ?? [],
    loading: isLoading,
    error: error ? "Failed to load participants" : null,
  };
};
