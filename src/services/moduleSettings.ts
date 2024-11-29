import { api } from '../api'; // Import your custom axios instance

export interface ModuleSettingsData {
  admin2FA: boolean;
  affiliate2FA: boolean;
  // Add any other module-specific settings here
}

// Fetch module settings
export const fetchModuleSettings = async (): Promise<ModuleSettingsData> => {
  const response = await api.put("/dev/settings/modulesettings");
  return response.data;
};

// Update module settings
export const updateModuleSettings = async (settings: ModuleSettingsData): Promise<void> => {
  await api.put("/dev/settings/modulesettings", settings);
};
