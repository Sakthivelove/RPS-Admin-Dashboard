import React, { useEffect, useState } from 'react';
import Table from '../../components/common/Table';
import { useReferrals } from '../../hooks/useReferrals';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { truncateAddress } from '../../utils';
import { InformationCircleIcon  } from '@heroicons/react/24/outline';

const UserReferrals: React.FC = () => {
    const [page, setPage] = useState(1); // Track the current page
    const [limit, setLimit] = useState(10); // Track the number of items per page
    const { data, error, isLoading, isError } = useReferrals(page, limit);
    const [totalPages, setTotalPages] = useState<number>(0);
    const { sidebarActive } = useSidebar();
    const navigate = useNavigate(); // Initialize navigate hook

    // Log the current page and limit when component renders
    console.log(`Rendering UserReferrals Component - Page: ${page}, Limit: ${limit}`);

    // Update total pages when totalCount changes
    useEffect(() => {
        if (data?.total) {
            setTotalPages(Math.ceil(data.total / limit));
        }
    }, [data?.total, limit]);
    // Handle page change
    const handlePageChange = (newPage: number) => {
        console.log(`Page changed from ${page} to ${newPage}`);
        setPage(newPage);
    };

    const columns = [
        'S.No',
        'Referral Code',
        'Wallet ID',
        'Referral Count',
        // 'Reward',
        'More Info',
        'Created On'
    ]; // Add 'Actions' to columns

    const formattedData =
        data?.referrals.map((referral, index) => ({
            'S.No': (page - 1) * limit + index + 1, // Calculate serial number correctly
            'Referral Code': referral.referralCode,
            'Wallet ID': truncateAddress(referral.walletId, 6), // Truncate walletId here
            'Referral Count': referral.referralCount,
            // 'Reward': referral.reward,
            'Created On': new Date(
                parseInt(referral.createdOn) * 1000
            ).toLocaleString(),
            'More Info': (
                <div className="flex space-x-3 justify-center items-center">
                    <button
                        onClick={() => navigate(`/users/referrals/${referral.id}`)} // Redirect to /users/referral/:id
                        className="text-blue-500 hover:text-blue-700"
                    >
                        <InformationCircleIcon  className="w-6 h-6" />
                    </button>
                </div>
            ),
        })) || [];

    return (
        <div
            className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'
                } h-screen`}
        >
            <div className="relative z-10 overflow-auto h-full p-[2%]">
                <Table
                    columns={columns}
                    data={formattedData}
                    title="Referral List"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={true}
                    page={page}
                    limit={limit}
                    onPageChange={handlePageChange}
                    totalPages={totalPages}
                    isLoading={isLoading}
                    error={isError}
                    loadingMessage="Loading referrals..."
                    errorMessage={error?.message}
                    customTextPosition='text-center'
                />
            </div>
        </div>
    );
};

export default UserReferrals;
