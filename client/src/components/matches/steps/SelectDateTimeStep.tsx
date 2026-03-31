import type { CreateMatchFormState } from "../../../types/createMatch";
import type { Slot } from "../../../types/slot";
import Spinner from "../../ui/Spinner";

type Props = {
  form: CreateMatchFormState;
  setForm: React.Dispatch<React.SetStateAction<CreateMatchFormState>>;
  slots: Slot[];
  loading?: boolean;
};

const SelectDateTimeStep = ({ form, setForm, slots, loading }: Props) => {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-3">
        Date & Time
      </p>

      <input
        type="date"
        value={form.date ?? ""}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
            startTime: undefined,
          })
        }
        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/80 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-blue-500/5 transition-all duration-200 [color-scheme:dark]"
      />
      {form.date && (
        <div className="mt-3">
          {loading ? (
            <div className="flex justify-center py-6">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {slots.map((slot) => {
                const isSelected = form.startTime === slot.startTime;
                const isDisabled = slot.status !== "free";

                return (
                  <button
                    key={slot.startTime}
                    type="button"
                    disabled={isDisabled}
                    onClick={() =>
                      setForm({
                        ...form,
                        startTime: slot.startTime,
                      })
                    }
                    className={`py-2 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500/60 bg-blue-500/20 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                        : isDisabled
                          ? "border-white/5 bg-white/2 text-white/20 cursor-not-allowed"
                          : "border-white/10 bg-white/3 text-white/60 hover:border-white/25 hover:text-white/80"
                    }`}
                  >
                    {slot.startTime}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectDateTimeStep;
