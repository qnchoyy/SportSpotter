import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/user";
import { usersService } from "../services/users";
import { useAuth } from "../contexts/AuthContext";

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuth();
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: usersService.getCurrentUser,
    enabled: !!isAuthenticated,
  });

  return {
    profile: data,
    loading: isLoading,
    error,
  };
};
