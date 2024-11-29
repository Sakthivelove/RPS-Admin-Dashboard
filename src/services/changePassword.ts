import { api } from "../api";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = ({ currentPassword, newPassword }: ChangePasswordData) => {
  return api.put("/dev/settings/change-password", { currentPassword, newPassword });
};
