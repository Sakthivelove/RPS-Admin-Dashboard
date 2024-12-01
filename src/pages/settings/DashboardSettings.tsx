import React from "react";
import { useDashboardSettings } from "../../hooks/useDashboardSettings";
import { useSidebar } from "../../context/SidebarContext";
import StatusMessage from "../../components/StatusMessage";

const DashboardSettings: React.FC = () => {
  const { sidebarActive } = useSidebar();
  const { data: settings, isLoading, isError, error } = useDashboardSettings();

  // Function to handle the changes in settings (this can be updated to actually persist changes)
  const handleChange = (key: string) => {
    if (settings) {
      const updatedSettings = { ...settings, [key]: !settings[key] };
      console.log("Updated Settings:", updatedSettings); // Placeholder for API integration
    }
  };

  // Render StatusMessage when loading or error occurs
  if (isLoading || isError) {
    return (
      <StatusMessage
        isLoading={isLoading}
        error={isError ? error : null}
        loadingMessage="Loading settings..."
        errorMessage="Error fetching settings!"
        className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen  flex justify-center items-center`}
      />
    );
  }

  // Render the settings UI
  return (
    <div
      className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"
        } h-screen text-white overflow-auto p-6 flex justify-center items-center`}
    >
      <div className="bg-gray-800 p-6 w-1/2">
        <h1 className="text-2xl font-bold mb-6">Dashboard Settings</h1>
        <div className="space-y-4">
          {settings ? (
            <>
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="p-2 bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="text-lg">{value ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-lg">No settings available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
