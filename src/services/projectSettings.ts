import { api } from "../api";

interface ProjectSettings {
  projectName: string;
  description: string;
}

export const updateProjectSettings = ({ projectName, description }: ProjectSettings) => {
  return api.put('/dev/settings/projectsettings', { projectName, description });
};
