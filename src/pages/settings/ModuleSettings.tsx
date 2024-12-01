import React, { useEffect, useState } from "react";
import { useSidebar } from "../../context/SidebarContext";
import axios from "axios";

interface ModuleSettingsData {
  admin2FA: boolean;
  affiliate2FA: boolean;
}

const ModuleSettings: React.FC = () => {
  const [modules, setModules] = useState<ModuleSettingsData | null>(null);
  const { sidebarActive } = useSidebar();

  // Set initial values for module settings
  useEffect(() => {
    // Set default settings (if you know the initial values)
    const defaultSettings: ModuleSettingsData = {
      admin2FA: true, // Default value, adjust as needed
      affiliate2FA: true, // Default value, adjust as needed
    };
    setModules(defaultSettings);
  }, []);

  const handleToggle = (module: keyof ModuleSettingsData) => {
    if (modules) {
      const updatedModules: ModuleSettingsData = { ...modules, [module]: !modules[module] };
      setModules(updatedModules);
    }
  };

  const saveModules = () => {
    if (modules) {
      axios
        .put("/dev/settings/modulesettings", modules)
        .then(() => {
          alert("Module settings updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating module settings:", error);
          // alert("Failed to update module settings.");
        });
    }
  };

  

  return (
    <div className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} h-screen text-white flex justify-center items-center overflow-auto  p-6`}>
      <div className="bg-gray-800 p-6 w-1/2 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Module Settings</h1>
        <div className="space-y-4">
          {modules ? (
            Object.entries(modules).map(([module, isActive]) => (
              <div key={module} className="flex items-center justify-between">
                <label className="font-medium">{module}</label>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => handleToggle(module as keyof ModuleSettingsData)}
                  className="text-indigo-600"
                />
              </div>
            ))
          ) : (
            <p>No module settings available</p>
          )}
        </div>
        <button
          onClick={saveModules}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ModuleSettings;
