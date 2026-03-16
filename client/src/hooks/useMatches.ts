import type { Match } from "../types/match";
import { matchesService } from "../services/matches";
import { useQuery } from "@tanstack/react-query";

export const useMatches = () => {
  const { data, isLoading, error } = useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: matchesService.getMatches,
  });

  return {
    matches: data ?? [],
    loading: isLoading,
    error: error ? "Failed to load matches" : null,
  };
};
