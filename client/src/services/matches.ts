import { client } from "./client";

export const matchesService = {
  async getMatches() {
    const response = await client.get("/matches");
    return response.data;
  },

  async getMatch(id: string) {
    const response = await client.get(`/matches/${id}`);
    return response.data;
  },
};
