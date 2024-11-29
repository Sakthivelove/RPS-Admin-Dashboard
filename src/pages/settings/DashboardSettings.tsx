import React from 'react';
import { useDashboardSettings } from '../../hooks/useDashboardSettings';
import { useSidebar } from '../../SidebarContext';

const DashboardSettings: React.FC = () => {
  const { sidebarActive } = useSidebar();
  const { data: settings, isLoading, isError, error, refetch } = useDashboardSettings();

  // Function to handle the changes in settings (this can be updated to actually persist changes)
  const handleChange = (key: string) => {
    if (settings) {
      // Toggling the setting locally (you can replace this with API calls to update the backend)
      const updatedSettings = { ...settings, [key]: !settings[key] };
      console.log('Updated Settings:', updatedSettings); // You can send this to the backend
    }
  };

  if (isLoading) {
    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white flex justify-center items-center`}>
            <div className="flex items-center">
                <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-4 border-[#45F882] rounded-full mr-4"></div>
                <span className="text-xl">Loading...</span>
            </div>
        </div>
    );
}


if (error) {
    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white flex justify-center items-center`}>
            <div className="bg-red-500 p-6 rounded-md shadow-lg">
                <h2 className="text-xl font-bold text-white">Error fetching Tournaments!</h2>
                <p className="mt-2 text-white">Error: {error.message}</p>
            </div>
        </div>
    );
}

  // Rendering the settings page
  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto p-6 flex justify-center items-center`}>
      <div className='bg-gray-800 p-6 w-1/2'>
        <h1 className="text-2xl font-bold mb-6">Dashboard Settings</h1>
        <div className="space-y-4">
          {/* Settings display (dynamic rendering based on response from the API) */}
          <form>
            {settings ? (
              <>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Total Players</span>
                    <span className="text-lg">{settings.totalPlayers ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Tournaments</span>
                    <span className="text-lg">{settings.tournaments}</span>
                  </div>
                </div>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Upcoming Tournaments</span>
                    <span className="text-lg">{settings.upcoming}</span>
                  </div>
                </div>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Wallet Connection</span>
                    <span className="text-lg">{settings.walletConnection}</span>
                  </div>
                </div>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Telegram Connection</span>
                    <span className="text-lg">{settings.telegramConnection}</span>
                  </div>
                </div>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">X Connection</span>
                    <span className="text-lg">{settings.xConnection}</span>
                  </div>
                </div>
                <div className="p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Registered Tournaments</span>
                    <span className="text-lg">{settings.registeredTournament}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-lg">No settings available</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
