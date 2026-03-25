import { useQuery } from "@tanstack/react-query";
import type { SportType } from "../types/userSkill";
import { venuesService } from "../services/venues";

export const useVenues = (sport?: SportType) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["venues", sport],
    queryFn: () => venuesService.getVenues(sport),
  });

  return {
    venues: data ?? [],
    loading: isLoading,
    error: error ? "Failed to load venues" : null,
  };
};
