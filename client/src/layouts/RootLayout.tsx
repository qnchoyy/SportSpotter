import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useUserSkills } from "../hooks/useUserSkills";
import { useEffect, useState } from "react";
import SkillSetupDialog from "../components/skills/SkillSetupDialog";
import Footer from "../components/layout/Footer";

const RootLayout = () => {
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { skills, loading: skillsLoading } = useUserSkills();

  const shouldShowSkillDialog =
    isAuthenticated && !authLoading && !skillsLoading && skills.length === 0;

  useEffect(() => {
    setIsSkillDialogOpen(shouldShowSkillDialog);
  }, [shouldShowSkillDialog]);

  return (
    <div className="min-h-screen text-ink">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>

      <Footer />

      <SkillSetupDialog
        open={isSkillDialogOpen}
        onClose={() => setIsSkillDialogOpen(false)}
      />
    </div>
  );
};

export default RootLayout;
