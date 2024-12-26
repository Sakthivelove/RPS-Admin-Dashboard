import { api } from "../api/api";

export const updateAdminWalletSettings = async (data: { adminWallet: string; adminSecret: string }) => {
  const response = await api.put('/settings/adminwalletsettings', data);
  return response.data;
};

export const getGeneralSettings = async () => {
  const response = await api.get('/settings/general');
  return response.data;
};

export const updateProjectSettings = async (settings: any) => {
  const response = await api.put('/settings/project', settings);
  return response.data;
};
