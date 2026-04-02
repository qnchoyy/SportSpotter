import type { Match, MatchQueryParams } from "../types/match";
import { matchesService } from "../services/matches";
import { useQuery } from "@tanstack/react-query";

export const useMatches = (params?: MatchQueryParams) => {
  const { data, isLoading, error } = useQuery<Match[]>({
    queryKey: ["matches", params],
    queryFn: () => matchesService.getMatches(params),
  });

  return {
    matches: data ?? [],
    loading: isLoading,
    error: error ? "Failed to load matches" : null,
  };
};
