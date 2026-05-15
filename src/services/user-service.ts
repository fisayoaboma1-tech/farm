import apiClient from "@/lib/axios";
import type { ApiResponse, User } from "@/types";

export const userService = {
  async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await apiClient.get<ApiResponse<User[]>>("/users");
    return response.data;
  },

  async getUserById(id: string): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me");
    return response.data;
  },
};