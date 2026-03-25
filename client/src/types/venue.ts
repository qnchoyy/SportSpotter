import type { SportType } from "./userSkill";

export type Venue = {
  id: string;
  name: string;
  city: string;
  address: string;
  sportType: SportType;
  capacityPlayers: number;
};
