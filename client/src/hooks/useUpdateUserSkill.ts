import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSkillsService } from "../services/userSkills";

export const useUpdateUserSkill = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: userSkillsService.updateUserSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSkills"] });
    },
  });

  return mutation;
};
