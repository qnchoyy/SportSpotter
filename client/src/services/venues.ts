import type { SportType } from "../types/userSkill";
import type { Venue } from "../types/venue";
import type { VenueSlot } from "../types/venueSlot";
import { client } from "./client";

export const venuesService = {
  async getVenues(sport?: SportType): Promise<Venue[]> {
    const response = await client.get<Venue[]>("/venues", {
      params: { sport },
    });
    return response.data;
  },

  async getAvailableSlotsForVenue(
    venueId: string,
    date: string,
  ): Promise<VenueSlot[]> {
    const response = await client.get<VenueSlot[]>(`/venues/${venueId}/slots`, {
      params: { date },
    });
    return response.data;
  },

  async getVenueById(venueId: string): Promise<Venue> {
    const response = await client.get<Venue>(`/venues/${venueId}`);
    return response.data;
  },
};
