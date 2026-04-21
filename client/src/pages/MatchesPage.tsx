import { NavLink, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import type { SportType } from "../types/userSkill";
import { useMatches } from "../hooks/useMatches";
import MatchCard from "../components/matches/MatchCard";

const MatchesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab = tabParam === "past" ? "past" : "upcoming";
  const sport = (searchParams.get("sport") ?? undefined) as
    | SportType
    | undefined;
  const city = searchParams.get("city") ?? "";
  const availableOnly = searchParams.get("availableOnly") === "true";
  const [debouncedCity, setDebouncedCity] = useState(
    searchParams.get("city") ?? "",
  );

  const { user } = useAuth();

  const updateFilter = (key: string, value: string | undefined) => {
    const next = new URLSearchParams(searchParams.toString());

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedCity(city);
    }, 400);

    return () => clearTimeout(timeout);
  }, [city]);

  const params = useMemo(() => {
    const now = new Date().toISOString();
    const base = activeTab === "upcoming" ? { dateFrom: now } : { dateTo: now };

    return {
      ...base,
      ...(sport ? { sport } : {}),
      ...(debouncedCity.trim()
        ? { city: debouncedCity.trim().toLowerCase() }
        : {}),
      ...(availableOnly ? { availableOnly: true } : {}),
    };
  }, [activeTab, sport, debouncedCity, availableOnly]);

  const { matches, loading, error } = useMatches(params);

  const hasActiveFilters = !!sport || !!city.trim() || availableOnly;

  return (
    <div className="py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Matches</h1>
        {user && (
          <NavLink
            to="/matches/create"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors"
          >
            Create Match
          </NavLink>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
          <button
            onClick={() => updateFilter("tab", "upcoming")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              activeTab === "upcoming"
                ? "bg-white text-black font-medium"
                : "text-white/60 hover:text-white"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => updateFilter("tab", "past")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              activeTab === "past"
                ? "bg-white text-black font-medium"
                : "text-white/60 hover:text-white"
            }`}
          >
            Past
          </button>
        </div>

        <select
          value={sport ?? ""}
          onChange={(e) => updateFilter("sport", e.target.value || undefined)}
          className="px-3 py-1.5 rounded-full  bg-slate-800 border border-white/10 text-sm text-white outline-none cursor-pointer"
        >
          <option value="">All sports</option>
          <option value="football">Football</option>
          <option value="tennis">Tennis</option>
        </select>

        <input
          type="text"
          placeholder="City..."
          value={city}
          onChange={(e) => {
            const value = e.target.value;
            updateFilter("city", value || undefined);
          }}
          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 outline-none"
        />

        <button
          onClick={() =>
            updateFilter("availableOnly", availableOnly ? undefined : "true")
          }
          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
            availableOnly
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
          }`}
        >
          Available only
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Clear filters
            </button>
          )}
          {!loading && (
            <span className="text-xs text-white/40 px-3 py-1 rounded-full border border-white/10 bg-white/5">
              {matches.length} {matches.length === 1 ? "match" : "matches"}
            </span>
          )}
        </div>
      </div>

      <div>
        {loading && <p className="text-white/50 text-sm">Loading matches...</p>}

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {!loading && !error && matches.length === 0 && (
          <div className="flex flex-col items-center gap-3 text-center py-20 border border-dashed border-white/10 rounded-xl">
            <p className="text-white font-medium">No matches found</p>
            <p className="text-sm text-white/40">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}

        {!loading && !error && matches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
