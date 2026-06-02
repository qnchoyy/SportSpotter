import { Link } from "react-router-dom";

type MatchCardProps = {
  id: string;
  sport: "football" | "tennis";
  venueName: string;
  city: string;
  startTime: string;
  playersPerTeam: number;
  numberOfTeams: number;
  minSkillLevel: string;
  maxSkillLevel: string;
};

const sportBadgeStyles: Record<MatchCardProps["sport"], string> = {
  football: "bg-lime text-ink",
  tennis: "bg-ink text-surface",
};

const MatchCard = ({
  id,
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
    <Link
      to={`/matches/${id}`}
      className="block rounded-xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-ink/30"
    >
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${sportBadgeStyles[sport]}`}
      >
        <span>{sportIcon}</span>
        <span>{sport}</span>
      </span>

      <h3 className="mt-4 text-lg font-bold text-ink">{venueName}</h3>
      <p className="mt-1 text-sm text-ink-muted">{city}</p>

      <p className="mt-3 text-sm font-medium text-ink">{formattedDate}</p>

      <div className="my-4 h-px bg-border" />

      <div className="flex items-center justify-between text-sm">
        <div className="text-ink-muted">
          <span className="font-semibold text-ink">
            {playersPerTeam}v{playersPerTeam}
          </span>{" "}
          · {maxPlayers} players
        </div>
        <div className="text-ink-muted">
          Skill:{" "}
          <span className="font-semibold text-ink">
            {minSkillLevel}–{maxSkillLevel}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MatchCard;
