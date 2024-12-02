import React from "react";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import { useSidebar } from "../../context/SidebarContext";
import StatusMessage from "../../components/StatusMessage";

const GeneralSettings: React.FC = () => {
  const { sidebarActive } = useSidebar();
  const { data: settings, isLoading, isError, error } = useGeneralSettings();

  // Render StatusMessage for loading or error states
  if (isLoading || isError) {
    return (
      <StatusMessage
        isLoading={isLoading}
        error={isError ? error : null}
        loadingMessage="Fetching general settings..."
        errorMessage={
          error?.message || "An error occurred while fetching the settings."
        }
        className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen  flex justify-center items-center`}
      />
    );
  }

  // Render the settings UI if data is available
  return (
    <div
      className={`absolute right-0 ${
        sidebarActive ? "w-[77%]" : "w-[94%]"
      } h-screen text-white overflow-auto p-6 flex justify-center items-center`}
    >
      <div className="bg-gray-800 p-6 w-auto">
        <h1 className="text-2xl font-bold mb-6">General Settings</h1>
        <div className="space-y-4">
          {settings ? (
            <pre className="bg-gray-700 p-4 rounded-lg">
              {JSON.stringify(settings, null, 2)}
            </pre>
          ) : (
            <p className="text-lg">No settings available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
