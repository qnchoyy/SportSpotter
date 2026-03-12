export type Match = {
  id: string;
  sport: "football" | "tennis";
  startTime: string;
  playersPerTeam: number;
  numberOfTeams: number;
  minSkillLevel: string;
  maxSkillLevel: string;
  venue: {
    name: string;
    city: string;
  };
};
