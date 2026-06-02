import { useMemo } from "react";
import { Link } from "react-router-dom";
import MatchCard from "../matches/MatchCard";
import { useMatches } from "../../hooks/useMatches";
import Spinner from "../ui/Spinner";

const FeaturedMatches = () => {
  const now = useMemo(() => new Date().toISOString(), []);
  const { matches, loading, error } = useMatches({ dateFrom: now });

  const featuredMatches = matches.slice(0, 3);

  return (
    <section className="py-12">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-lime-dark">
              Happening soon
            </span>
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink">
            Upcoming matches
          </h2>
        </div>

        <Link
          to="/matches"
          className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          View all →
        </Link>
      </div>

      <div className="mt-12">
        {loading && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {error && (
          <p className="py-12 text-center text-danger">
            Failed to load matches.
          </p>
        )}

        {!loading && !error && featuredMatches.length === 0 && (
          <p className="py-12 text-center text-ink-muted">
            No matches available yet.
          </p>
        )}

        {!loading && !error && featuredMatches.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredMatches.map((match) => (
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
        )}
      </div>
    </section>
  );
};

export default FeaturedMatches;
