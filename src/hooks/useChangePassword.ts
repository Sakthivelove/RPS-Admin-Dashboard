import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../services/settings/changePassword';

interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => changePassword(data),
    onSuccess: () => {
      alert("Password updated successfully");
    },
    onError: (error: any) => {
      console.error("Error updating password:", error);
      alert("Failed to update password");
    },
  });
};
