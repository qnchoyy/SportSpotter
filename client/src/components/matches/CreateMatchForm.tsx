import { useState } from "react";
import type { CreateMatchFormState } from "../../types/createMatch";
import { useVenues } from "../../hooks/useVenues";
import { useAvailableSlots } from "../../hooks/useAvailableSlots";
import SelectSportStep from "./steps/SelectSportStep";
import SelectVenueStep from "./steps/SelectVenueStep";
import SelectDateTimeStep from "./steps/SelectDateTimeStep";
import SubmitStep from "./steps/SubmitStep";

const CreateMatchForm = () => {
  const [form, setForm] = useState<CreateMatchFormState>({});
  const { venues } = useVenues(form.sport);
  const { slots, loading: slotsLoading } = useAvailableSlots(
    form.venueId,
    form.date,
  );

  const steps = ["Sport", "Venue", "Date & Time", "Finish"];
  const step = !form.sport
    ? 1
    : form.sport === "tennis" && !form.tennisFormat
      ? 1
      : !form.venueId
        ? 2
        : !form.date || !form.startTime
          ? 3
          : 4;
  return (
    <div className="flex justify-center py-10">
      <div className="relative w-full max-w-lg">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/10 blur-sm" />

        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

          <div className="p-8">
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-blue-400 uppercase mb-1">
                SportSpotter
              </p>

              <h1 className="text-2xl font-bold text-white mb-6">
                Create a Match
              </h1>
            </div>
            <div className="mb-8">
              <div className="flex items-center">
                {steps.map((label, i) => {
                  const stepNum = i + 1;
                  const isCompleted = step > stepNum;
                  const isActive = step === stepNum;

                  return (
                    <div
                      key={label}
                      className="flex items-center flex-1 last:flex-none"
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            isCompleted
                              ? "bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                              : isActive
                                ? "bg-blue-500/20 border-2 border-blue-400 text-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.3)]"
                                : "bg-white/5 border border-white/10 text-white/30"
                          }`}
                        >
                          {isCompleted ? "✓" : stepNum}
                        </div>
                        <span
                          className={`text-[10px] font-medium tracking-wide ${
                            isActive
                              ? "text-blue-400"
                              : isCompleted
                                ? "text-white/60"
                                : "text-white/20"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="flex-1 h-[1px] mb-5 mx-2 bg-white/10">
                          <div
                            className="h-full bg-blue-500 transition-all duration-500"
                            style={{
                              width: step > stepNum ? "100%" : "0%",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {step === 1 && <SelectSportStep form={form} setForm={setForm} />}

            {step === 2 && (
              <SelectVenueStep form={form} setForm={setForm} venues={venues} />
            )}

            {step === 3 && (
              <SelectDateTimeStep
                form={form}
                setForm={setForm}
                slots={slots}
                loading={slotsLoading}
              />
            )}

            {step === 4 && <SubmitStep form={form} setForm={setForm} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMatchForm;
