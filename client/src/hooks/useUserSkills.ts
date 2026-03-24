import { useQuery } from "@tanstack/react-query";
import type { UserSkill } from "../types/userSkill";
import { userSkillsService } from "../services/userSkills";

export const useUserSkills = () => {
  const { data, isLoading, error } = useQuery<UserSkill[]>({
    queryKey: ["userSkills"],
    queryFn: userSkillsService.getUserSkills,
  });

  return {
    skills: data ?? [],
    loading: isLoading,
    error,
  };
};
