import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';

const Dashboard: React.FC = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);

    // Fetch activities from the API
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('https://idrcdf1vfl.execute-api.ap-southeast-2.amazonaws.com/dev/activities?page=1&limit=10', {
                    method: 'GET',
                    headers: {
                        'accept': '*/*'
                    }
                });
                const data = await response.json();
                setActivities(data.activities);
                setFilteredData(data.activities); // Initial data for filtered view
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    // Handle search functionality
    const handleSearch = (searchTerm: string) => {
        const lowerCasedTerm = searchTerm.toLowerCase();
        const newFilteredData = activities.filter((row) =>
            Object.values(row).some(
                (value) =>
                    value &&
                    value.toString().toLowerCase().includes(lowerCasedTerm)
            )
        );
        setFilteredData(newFilteredData);
    };

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
            <div className="overflow-hidden max-h-screen"> {/* Limit the height of the parent */}
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
                        'Date': new Date(activity.createdAt).toLocaleString(), // Format the date
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
                    height="calc(100vh - 220px)" // Ensure the table content fits within the viewport minus any header space
                />
            </div>
        </div>
    );
};

export default Dashboard;
