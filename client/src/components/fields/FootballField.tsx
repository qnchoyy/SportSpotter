import type { Participant } from "../../types/participant";
import Spinner from "../ui/Spinner";
import PlayerSlot from "./PlayerSlot";

type Props = {
  playersPerTeam: number;
  participants: Participant[];
  onJoin: (team: number) => void;
  currentUserId?: string;
  isJoining?: boolean;
};

const FootballField = ({
  playersPerTeam,
  participants,
  onJoin,
  currentUserId,
  isJoining,
}: Props) => {
  const team1 = participants.filter((p) => p.team === 1);
  const team2 = participants.filter((p) => p.team === 2);

  const splitIntoRows = (count: number) => {
    const firstRow = Math.ceil(count / 2);
    const secondRow = count - firstRow;
    return { firstRow, secondRow };
  };

  const { firstRow, secondRow } = splitIntoRows(playersPerTeam);

  return (
    <div
      className={`relative w-full h-80 rounded-xl bg-green-700 border border-white/20 overflow-hidden ${
        isJoining ? "pointer-events-none" : ""
      }`}
    >
      {isJoining && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
          <Spinner size="md" />
        </div>
      )}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/20 -translate-x-1/2" />

      <div className="absolute left-1/2 top-1/2 w-24 h-24 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
        <div className="flex gap-3 justify-center">
          {Array.from({ length: firstRow }).map((_, i) => {
            const player = team1[i];

            return (
              <PlayerSlot
                key={`team1-r1-${i}`}
                player={player}
                onClick={() => onJoin(1)}
                currentUserId={currentUserId}
              />
            );
          })}
        </div>

        <div className="flex gap-3 justify-center">
          {Array.from({ length: secondRow }).map((_, i) => {
            const player = team1[firstRow + i];

            return (
              <PlayerSlot
                key={`team1-r2-${i}`}
                player={player}
                onClick={() => onJoin(1)}
                currentUserId={currentUserId}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute right-1/4 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
        <div className="flex gap-3 justify-center">
          {Array.from({ length: firstRow }).map((_, i) => {
            const player = team2[i];

            return (
              <PlayerSlot
                key={`team2-r1-${i}`}
                player={player}
                onClick={() => onJoin(2)}
                currentUserId={currentUserId}
              />
            );
          })}
        </div>

        <div className="flex gap-3 justify-center">
          {Array.from({ length: secondRow }).map((_, i) => {
            const player = team2[firstRow + i];

            return (
              <PlayerSlot
                key={`team2-r2-${i}`}
                player={player}
                onClick={() => onJoin(2)}
                currentUserId={currentUserId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FootballField;
