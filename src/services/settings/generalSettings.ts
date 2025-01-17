import { api } from "../../api/api";

export interface Settings {
  id: string;
  admin2FA: boolean;
  affiliate2FA: boolean;
  adminWallet: string;
  // adminSecret: string;
  contractAddress: string; // Added missing field
  rpc: string; // Added missing field
  rockUSDPrice: number;
  telegramLink: string | null;
  XLink: string | null;
  facebookLink: string | null;
  instagramLink: string | null;
  linkedInLink: string | null;
  playstoreLink: string | null;
  createdAt?: string;
  updatedAt?: string;
}


// Fetch general settings
export const fetchGeneralSettings = async (): Promise<Settings[]> => {
  const response = await api.get("/dev/settings");
  return response.data;
};

// Update module settings
export const updateModuleSettings = async (
  updatedSettings: Partial<Pick<Settings, "admin2FA" | "affiliate2FA">>
): Promise<{ status: boolean; info: string }> => {
  const response = await api.put("/settings/modulesettings", updatedSettings);
  return response.data;
};

// Update project settings
export const updateProjectSettings = async (
  updatedSettings: Partial<Omit<Settings, "id" | "admin2FA" | "affiliate2FA">>
): Promise<{ status: boolean; info: string }> => {
  const response = await api.put("/settings/projectsettings", updatedSettings);
  return response.data;
};
