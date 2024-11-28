import React, { useEffect, useState } from "react";
import axios from "axios";

interface ModuleSettingsData {
  [module: string]: boolean;
}

const ModuleSettings: React.FC = () => {
  const [modules, setModules] = useState<ModuleSettingsData | null>(null);

  useEffect(() => {
    axios
      .get<ModuleSettingsData>("/dev/settings/modulesettings")
      .then((response) => setModules(response.data))
      .catch((error) => console.error("Error fetching module settings:", error));
  }, []);

  const handleToggle = (module: string) => {
    if (modules) {
      setModules((prev) => ({ ...prev, [module]: !prev?.[module] }));
    }
  };

  const handleSave = () => {
    axios
      .put("/dev/settings/modulesettings", modules)
      .then(() => alert("Module settings updated"))
      .catch((error) => console.error("Error updating module settings:", error));
  };

  return (
    <div>
      <h1>Module Settings</h1>
      {modules ? (
        Object.entries(modules).map(([module, isActive]) => (
          <div key={module}>
            <label>{module}</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => handleToggle(module)}
            />
          </div>
        ))
      ) : (
        <p>Loading module settings...</p>
      )}
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default ModuleSettings;
