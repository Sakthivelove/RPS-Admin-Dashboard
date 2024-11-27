import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import { api } from '../api';

// Define the Activity interface
interface Activity {
    id: number;
    telegramId: string;
    action: string;
    ip: string;
    status: string;
    device: string;
    reason: string | null; // Reason can be null or a string
    createdAt: string; // Date string in ISO format
    updatedAt: string; // Date string in ISO format
}

// Function to fetch activities
const fetchActivities = async (): Promise<Activity[]> => {
    const response = await api.get('/dev/activities', {
        params: {
            page: 1,
            limit: 10,
        },
    });
    return response.data.activities; // We expect an array of activities
};

const Dashboard: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Track the search term

    // Use TanStack Query's useQuery hook for data fetching
    const { data: activities, error, isLoading } = useQuery<Activity[]>({
        queryKey: ['activities'],
        queryFn: fetchActivities,
    });

    // Handle search functionality
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm.toLowerCase());
    };

    // Filter data based on the search term
    const filteredData = activities?.filter((activity) =>
        Object.values(activity).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm)
        )
    ) || [];

    // Loading State
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full text-white bg-[#121212]">
                <div className="flex items-center">
                    <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-4 border-[#45F882] rounded-full mr-4"></div>
                    <span className="text-xl">Loading...</span>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex justify-center items-center h-full text-white bg-[#121212]">
                <div className="bg-red-500 p-6 rounded-md shadow-lg">
                    <h2 className="text-xl font-bold text-white">Error fetching activities!</h2>
                    <p className="mt-2 text-white">Something went wrong. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-[#121212] min-h-screen">
            <h1 className="text-4xl font-bold text-[#45F882] mb-6">
                Dashboard - Activity Log
            </h1>

            {/* Search Bar Component */}
            <div className="mb-6">
                <SearchBar placeholder="Search activities..." onSearch={handleSearch} />
            </div>

            {/* Table Component */}
            <div className="overflow-hidden max-h-screen">
                <Table
                    columns={['S.No', 'Telegram ID', 'Action', 'IP', 'Status', 'Device', 'Reason', 'Date']}
                    data={filteredData.map((activity, index) => ({
                        'S.No': index + 1,
                        'Telegram ID': activity.telegramId,
                        'Action': activity.action,
                        'IP': activity.ip,
                        'Status': activity.status,
                        'Device': activity.device,
                        'Reason': activity.reason || 'N/A',
                        'Date': new Date(activity.createdAt).toLocaleString(),
                    }))}
                    rowColor="bg-[#0F1C23]"
                    tableBgColor="bg-[#1A1D26]"
                    headerTextColor="text-[#45F882]"
                    customCellTextColor={(row, col) =>
                        col === 'Status' ? (row['Status'] === 'success' ? '#4CAF50' : '#FF5722') : 'white'
                    }
                    alternateColumnTextColors={(column) =>
                        column === 'Date' ? ['#45F882', '#FFD700'] : []
                    }
                    height="calc(100vh - 220px)"
                />
            </div>
        </div>
    );
};

export default Dashboard;
