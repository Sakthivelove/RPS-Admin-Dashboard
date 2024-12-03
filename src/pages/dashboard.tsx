import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { useSidebar } from '../context/SidebarContext';
import GradientCard from '../components/GradientCard';
import StatusMessage from '../components/StatusMessage';

const Dashboard: React.FC = () => {
    const { sidebarActive } = useSidebar();
    const { data, isLoading, isError, error } = useDashboardData();

    if (isLoading || isError) {
        <StatusMessage
            isLoading={isLoading}
            error={error instanceof Error ? error : null}
            loadingMessage="Loading Dashboard Data..."
            errorMessage="Failed to load the dashboard data"
            className="absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen"
        />
    }

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} p-6 space-y-6`}>
            <h1 className="text-2xl font-bold text-[#45F882]">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Metrics displayed using GradientCard */}
                <GradientCard title="Total Players" value={data?.totalPlayers.toString()} imageSrc={''} imageAlt={''} />
                <GradientCard title="Tournaments" value={data?.tournaments.toString()} imageSrc={''} imageAlt={''} />
                <GradientCard title="Upcoming" value={data?.upcoming.toString()} imageSrc={''} imageAlt={''} />
                <GradientCard title="Wallet Connection" value={data?.walletConnection.toString()} imageSrc={''} imageAlt={''} />
                <GradientCard title="Telegram Connection" value={data?.telegramConnection.toString()} imageSrc={''} imageAlt={''} />
                <GradientCard title="X Connection" value={data?.xConnection.toString()} imageSrc={''} imageAlt={''} />
                <GradientCard title="Registered Tournaments" value={data?.registeredTournament.toString()} imageSrc={''} imageAlt={''} />
            </div>
        </div>
    );
};

export default Dashboard;
