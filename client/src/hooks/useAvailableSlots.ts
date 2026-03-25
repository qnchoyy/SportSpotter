import { useQuery } from "@tanstack/react-query";
import { venuesService } from "../services/venues";

export const useAvailableSlots = (venueId?: string, date?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["availableSlots", venueId, date],
    queryFn: () => venuesService.getAvailableSlotsForVenue(venueId!, date!),
    enabled: !!venueId && !!date,
  });

  return {
    slots: data ?? [],
    loading: isLoading,
    error: error ? "Failed to load venue slots" : null,
  };
};
