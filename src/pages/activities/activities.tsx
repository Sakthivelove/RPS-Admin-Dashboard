import React, { useCallback, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Table from '../../components/common/Table';
import { api } from '../../api/api';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';

// Define the Activity interface
interface Activity {
    id: number;
    telegramId: string;
    action: string;
    ip: string;
    status: string;
    device: string;
    reason: string | null;
    createdAt: string;
    updatedAt: string;
}

// Fetch activities function with pagination support
const fetchActivities = async ({ pageParam = 1 }: { pageParam: number }) => {
    const response = await api.get('/dev/activities', {
        params: {
            page: pageParam,
            limit: 10, // Fixed limit for infinite scrolling
        },
    });
    return response.data;
};

const Dashboard: React.FC = () => {
    const { sidebarActive } = useSidebar();
    const observer = useRef<IntersectionObserver | null>(null);

    // Fetch activities using useInfiniteQuery
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['activities'],
        queryFn: ({ pageParam = 1 }) => fetchActivities({ pageParam }), // Default value for pageParam
        getNextPageParam: (lastPage, allPages) => {
            const currentPage = allPages.length;
            const totalPages = Math.ceil((lastPage?.total || 0) / 10); // Calculate total pages
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        initialPageParam: 1, // Explicitly set the initial page parameter
    });
    

    // Combine all pages of activities
    const activities = useMemo(() => {
        return data?.pages.flatMap((page: { activities: Activity[] }, pageIndex: number) =>
            page.activities.map((activity: Activity, index: number) => ({
                'S.No': index + 1 + pageIndex * 10,
                'Telegram ID': activity.telegramId,
                Action: activity.action,
                IP: activity.ip,
                Status: activity.status,
                Device: activity.device,
                Reason: activity.reason || 'N/A',
                Date: new Date(activity.createdAt).toLocaleString(),
            }))
        );
    }, [data]);
    

    // Handle infinite scrolling
    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading || isFetching) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });

            if (node) observer.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isLoading, isFetching]
    );

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen`}>
            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Fetching activity logs. Please wait..."
                errorMessage="Unable to retrieve activity logs. Please try again later."
                className="h-screen"
            />

            {!isLoading && !error && (
                <div className="m-[2%]">
                    <Table
                        columns={['S.No', 'Telegram ID', 'Action', 'IP', 'Status', 'Device', 'Reason', 'Date']}
                        data={activities}
                        title="Activity Log"
                        showSearchBar={true}
                        rowColor="bg-[#0F1C23]"
                        tableBgColor="bg-[#1A1D26]"
                        headerTextColor="text-[#45F882]"
                        customCellTextColor={(row, col) =>
                            col === 'Status'
                                ? row['Status'] === 'success'
                                    ? '#4CAF50'
                                    : '#FF5722'
                                : 'white'
                        }
                        height="67vh"
                    />

                    {isFetching && <div className="text-center text-[#45F882]">Loading more activities...</div>}

                    <div ref={lastElementRef} className="h-4" /> {/* Trigger infinite scrolling */}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
