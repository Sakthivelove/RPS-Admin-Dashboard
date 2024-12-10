import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { useSidebar } from '../context/SidebarContext';
import GradientCard from '../components/GradientCard';
import StatusMessage from '../components/StatusMessage';

const Dashboard: React.FC = () => {
    const { sidebarActive } = useSidebar();
    const { data, isLoading, isError, error } = useDashboardData();

    if (isLoading || isError) {
        return (
            <StatusMessage
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                loadingMessage="Loading Dashboard Data..."
                errorMessage="Failed to load the dashboard data"
                className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen flex justify-center items-center`}
            />
        );
    }

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} p-6 space-y-6`}>
            <h1 className="text-2xl font-bold text-[#45F882]">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Metrics displayed using GradientCard */}
                {/* <GradientCard
                    title="Total Players"
                    value={data?.totalPlayers.toString()}
                    imageSrc=""
                    imageAlt="Total Players"
                    // linkTo="/players-list"  // Add the link for "Total Players"
                    linkTo="#"  // Add the link for "Total Players"
                /> */}
                <GradientCard
                    title="Tournaments"
                    value={data?.tournaments.toString()}
                    imageSrc=""
                    imageAlt="Tournaments"
                    linkTo="/tournament-list"  // Link for "Tournaments"
                />
                <GradientCard
                    title="Upcoming"
                    value={data?.upcoming.toString()}
                    imageSrc=""
                    imageAlt="Upcoming"
                    linkTo="/users/registeredupcomingtournament"  // Link for "Upcoming"
                />
                {/* <GradientCard
                    title="Wallet Connection"
                    value={data?.walletConnection.toString()}
                    imageSrc=""
                    imageAlt="Wallet Connection"
                    linkTo="#"
                // linkTo="/wallet-connection"  // Link for "Wallet Connection"
                />
                <GradientCard
                    title="Telegram Connection"
                    value={data?.telegramConnection.toString()}
                    imageSrc=""
                    imageAlt="Telegram Connection"
                    linkTo="#"
                // linkTo="/telegram-connection"  // Link for "Telegram Connection"
                />
                <GradientCard
                    title="X Connection"
                    value={data?.xConnection.toString()}
                    imageSrc=""
                    imageAlt="X Connection"
                    linkTo="#"
                // linkTo="/x-connection"  // Link for "X Connection"
                />
                <GradientCard
                    title="Registered Tournaments"
                    value={data?.registeredTournament.toString()}
                    imageSrc=""
                    imageAlt="Registered Tournaments"
                    linkTo="#"
                // linkTo="/registered-tournaments"  // Link for "Registered Tournaments"
                /> */}
            </div>
        </div>
    );
};

export default Dashboard;
