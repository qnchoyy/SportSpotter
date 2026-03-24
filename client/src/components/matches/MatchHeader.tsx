import type { Match } from "../../types/match";

type Props = {
  match: Match;
};

const MatchHeader = ({ match }: Props) => {
  const { sport, venue, startTime, playersPerTeam } = match;

  const format = `${playersPerTeam}vs${playersPerTeam}`;
  const date = new Date(startTime);

  const formatted = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-6 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur">
      <div className="flex justify-between items-center mb-3">
        <span className="px-3 py-1 text-sm rounded-full bg-white/10">
          {sport === "football" ? "⚽ Football" : "🎾 Tennis"}
        </span>
        <span className="px-3 py-1 text-sm rounded-full bg-white/10">
          {format}
        </span>
      </div>

      <h1 className="text-3xl font-semibold mt-2">{venue.name}</h1>
      <p className="text-white/70 mt-1 tracking-wide">
        {venue.city} • {formatted}
      </p>
    </div>
  );
};

export default MatchHeader;
