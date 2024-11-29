import { useMutation } from '@tanstack/react-query';
import { updateProjectSettings } from '../services/projectSettings';

interface ProjectSettingsInput {
  projectName: string;
  description: string;
}

export const useUpdateProjectSettings = () => {
  return useMutation({
    mutationFn: (data: ProjectSettingsInput) => updateProjectSettings(data),
    onSuccess: () => {
      alert("Project settings updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating project settings:", error);
      alert("Failed to update project settings.");
    }
  });
};
