import { useState } from "react";
import { type SportType, type SkillLevel } from "../../types/userSkill";
import { SPORTS } from "../../constants/sports";
import toast from "react-hot-toast";
import { useCreateUserSkill } from "../../hooks/useCreateUserSkill";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SkillSetupDialog = ({ open, onClose }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [skills, setSkills] = useState<Record<SportType, SkillLevel>>({
    football: "beginner",
    tennis: "beginner",
  });
  const mutation = useCreateUserSkill();

  if (!open) return null;

  const handleSave = async () => {
    try {
      setIsSaving(true);

      await Promise.all(
        SPORTS.map((sport) =>
          mutation.mutateAsync({
            sport,
            skillLevel: skills[sport],
          }),
        ),
      );

      toast.success("Skills saved successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save skills");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-white/10 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-2">Set your skill level</h2>

        <p className="text-white/60 text-sm mb-6">
          To continue, please select your skill level for each sport. This helps
          us match you with the right players.
        </p>

        <div className="space-y-4">
          {SPORTS.map((sport) => (
            <div key={sport}>
              <label className="block mb-1 text-sm text-white/80 capitalize">
                {sport}
              </label>

              <select
                value={skills[sport]}
                onChange={(e) =>
                  setSkills((prev) => ({
                    ...prev,
                    [sport]: e.target.value as SkillLevel,
                  }))
                }
                disabled={isSaving}
                className="w-full p-2 rounded-lg bg-slate-800 border border-white/10 focus:border-indigo-500 focus:outline-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full mt-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold transition hover:brightness-110 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default SkillSetupDialog;
