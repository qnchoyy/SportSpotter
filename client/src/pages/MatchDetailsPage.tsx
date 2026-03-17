import { useParams } from "react-router-dom";
import { useMatch } from "../hooks/useMatch";
import Spinner from "../components/ui/Spinner";

const MatchDetailsPage = () => {
  const { id } = useParams();
  const { match, loading, error } = useMatch(id!);

  if (loading) {
    return (
      <div className="py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-400">Failed to load match.</p>
      </div>
    );
  }

  const formattedDate = new Date(match.startTime).toLocaleString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const maxPlayers = match.playersPerTeam * match.numberOfTeams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/50 p-8">
        <h1 className="text-3xl font-bold capitalize">{match.sport} Match</h1>

        <div className="mt-4 text-gray-400">
          {match.venue.name} • {match.venue.city}
        </div>

        <div className="mt-2 text-gray-400">{formattedDate}</div>

        <div className="mt-6 text-gray-300">
          {match.playersPerTeam}v{match.playersPerTeam} • {match.numberOfTeams}{" "}
          teams
        </div>

        <div className="text-gray-300">
          Skill: {match.minSkillLevel} - {match.maxSkillLevel}
        </div>

        <div className="mt-4 text-gray-300">Max players: {maxPlayers}</div>
      </div>
    </div>
  );
};

export default MatchDetailsPage;
