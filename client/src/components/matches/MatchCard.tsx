type MatchCardProps = {
  sport: "football" | "tennis";
  venueName: string;
  city: string;
  startTime: string;
  playersPerTeam: number;
  numberOfTeams: number;
  minSkillLevel: string;
  maxSkillLevel: string;
};

const MatchCard = ({
  sport,
  venueName,
  city,
  startTime,
  playersPerTeam,
  numberOfTeams,
  minSkillLevel,
  maxSkillLevel,
}: MatchCardProps) => {
  const maxPlayers = playersPerTeam * numberOfTeams;

  const sportIcon = sport === "football" ? "⚽" : "🎾";

  const formattedDate = new Date(startTime).toLocaleString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6 transition hover:-translate-y-1 hover:border-blue-500/50">
      <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-gray-200">
        <span>{sportIcon}</span>
        <span className="capitalize">{sport}</span>
      </div>

      <div className="mt-3 text-gray-400">
        {venueName} • {city}
      </div>

      <div className="mt-3 text-gray-400">{formattedDate}</div>

      <div className="mt-4 text-sm text-gray-400">
        {playersPerTeam}v{playersPerTeam} • {numberOfTeams} teams
      </div>

      <div className="text-sm text-gray-400">
        Skill: {minSkillLevel} - {maxSkillLevel}
      </div>

      <div className="mt-4 text-sm text-gray-300">
        Max players: {maxPlayers}
      </div>
    </div>
  );
};

export default MatchCard;
