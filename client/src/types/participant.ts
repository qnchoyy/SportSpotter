export type Participant = {
  id: string;
  team: number;
  joinedAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
};
