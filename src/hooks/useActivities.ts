import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "../services/activityService";

// Fetch activity logs with pagination
export const useActivities = (
    page: number,
    limit: number,
    search?: string
) => useQuery({
    queryKey: ['activities', page, limit, search],
    queryFn: () => fetchActivities(page, limit, search),
    enabled: page > 0 && limit > 0, // Only fetch if valid parameters are passed
    refetchOnWindowFocus: false, // Optional: Disable refetching when window is focused
});