import type { SkillLevel, SportType } from "./userSkill";

export type Match = {
  id: string;
  sport: SportType;
  status: string;
  startTime: string;
  playersPerTeam: number;
  numberOfTeams: number;
  minSkillLevel: SkillLevel;
  maxSkillLevel: SkillLevel;
  venue: {
    name: string;
    city: string;
    address: string;
  };
  organizer: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
};

export type CreateMatchRequest = {
  sport: SportType;
  venueId: string;
  date: string;
  startTime: string;
  minSkillLevel: SkillLevel;
  maxSkillLevel: SkillLevel;
  tennisFormat?: "singles" | "doubles";
};

export type MatchQueryParams = {
  sport?: SportType;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  city?: string;
  availableOnly?: boolean;
};
