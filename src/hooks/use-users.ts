"use client";

import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services/user-service";
import type { User, ApiResponse } from "@/types";

export function useUsers() {
  return useQuery<ApiResponse<User[]>>({
    queryKey: ["users"],
    queryFn: () => userService.getUsers(),
  });
}

export function useUser(id: string) {
  return useQuery<ApiResponse<User>>({
    queryKey: ["users", id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
  });
}

export function useCurrentUser() {
  return useQuery<ApiResponse<User>>({
    queryKey: ["current-user"],
    queryFn: () => userService.getCurrentUser(),
  });
}