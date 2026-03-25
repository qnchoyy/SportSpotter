export type Status = "free" | "occupied";

export type VenueSlot = {
  startTime: string;
  endTime: string;
  status: Status;
};
