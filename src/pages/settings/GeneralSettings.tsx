import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSidebar } from "../../SidebarContext";

interface Settings {
  [key: string]: string | number | boolean;
}

const GeneralSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const {sidebarActive} = useSidebar()
  useEffect(() => {
    axios
      .get<Settings>("/dev/settings")
      .then((response) => setSettings(response.data))
      .catch((error) => console.error("Error fetching settings:", error));
  }, []);

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen text-white overflow-auto`}>
      <h1>General Settings</h1>
      {settings ? (
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      ) : (
        <p>Loading settings...</p>
      )}
    </div>
  );
};

export default GeneralSettings;