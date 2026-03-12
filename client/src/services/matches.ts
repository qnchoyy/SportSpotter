import { client } from "./client";

export const matchesService = {
  async getMatches() {
    const response = await client.get("/matches");
    return response.data;
  },
};
