export type SportType = "football" | "tennis";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type UserSkill = {
  id: string;
  sport: SportType;
  skillLevel: SkillLevel;
};
