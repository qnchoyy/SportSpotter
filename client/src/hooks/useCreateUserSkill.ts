import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSkillsService } from "../services/userSkills";

export const useCreateUserSkill = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: userSkillsService.createUserSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSkills"] });
    },
  });

  return mutation;
};
