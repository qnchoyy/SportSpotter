import MatchCard from "../matches/MatchCard";
import { useMatches } from "../../hooks/useMatches";

const FeaturedMatches = () => {
  const { matches, loading, error } = useMatches();

  if (loading || error) return null;

  const featuredMatches = matches.slice(0, 3);

  if (!featuredMatches.length) {
    return (
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Upcoming Matches</h2>
        <p className="mt-6 text-white/70">No matches available yet.</p>
      </section>
    );
  }

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center">Upcoming Matches</h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredMatches.map((match) => (
          <MatchCard
            key={match.id}
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
    </section>
  );
};

export default FeaturedMatches;
