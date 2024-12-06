import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchGeneralSettings,
  updateModuleSettings,
  updateProjectSettings,
  Settings,
} from "../services/settings/generalSettings";

// Hook for fetching general settings
export const useGeneralSettings = () => {
  return useQuery<Settings[]>({
    queryKey: ["generalSettings"],
    queryFn: fetchGeneralSettings,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 3, // Retry failed queries up to 3 times
  });
};

// Hook for updating module settings
export const useUpdateModuleSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateModuleSettings,
    onSuccess: () => {
      // Invalidate the cache for 'generalSettings' after a successful mutation
      queryClient.invalidateQueries({
        queryKey: ["generalSettings"],
      });
    },
  });
};

// Hook for updating project settings
export const useUpdateProjectSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectSettings,
    onSuccess: () => {
      // Invalidate the cache for 'generalSettings' after a successful mutation
      queryClient.invalidateQueries({
        queryKey: ["generalSettings"],
      });
    },
  });
};