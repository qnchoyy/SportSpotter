import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth";
import { client } from "./client";

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>("/auth/login", payload);
    return response.data;
  },
};
