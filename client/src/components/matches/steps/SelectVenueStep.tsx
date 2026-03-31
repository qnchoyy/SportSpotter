import type { CreateMatchFormState } from "../../../types/createMatch";
import type { Venue } from "../../../types/venue";

type Props = {
  form: CreateMatchFormState;
  setForm: React.Dispatch<React.SetStateAction<CreateMatchFormState>>;
  venues: Venue[];
};

const SelectVenueStep = ({ form, setForm, venues }: Props) => {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-3">
        Venue
      </p>

      <div className="flex flex-col gap-2">
        {venues.map((venue) => {
          const isSelected = form.venueId === venue.id;

          return (
            <div
              key={venue.id}
              onClick={() =>
                setForm({
                  ...form,
                  venueId: venue.id,
                  date: undefined,
                  startTime: undefined,
                })
              }
              className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-blue-500/60 bg-blue-500/15 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
              }`}
            >
              {/* Left */}
              <div>
                <p
                  className={`font-semibold text-sm transition-colors ${
                    isSelected ? "text-blue-300" : "text-white/80"
                  }`}
                >
                  {venue.name}
                </p>
                <p className="text-xs text-white/40 mt-0.5">{venue.city}</p>
              </div>

              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-white/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"
                  />
                </svg>
                <span className="text-xs text-white/30">
                  {venue.capacityPlayers}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectVenueStep;
