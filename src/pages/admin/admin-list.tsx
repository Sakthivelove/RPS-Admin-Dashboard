import React from 'react';
import Table from '../../components/common/Table';
import { useAdminList } from '../../hooks/useAdminList';
import { DataRow } from '../../types/admintypes';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';

const AdminList: React.FC = () => {
    const { data, error, isLoading } = useAdminList();
    const { sidebarActive } = useSidebar()


    if (isLoading || error) {
        return (
            /* Integrate StatusMessage to handle loading and error states */
            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading admin data..."
                errorMessage={error?.message || 'Unable to fetch admin data.'}
                className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} flex justify-center items-center  h-full`}
            />
        )
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
        'Telegram ID': item.telegramId,
    }));

    const columns = ['S.No', 'Telegram ID'];

    return (
        <div className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} p-4`}>
            <Table
                columns={columns}
                data={tableData}
                title="Admin List"
                headerTextColor="text-white"
                showSearchBar={true}
                searchPlaceholder="Search by Telegram ID"
                height='65vh'
            />
        </div>
    );
};

export default AdminList;
