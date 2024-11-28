import React, { useEffect, useState } from "react";
import axios from "axios";

interface Settings {
  [key: string]: string | number | boolean;
}

const GeneralSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    axios
      .get<Settings>("/dev/settings")
      .then((response) => setSettings(response.data))
      .catch((error) => console.error("Error fetching settings:", error));
  }, []);

  return (
    <div>
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