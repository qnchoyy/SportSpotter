import type { CreateMatchFormState } from "../../../types/createMatch";

type Props = {
  form: CreateMatchFormState;
  setForm: React.Dispatch<React.SetStateAction<CreateMatchFormState>>;
};

const SelectSportStep = ({ form, setForm }: Props) => {
  const sports = [
    { value: "football", label: "Football", icon: "⚽" },
    { value: "tennis", label: "Tennis", icon: "🎾" },
  ];

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-3">
        Sport
      </p>

      <div className="grid grid-cols-2 gap-3">
        {sports.map((sport) => {
          const isSelected = form.sport === sport.value;

          return (
            <button
              key={sport.value}
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  sport: sport.value as "football" | "tennis",
                  venueId: undefined,
                  date: undefined,
                  startTime: undefined,
                  tennisFormat: undefined,
                })
              }
              className={`relative flex flex-col items-center gap-2 py-4 px-3 rounded-xl border transition-all duration-200 group ${
                isSelected
                  ? "border-blue-500/60 bg-blue-500/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(59,130,246,0.15)]"
                  : "border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6"
              }`}
            >
              <span className="text-2xl">{sport.icon}</span>

              <span
                className={`text-sm font-semibold transition-colors ${
                  isSelected
                    ? "text-blue-300"
                    : "text-white/60 group-hover:text-white/80"
                }`}
              >
                {sport.label}
              </span>

              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
      {form.sport === "tennis" && (
        <div className="mt-4">
          <p className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">
            Format
          </p>

          <div className="grid grid-cols-2 gap-2">
            {["singles", "doubles"].map((format) => {
              const isSelected = form.tennisFormat === format;

              return (
                <button
                  key={format}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      tennisFormat: format as "singles" | "doubles",
                    })
                  }
                  className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-blue-500/60 bg-blue-500/20 text-blue-300"
                      : "border-white/10 text-white/60 hover:border-white/25"
                  }`}
                >
                  {format}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSportStep;
