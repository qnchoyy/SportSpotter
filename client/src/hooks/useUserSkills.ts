import { useQuery } from "@tanstack/react-query";
import type { UserSkill } from "../types/userSkill";
import { userSkillsService } from "../services/userSkills";
import { useAuth } from "../contexts/AuthContext";

export const useUserSkills = () => {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useQuery<UserSkill[]>({
    queryKey: ["userSkills"],
    queryFn: userSkillsService.getUserSkills,
    enabled: !!isAuthenticated,
  });

  return {
    skills: data ?? [],
    loading: isLoading,
    error,
  };
};
