import React from 'react';
import Table from '../../components/common/Table';
import { useReferrals } from '../../hooks/useReferrals';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import StatusMessage from '../../components/StatusMessage'; // Import StatusMessage
import { truncateAddress } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EyeIcon } from '@heroicons/react/24/outline'

const UserReferrals: React.FC = () => {
    const { data, error, isLoading } = useReferrals(1, 10);
    console.log("referrals", data);

    const { sidebarActive } = useSidebar();
    const navigate = useNavigate(); // Initialize navigate hook

    if (error || isLoading) {
        return (
            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading referrals..."
                errorMessage={error ? `Error: ${error.message}` : 'Something went wrong.'}
                className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen`}
            />
        )
    }
    const columns = ['S.No', 'Id', 'Referral Code', 'Wallet ID', 'Referral Count', 'Reward', 'Created On', 'Actions'];  // Add 'Actions' to columns

    const formattedData = data?.referrals.map((referral, index) => ({
        'S.No': index + 1,
        'Id': referral.id,
        'Referral Code': referral.referralCode,
        'Wallet ID': truncateAddress(referral.walletId, 6),  // Truncate walletId here
        'Referral Count': referral.referralCount,
        'Reward': referral.reward,
        'Created On': new Date(parseInt(referral.createdOn) * 1000).toLocaleString(),
        'Actions': (
            <div className="flex space-x-3 justify-center items-center">
                <button
                    onClick={() => navigate(`/users/referral/${referral.id}`)} // Redirect to /users/referral/:id
                    className="text-blue-500 hover:text-blue-700"
                >
                    <EyeIcon className="w-6 h-6" />
                </button>
                {/* Temporarily disabled
                 <button className="text-yellow-500 hover:text-yellow-700">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                    <FontAwesomeIcon icon={faTrash} />
                </button> */}
            </div>
        )
    })) || [];

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen `}>
            <div className="relative z-10 overflow-auto h-full p-[2%]">
                <Table
                    columns={columns}
                    data={formattedData}
                    title="Referral List"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={true}
                />
            </div>
        </div>
    );
};

export default UserReferrals;
