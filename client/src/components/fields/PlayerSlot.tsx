import type { Participant } from "../../types/participant";

type PlayerSlotProps = {
  player?: Participant;
  onClick: () => void;
  currentUserId?: string;
};

const PlayerSlot = ({ player, onClick, currentUserId }: PlayerSlotProps) => {
  const hasPlayer = !!player;
  const isCurrentUser = player?.user.id === currentUserId;

  return (
    <div
      onClick={() => !hasPlayer && onClick()}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition

        ${
          hasPlayer
            ? "bg-white text-black cursor-default"
            : "bg-white/70 text-black cursor-pointer hover:scale-110"
        }

        ${isCurrentUser ? "ring-2 ring-gray-400 ring-inset" : ""}
      `}
    >
      {player ? player.user.username.slice(0, 2).toUpperCase() : "+"}
    </div>
  );
};

export default PlayerSlot;
