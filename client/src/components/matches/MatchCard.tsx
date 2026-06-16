import { Link } from "react-router-dom";
import type { Match } from "../../types/match";
import { Calendar, MapPin } from "lucide-react";

type MatchCardProps = {
  match: Match;
};

const sportBadgeStyles: Record<Match["sport"], string> = {
  football: "bg-lime text-ink",
  tennis: "bg-ink text-surface",
};

const sportGradients: Record<Match["sport"], string> = {
  football: "bg-gradient-to-br from-lime/40 to-ink/10",
  tennis: "bg-gradient-to-br from-ink/20 to-lime/20",
};

const statusConfig: Record<string, { label: string; dot: string }> = {
  open: { label: "Open", dot: "bg-success" },
  full: { label: "Full", dot: "bg-warning" },
  cancelled: { label: "Cancelled", dot: "bg-danger" },
  completed: { label: "Completed", dot: "bg-ink-subtle" },
};

const MatchCard = ({ match }: MatchCardProps) => {
  const {
    id,
    sport,
    status,
    startTime,
    playersPerTeam,
    numberOfTeams,
    minSkillLevel,
    maxSkillLevel,
    venue,
    organizer,
  } = match;

  const maxPlayers = playersPerTeam * numberOfTeams;
  const sportIcon = sport === "football" ? "⚽" : "🎾";

  const statusInfo = statusConfig[status] ?? {
    label: status,
    dot: "bg-ink-subtle",
  };

  const formattedDate = new Date(startTime).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:shadow-md">
      <div className="relative h-44">
        {venue.photoUrl ? (
          <img
            src={venue.photoUrl}
            alt={venue.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={`h-full w-full ${sportGradients[sport]}`} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${sportBadgeStyles[sport]}`}
        >
          <span>{sportIcon}</span>
          <span>{sport}</span>
        </span>

        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-ink">
          <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`} />
          {statusInfo.label}
        </span>

        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-ink">{venue.name}</h3>

        <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
          <MapPin className="h-3.5 w-3.5" />
          {venue.city}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm">
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
      </div>
      <div className="flex items-center justify-between bg-ink px-5 py-3">
        <span className="text-sm text-surface/70">
          Organized by{" "}
          <span className="font-medium text-surface">{organizer.username}</span>
        </span>

        <Link
          to={`/matches/${id}`}
          className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-lime-dark"
        >
          Preview Match
        </Link>
      </div>
    </div>
  );
};

export default MatchCard;
