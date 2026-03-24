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

const TennisCourt = ({
  playersPerTeam,
  participants,
  onJoin,
  currentUserId,
  isJoining,
}: Props) => {
  const team1 = participants.filter((p) => p.team === 1);
  const team2 = participants.filter((p) => p.team === 2);

  const isDoubles = playersPerTeam === 2;

  return (
    <div
      className={`relative  w-full h-80 rounded-xl bg-orange-700/90 border border-white/20 overflow-hidden ${
        isJoining ? "pointer-events-none" : ""
      }`}
    >
      {isJoining && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
          <Spinner size="md" />
        </div>
      )}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white/20 -translate-x-1/2" />
      {isDoubles ? (
        <>
          <div className="absolute left-1/4 top-[25%] -translate-x-1/2 -translate-y-1/2">
            <PlayerSlot
              player={team1[0]}
              onClick={() => onJoin(1)}
              currentUserId={currentUserId}
            />
          </div>

          <div className="absolute left-1/4 top-[75%] -translate-x-1/2 -translate-y-1/2">
            <PlayerSlot
              player={team1[1]}
              onClick={() => onJoin(1)}
              currentUserId={currentUserId}
            />
          </div>
        </>
      ) : (
        <div className="absolute left-1/4 top-[50%] -translate-x-1/2 -translate-y-1/2">
          <PlayerSlot
            player={team1[0]}
            onClick={() => onJoin(1)}
            currentUserId={currentUserId}
          />
        </div>
      )}

      {isDoubles ? (
        <>
          <div className="absolute right-1/4 top-[25%] translate-x-1/2 -translate-y-1/2">
            <PlayerSlot
              player={team2[0]}
              onClick={() => onJoin(2)}
              currentUserId={currentUserId}
            />
          </div>

          <div className="absolute right-1/4 top-[75%] translate-x-1/2 -translate-y-1/2">
            <PlayerSlot
              player={team2[1]}
              onClick={() => onJoin(2)}
              currentUserId={currentUserId}
            />
          </div>
        </>
      ) : (
        <div className="absolute right-1/4 top-[50%] translate-x-1/2 -translate-y-1/2">
          <PlayerSlot
            player={team2[0]}
            onClick={() => onJoin(2)}
            currentUserId={currentUserId}
          />
        </div>
      )}
    </div>
  );
};

export default TennisCourt;
