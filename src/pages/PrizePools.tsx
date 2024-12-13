import React from 'react';
import { usePrizePools } from '../hooks/usePrizePools';
import { useSidebar } from '../context/SidebarContext';
import { getContainerClass } from '../utils';
import { PrizePool } from '../types';
import Table from '../components/common/Table';

const PrizePools: React.FC = () => {
    const { data, error, isLoading } = usePrizePools();
    const { sidebarActive } = useSidebar();

    const columns = ['S.No', 'Position', 'Percentage']; // Define the column names for your table

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    // Map the data to match the table's format
    const mappedData = data?.map((prizePool: PrizePool, index) => ({
        // Id: prizePool.id,
        'S.No': index + 1,
        Position: prizePool.position,
        Percentage: prizePool.percentage,
    })) || [];

    return (
        <div className={`${getContainerClass(sidebarActive)} text-white`}>
            {/* Render the Table component with the mapped data */}
            <Table
                title='PrizePools'
                columns={columns}
                data={mappedData} // Pass the mapped prize pool data to the table
                rowColor="bg-[#0F1C23]" // Optional row color
                tableBgColor="bg-[#1A1D26]" // Optional table background color
                headerTextColor="text-white" // Optional header text color
                isLoading={isLoading} // Pass loading state to the table
                error={error !== null} // Pass error state to the table
                loadingMessage="Loading prize pools..." // Custom loading message
                errorMessage="Error loading prize pools, please try again." // Custom error message
                showSearchBar={true}
            />
        </div>
    );
};

export default PrizePools;
