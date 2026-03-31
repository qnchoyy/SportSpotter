import { useNavigate } from "react-router-dom";
import { useCreateMatch } from "../../../hooks/useCreateMatch";
import type { CreateMatchFormState } from "../../../types/createMatch";
import type { SkillLevel } from "../../../types/userSkill";
import toast from "react-hot-toast";

type Props = {
  form: CreateMatchFormState;
  setForm: React.Dispatch<React.SetStateAction<CreateMatchFormState>>;
};

const skillLevels: SkillLevel[] = ["beginner", "intermediate", "advanced"];
const skillOrder: SkillLevel[] = ["beginner", "intermediate", "advanced"];

const SubmitStep = ({ form, setForm }: Props) => {
  const { mutate, isPending } = useCreateMatch();
  const navigate = useNavigate();

  const isValidRange =
    form.minSkillLevel &&
    form.maxSkillLevel &&
    skillOrder.indexOf(form.minSkillLevel) <=
      skillOrder.indexOf(form.maxSkillLevel);

  const handleSubmit = () => {
    if (!form.sport || !form.venueId || !form.date || !form.startTime) return;
    if (!form.minSkillLevel || !form.maxSkillLevel) return;

    mutate(
      {
        sport: form.sport,
        venueId: form.venueId,
        date: form.date,
        startTime: form.startTime,
        minSkillLevel: form.minSkillLevel,
        maxSkillLevel: form.maxSkillLevel,
        tennisFormat: form.sport === "tennis" ? form.tennisFormat : undefined,
      },
      {
        onSuccess: (data) => {
          toast.success("Match created successfully!");
          navigate(`/matches/${data.id}`);
        },
        onError: () => {
          toast.error("Failed to create match");
        },
      },
    );
  };

  return (
    <div className="mt-2">
      <div className="mb-4">
        <p className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">
          Min Level
        </p>

        <div className="grid grid-cols-3 gap-2">
          {skillLevels.map((level) => {
            const isSelected = form.minSkillLevel === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    minSkillLevel: level,
                  })
                }
                className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-blue-500/60 bg-blue-500/20 text-blue-300"
                    : "border-white/10 text-white/60 hover:border-white/25"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">
          Max Level
        </p>

        <div className="grid grid-cols-3 gap-2">
          {skillLevels.map((level) => {
            const isSelected = form.maxSkillLevel === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    maxSkillLevel: level,
                  })
                }
                className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-blue-500/60 bg-blue-500/20 text-blue-300"
                    : "border-white/10 text-white/60 hover:border-white/25"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {form.minSkillLevel && form.maxSkillLevel && !isValidRange && (
        <p className="text-xs text-red-400 mb-4">
          Min level cannot be higher than max level
        </p>
      )}

      {isValidRange && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 mb-4">
          <p className="text-sm text-green-400/80 font-medium">
            Everything looks good — ready to go!
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isValidRange || isPending}
        className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all ${
          isValidRange
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        {isPending ? "Creating..." : "Create Match"}
      </button>
    </div>
  );
};

export default SubmitStep;
