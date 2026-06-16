import { NavLink, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { SportType } from "../types/userSkill";
import { useMatches } from "../hooks/useMatches";
import MatchCard from "../components/matches/MatchCard";
import Spinner from "../components/ui/Spinner";

const FilterGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-lime" />
      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
        {label}
      </span>
    </div>
    <div className="flex items-center gap-2">{children}</div>
  </div>
);

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

  const changeTab = (tab: "upcoming" | "past") => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("tab", tab);

    if (tab === "past") {
      next.delete("availableOnly");
    }

    setSearchParams(next);
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

  const sportOptions: {
    value: SportType | undefined;
    label: string;
    icon?: string;
  }[] = [
    { value: undefined, label: "All sports" },
    { value: "football", label: "Football", icon: "\u26bd" },
    { value: "tennis", label: "Tennis", icon: "\ud83c\udfbe" },
  ];

  return (
    <div className="py-6 space-y-6">
      <div className="rounded-2xl border border-border bg-surface px-5 py-4 shadow-md">
        <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
          <FilterGroup label="View">
            <div className="flex items-center gap-1 rounded-full bg-surface-muted p-1">
              {(["upcoming", "past"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => changeTab(tab)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-ink text-surface"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FilterGroup>

          <div className="h-10 w-px self-end bg-border" />

          <FilterGroup label="Sport">
            {sportOptions.map((option) => {
              const isActive = sport === option.value;

              return (
                <button
                  key={option.label}
                  onClick={() => updateFilter("sport", option.value)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-ink text-surface"
                      : "border border-border text-ink-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {option.icon && <span>{option.icon}</span>}
                  {option.label}
                </button>
              );
            })}
          </FilterGroup>

          <div className="h-10 w-px self-end bg-border" />

          <FilterGroup label="Search">
            <input
              type="text"
              placeholder="City..."
              value={city}
              onChange={(e) =>
                updateFilter("city", e.target.value || undefined)
              }
              className="w-36 rounded-full border border-border bg-surface-muted px-4 py-1.5 text-sm text-ink placeholder:text-ink-subtle outline-none transition-colors focus:border-ink/30"
            />

            {activeTab === "upcoming" && (
              <button
                onClick={() =>
                  updateFilter(
                    "availableOnly",
                    availableOnly ? undefined : "true",
                  )
                }
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  availableOnly
                    ? "bg-lime text-ink"
                    : "border border-border text-ink-muted hover:border-ink/30 hover:text-ink"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded border text-xs ${
                    availableOnly
                      ? "border-ink bg-ink text-lime"
                      : "border-ink-subtle"
                  }`}
                >
                  {availableOnly && "\u2713"}
                </span>
                Available only
              </button>
            )}
          </FilterGroup>

          <div className="ml-auto flex items-center gap-3 self-end">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-ink-subtle underline-offset-2 transition-colors hover:text-ink hover:underline"
              >
                Clear filters
              </button>
            )}

            {!loading && (
              <span className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted">
                {matches.length} {matches.length === 1 ? "match" : "matches"}
              </span>
            )}
          </div>
        </div>
      </div>

      {user && !loading && (
        <div className="flex justify-center">
          <div className="flex items-center gap-4 rounded-2xl bg-ink px-5 py-3 shadow-md">
            <div className="flex items-center gap-2 text-surface">
              <Plus className="h-4 w-4 text-lime" />
              <span className="text-sm font-medium">Can't find a match?</span>
            </div>

            <NavLink
              to="/matches/create"
              className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-lime-dark"
            >
              Create your own match
            </NavLink>
          </div>
        </div>
      )}

      <div>
        {loading && (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        )}

        {error && <p className="py-16 text-center text-danger">{error}</p>}

        {!loading && !error && matches.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
            <p className="font-medium text-ink">No matches found</p>
            <p className="text-sm text-ink-muted">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}

        {!loading && !error && matches.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
