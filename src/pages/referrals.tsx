import React from 'react';
import Table from '../components/Table';
import { useReferrals } from '../hooks/useReferrals';

const Referrals: React.FC = () => {
    const { data, error, isLoading } = useReferrals(1, 10);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    const columns = ['S.No', 'Referral Code', 'Wallet ID', 'Referral Count', 'Reward', 'Created On'];

    const formattedData = data?.referrals.map((referral, index) => ({
        'S.No': index + 1,
        'Referral Code': referral.referralCode,
        'Wallet ID': referral.walletId,
        'Referral Count': referral.referralCount,
        'Reward': referral.reward,
        'Created On': new Date(parseInt(referral.createdOn) * 1000).toLocaleString(),
    })) || [];

    return (
        <div className="flex h-screen">
            <div className="flex-1 p-6 bg-opacity-80">
                <Table
                    columns={columns}
                    data={formattedData}
                    title="Referral List"
                    headerTextColor="text-[#45F882]"
                />
            </div>
        </div>
    );
};

export default Referrals;
