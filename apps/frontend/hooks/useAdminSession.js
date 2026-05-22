"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@komatik/api-client";

export default function useAdminSession() {
  const query = useQuery({
    queryKey: ["admin-session"],
    queryFn: () => getMe(),
    retry: false,
  });

  return {
    admin: query.data?.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
