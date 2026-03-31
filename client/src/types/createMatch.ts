import type { SkillLevel, SportType } from "./userSkill";

export type CreateMatchFormState = {
  sport?: SportType;
  venueId?: string;
  date?: string;
  startTime?: string;

  minSkillLevel?: SkillLevel;
  maxSkillLevel?: SkillLevel;

  tennisFormat?: "singles" | "doubles";
};
