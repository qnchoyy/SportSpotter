import type { SkillLevel, SportType, UserSkill } from "../types/userSkill";
import { client } from "./client";

export const userSkillsService = {
  async getUserSkills(): Promise<UserSkill[]> {
    const response = await client.get<UserSkill[]>("/user-skills/me");
    return response.data;
  },

  async createUserSkill(data: {
    sport: SportType;
    skillLevel: SkillLevel;
  }): Promise<UserSkill> {
    const response = await client.post<UserSkill>("/user-skills", data);
    return response.data;
  },

  async updateUserSkill(data: {
    id: string;
    skillLevel: SkillLevel;
  }): Promise<UserSkill> {
    const response = await client.patch<UserSkill>(`/user-skills/${data.id}`, {
      skillLevel: data.skillLevel,
    });
    return response.data;
  },
};
