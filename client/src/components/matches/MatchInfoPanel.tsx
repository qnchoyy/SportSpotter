type Props = {
  totalPlayers: number;
  maxPlayers: number;
  isJoined: boolean;
  isFull: boolean;
  isNotLoggedIn: boolean;
  minSkillLevel: string;
  maxSkillLevel: string;
  status: string;
  organizerUsername: string;
  venueAddress: string;
  venueCity: string;
};

const MatchInfoPanel = ({
  totalPlayers,
  maxPlayers,
  isJoined,
  isFull,
  isNotLoggedIn,
  minSkillLevel,
  maxSkillLevel,
  status,
  organizerUsername,
  venueAddress,
  venueCity,
}: Props) => {
  const spotsLeft = maxPlayers - totalPlayers;

  const renderStatusBadge = () => {
    if (status === "completed") {
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 backdrop-blur">
          Match finished
        </span>
      );
    }

    if (isFull) {
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-red-500/10 text-red-400">
          Match is full
        </span>
      );
    }

    return (
      <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400">
        Open to join
      </span>
    );
  };

  const renderActionMessage = () => {
    if (status === "completed") {
      return <p className="text-gray-400">This match has already finished</p>;
    }

    if (isNotLoggedIn) {
      return <p className="text-yellow-400">Login to join</p>;
    }

    if (isJoined) {
      return <p className="text-green-400">You joined this match ✅</p>;
    }

    if (isFull) {
      return <p className="text-red-400">Match is full</p>;
    }

    return <p className="text-blue-400">Select a team on the field to join</p>;
  };

  return (
    <div className="h-full flex flex-col gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="space-y-3">
        <div>
          <p className="text-lg font-semibold">
            {totalPlayers} / {maxPlayers} players
          </p>
          <p className="text-xs text-white/50 mt-0.5">{spotsLeft} spots left</p>
        </div>

        <div>{renderStatusBadge()}</div>

        <div className="flex items-center gap-2 text-sm text-white/70">
          <span className="opacity-70">👤</span>
          <span>
            Organized by{" "}
            <span className="text-white font-medium">{organizerUsername}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/70">
          <span className="opacity-70">📍</span>
          <span>
            {venueAddress}, <span className="text-white">{venueCity}</span>
          </span>
        </div>

        <div className="text-sm text-white/70">
          Skill:{" "}
          <span className="text-white font-medium">
            {minSkillLevel} → {maxSkillLevel}
          </span>
        </div>
      </div>

      <div className="text-sm pt-3 border-t border-white/10">
        {renderActionMessage()}
      </div>
    </div>
  );
};

export default MatchInfoPanel;
