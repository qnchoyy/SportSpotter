export type Match = {
  id: string;
  sport: "football" | "tennis";
  status: string;
  startTime: string;
  playersPerTeam: number;
  numberOfTeams: number;
  minSkillLevel: string;
  maxSkillLevel: string;
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
