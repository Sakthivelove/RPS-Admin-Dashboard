import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSidebar } from "../../SidebarContext";

interface DashboardSettingsData {
  [key: string]: boolean;
}

const DashboardSettings: React.FC = () => {
  const [settings, setSettings] = useState<DashboardSettingsData | null>(null);
  const {sidebarActive} = useSidebar() 
  useEffect(() => {
    axios
      .get<DashboardSettingsData>("/dev/settings/dashboard")
      .then((response) => setSettings(response.data))
      .catch((error) => console.error("Error fetching dashboard settings:", error));
  }, []);

  const handleChange = (key: string) => {
    if (settings) {
      setSettings((prev) => ({ ...prev, [key]: !prev?.[key] }));
    }
  };

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen text-white overflow-auto`}>
      <h1>Dashboard Settings</h1>
      {settings ? (
        <form>
          {Object.entries(settings).map(([key, value]) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleChange(key)}
              />
            </div>
          ))}
        </form>
      ) : (
        <p>Loading settings...</p>
      )}
    </div>
  );
};

export default DashboardSettings;
