import { useEffect, useState } from "react";
import type { Match } from "../types/match";
import { matchesService } from "../services/matches";

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await matchesService.getMatches();
        setMatches(data);
      } catch (err) {
        console.error("Failed to fetch matches", err);
        setError("Failed to load matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading, error };
};
