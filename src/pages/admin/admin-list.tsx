import React from 'react';
import Table from '../../components/common/Table';
import { useAdminList } from '../../hooks/useAdminList';
import { DataRow } from '../../types/admintypes';
import { useSidebar } from '../../context/SidebarContext';

const AdminList: React.FC = () => {
    const { data, error, isLoading, isError } = useAdminList();
    const { sidebarActive } = useSidebar()

    // Log after the data is available
    console.log("Admin list data", data);

    // Data mapping to match table columns
    const tableData = data?.map((item: DataRow, index: number) => ({
        "S.No": index + 1,
        'Telegram ID': item.telegramId,
    }));

    const columns = ['S.No', 'Telegram ID'];

    return (
        <div className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen`}>
            <div className="relative z-10 overflow-auto h-full p-[2%]">
                <Table
                    columns={columns}
                    data={tableData}
                    title="Admin List"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={false}
                    searchPlaceholder="Search by Telegram ID"
                    height='60vh'
                    isLoading={isLoading}
                    error={isError}
                    loadingMessage="Loading admin data..."
                    errorMessage={error?.message}
                />
            </div>
        </div>
    );
};

export default AdminList;
