import { useQuery } from "@tanstack/react-query";
import type { Match } from "../types/match";
import { matchesService } from "../services/matches";

export const useMatch = (id: string) => {
  const { data, isLoading, error } = useQuery<Match>({
    queryKey: ["match", id],
    queryFn: () => matchesService.getMatch(id),
    enabled: !!id,
  });

  return {
    match: data,
    loading: isLoading,
    error: error ? "Failed to load match" : null,
  };
};
