import { client } from "./client";

export const healthService = {
  checkHealth: async () => {
    const response = await client.get("/health");
    return response.data;
  },

  checkLive: async () => {
    const response = await client.get("/health/live");
    return response.data;
  },

  checkReady: async () => {
    const response = await client.get("/health/ready");
    return response.data;
  },
};
