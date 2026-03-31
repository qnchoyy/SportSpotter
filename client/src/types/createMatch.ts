import type { SportType } from "./userSkill";

export type CreateMatchFormState = {
  sport?: SportType;
  venueId?: string;
  date?: string;
  startTime?: string;

  minSkillLevel?: string;
  maxSkillLevel?: string;

  tennisFormat?: "singles" | "doubles";
};
