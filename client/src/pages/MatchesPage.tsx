import { useEffect, useState } from "react";
import MatchCard from "../components/matches/MatchCard";
import { matchesService } from "../services/matches";
import type { Match } from "../types/match";

const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await matchesService.getMatches();
        setMatches(data);
      } catch (error) {
        console.error("Failed to load matches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="py-10">
        <h1 className="text-3xl font-bold">All Matches</h1>
        <p className="mt-6 text-white/70">Loading matches...</p>
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
