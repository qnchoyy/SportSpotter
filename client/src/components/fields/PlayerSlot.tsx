import type { Participant } from "../../types/participant";

type PlayerSlotProps = {
  player?: Participant;
  onClick: () => void;
  currentUserId?: string;
  isOrganizer?: boolean;
  onRemove?: (userId: string) => void;
};

const PlayerSlot = ({
  player,
  onClick,
  currentUserId,
  isOrganizer,
  onRemove,
}: PlayerSlotProps) => {
  const hasPlayer = !!player;
  const isCurrentUser = player?.user.id === currentUserId;
  const canRemove = isOrganizer && hasPlayer && !isCurrentUser && !!onRemove;

  return (
    <div className="relative">
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

      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove?.(player.user.id)}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs flex items-center justify-center shadow-md transition"
          aria-label="Remove player"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default PlayerSlot;
