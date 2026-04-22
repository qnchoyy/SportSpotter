import type { UpdateUserPayload, User } from "../types/user";
import { client } from "./client";

export const usersService = {
  async getCurrentUser(): Promise<User> {
    const response = await client.get<User>("/users/me");
    return response.data;
  },

  async updateCurrentUser(updateUserPaylod: UpdateUserPayload): Promise<User> {
    const response = await client.patch<User>("/users/me", updateUserPaylod);
    return response.data;
  },
};
