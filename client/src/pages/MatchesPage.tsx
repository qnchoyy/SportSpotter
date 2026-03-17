import MatchCard from "../components/matches/MatchCard";
import { useMatches } from "../hooks/useMatches";

const MatchesPage = () => {
  const { matches, loading, error } = useMatches();

  if (loading) {
    return (
      <div className="py-10">
        <h1 className="text-3xl font-bold">All Matches</h1>
        <p className="mt-6 text-white/70">Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10">
        <h1 className="text-3xl font-bold">All Matches</h1>
        <p className="mt-6 text-red-400">{error}</p>
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="py-10">
        <h1 className="text-3xl font-bold">All Matches</h1>
        <p className="mt-6 text-white/70">No matches available yet.</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold">All Matches</h1>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            id={match.id}
            sport={match.sport}
            venueName={match.venue.name}
            city={match.venue.city}
            startTime={match.startTime}
            playersPerTeam={match.playersPerTeam}
            numberOfTeams={match.numberOfTeams}
            minSkillLevel={match.minSkillLevel}
            maxSkillLevel={match.maxSkillLevel}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;
