import React from 'react';
import { useGeneralSettings } from '../../hooks/useGeneralSettings';
import { useSidebar } from '../../SidebarContext';

const GeneralSettings: React.FC = () => {
  const { sidebarActive } = useSidebar();
  const { data: settings, isLoading, isError, error } = useGeneralSettings();

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

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto  p-6 flex justify-center items-center`}>
      <div className='bg-gray-800 p-6 '>
        <h1 className="text-2xl font-bold mb-6">General Settings</h1>
        <div className="space-y-4">
          {settings ? (
            <pre className="bg-gray-700 p-4 rounded-lg">{JSON.stringify(settings, null, 2)}</pre>
          ) : (
            <p>No settings available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
