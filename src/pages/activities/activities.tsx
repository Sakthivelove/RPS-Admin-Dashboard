import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Table from '../../components/common/Table';
import { api } from '../../api/api';
import { useSidebar } from '../../context/SidebarContext';

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
const fetchActivities = async (page: number, limit: number): Promise<{ activities: Activity[]; totalCount: number }> => {
  const response = await api.get('/dev/activities', {
    params: { page, limit },
  });
  return response.data;
};

const Dashboard: React.FC = () => {
  const { sidebarActive } = useSidebar();

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Fetch activity logs with pagination
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['activities', page, limit],
    queryFn: () => fetchActivities(page, limit),

  });

  // Update total pages when totalCount changes
  useEffect(() => {
    if (data?.totalCount) {
      setTotalPages(Math.ceil(data.totalCount / limit));
    }
  }, [data?.totalCount, limit]);

  const columns = ['S.No', 'Telegram ID', 'More Info', 'IP', 'Status', 'Device', 'Reason', 'Date'];

  // Prepare data for the table
  const activities = data?.activities.map((activity, index) => ({
    'S.No': index + 1 + (page - 1) * limit,
    'Telegram ID': activity.telegramId,
    'More Info': activity.action,
    IP: activity.ip,
    Status: activity.status,
    Device: activity.device,
    Reason: activity.reason || 'N/A',
    Date: new Date(activity.createdAt).toLocaleString(),
  }));

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (totalPages || 0)) {
      setPage(newPage);
      refetch(); // Trigger refetch immediately when the page changes
    }
  };


  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen`}>
      <div className="relative z-10 overflow-auto h-full p-[2%]">
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
          height="60vh"
          page={page}
          limit={limit}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          // totalItems={data?.totalCount || 0}
          isLoading={isLoading}
          error={isError}
          errorMessage={error?.message}
          loadingMessage="Fetching activity logs. Please wait..."
        />
      </div>
    </div>
  );
};

export default Dashboard;
