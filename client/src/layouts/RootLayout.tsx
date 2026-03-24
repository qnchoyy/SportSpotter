import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useUserSkills } from "../hooks/useUserSkills";
import { useEffect, useState } from "react";
import SkillSetupDialog from "../components/skills/SkillSetupDialog";

const RootLayout = () => {
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [hasCompletedSkillSetup, setHasCompletedSkillSetup] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { skills, loading: skillsLoading } = useUserSkills();

  const shouldShowSkillDialog =
    isAuthenticated &&
    !authLoading &&
    !skillsLoading &&
    skills.length === 0 &&
    !hasCompletedSkillSetup;

  useEffect(() => {
    if (shouldShowSkillDialog) {
      setIsSkillDialogOpen(true);
    }
  }, [shouldShowSkillDialog]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-900 to-black text-gray-100">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>

      <SkillSetupDialog
        open={isSkillDialogOpen}
        onClose={() => setIsSkillDialogOpen(false)}
        onCompleted={() => setHasCompletedSkillSetup(true)}
      />
    </div>
  );
};

export default RootLayout;
