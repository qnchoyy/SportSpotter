import { useEffect, useState } from "react";
import MatchCard from "../matches/MatchCard";
import { matchesService } from "../../services/matches";
import type { Match } from "../../types/match";

const FeaturedMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await matchesService.getMatches();
        setMatches(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load featured matches", error);
      }
    };

    fetchMatches();
  }, []);

  if (!matches.length) {
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
    </section>
  );
};

export default FeaturedMatches;
