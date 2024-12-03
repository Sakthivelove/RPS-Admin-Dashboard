import React from 'react';
import Table from '../../components/common/Table';
import { useAdminList } from '../../hooks/useAdminList';
import { DataRow } from '../../types/admintypes';
import { useSidebar } from '../../context/SidebarContext';

const AdminList: React.FC = () => {
    const { data, error, isLoading } = useAdminList();
    const { sidebarActive } = useSidebar()


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    // Log after the data is available
console.log("Admin list data", data);

    // If there's no data, handle that case
    if (!data) {
        return <div>No data available</div>;
    }

    // Data mapping to match table columns
    const tableData = data?.map((item: DataRow, index: number) => ({
        "S.No": index + 1,
        'ID': item.id,
        'Telegram ID': item.telegramId,
    }));

    const columns = ['S.No', 'ID', 'Telegram ID'];

    return (
        <div className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} p-4 `}>
            <Table
                columns={columns}
                data={tableData}
                title="Admin List"
                headerTextColor="text-white"
                showSearchBar={true}
                searchPlaceholder="Search by Telegram ID"
                height='67vh'
            />
        </div>
    );
};

export default AdminList;
