import type {
  CreateMatchRequest,
  Match,
  MatchQueryParams,
} from "../types/match";
import type { Participant } from "../types/participant";
import { client } from "./client";

export const matchesService = {
  async getMatches(params?: MatchQueryParams): Promise<Match[]> {
    const response = await client.get<Match[]>("/matches", { params });
    return response.data;
  },

  async getMatch(id: string): Promise<Match> {
    const response = await client.get(`/matches/${id}`);
    return response.data;
  },

  async joinMatch(matchId: string, team: number) {
    const response = await client.post(`/matches/${matchId}/join`, {
      team,
    });
    return response.data;
  },

  async leaveMatch(matchId: string): Promise<void> {
    await client.delete(`/matches/${matchId}/leave`);
  },

  async removeParticipant(matchId: string, userId: string): Promise<void> {
    await client.delete(`/matches/${matchId}/participants/${userId}`);
  },

  async cancelMatch(matchId: string): Promise<Match> {
    const response = await client.post<Match>(`/matches/${matchId}/cancel`);
    return response.data;
  },

  async getParticipants(matchId: string): Promise<Participant[]> {
    const response = await client.get<Participant[]>(
      `/matches/${matchId}/participants`,
    );
    return response.data;
  },

  async createMatch(data: CreateMatchRequest): Promise<Match> {
    const response = await client.post<Match>(`/matches`, data);
    return response.data;
  },
};
