import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
const fetchActivities = async (page: number, limit: number): Promise<{ activities: Activity[]; total: number }> => {
    const response = await api.get('/dev/activities', {
        params: {
            page,
            limit,
        },
    });
    return response.data;
};

const Dashboard: React.FC = () => {
    const { sidebarActive } = useSidebar();

    // Pagination state
    const [page, setPage] = useState(1);  // Default to page 1
    const [limit] = useState(10);  // Limit remains constant at 10

    // Fetch activity logs with pagination
    const { data, error, isLoading } = useQuery({
        queryKey: ['activities', page, limit,],  // Query key should include page and limit
        queryFn: () => fetchActivities(page, limit),
    }
    );

    const columns = ['S.No', 'Telegram ID', 'Action', 'IP', 'Status', 'Device', 'Reason', 'Date'];

    // Prepare data for the table
    const activities = data?.activities.map((activity, index) => ({
        'S.No': index + 1 + (page - 1) * limit,  // Adjust index based on current page
        'Telegram ID': activity.telegramId,
        Action: activity.action,
        IP: activity.ip,
        Status: activity.status,
        Device: activity.device,
        Reason: activity.reason || 'N/A',
        Date: new Date(activity.createdAt).toLocaleString(),
    }));

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= Math.ceil((data?.total || 0) / limit)) {
            setPage(newPage);
        }
    };

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
                    <div className="">
                        <Table
                            columns={columns}
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
                    </div>

                    {/* Pagination Controls */}
                    {/*                     
                    <div className="flex justify-between items-center p-4">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="btn text-[#45F882]"  // Change text color of the button
                        >
                            Previous
                        </button>
                        <span className="text-[#45F882]">Page {page}</span>   //Change page text color 
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={data && data.activities.length < limit}
                            className="btn text-[#45F882]"  // Change text color of the button
                        >
                            Next
                        </button>
                    </div> */}

                </div>
            )}
        </div>
    );

};

export default Dashboard;
