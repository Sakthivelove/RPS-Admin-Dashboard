import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchModuleSettings, updateModuleSettings } from '../services/settings/moduleSettings';

interface ModuleSettingsData {
    admin2FA: boolean;
    affiliate2FA: boolean;
}

export const useModuleSettings = () => {
    const queryClient = useQueryClient();

    // Fetch module settings using useQuery
    const { data: modules, isLoading, isError, error } = useQuery<ModuleSettingsData>({
        queryKey: ['moduleSettings'],
        queryFn: fetchModuleSettings,
    });

    // Mutation for updating module settings
    const { mutate: saveModules, isPending: isSaving } = useMutation({
        mutationFn: updateModuleSettings,
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['moduleSettings'] }); // Invalidate the query to refetch data after mutation
        //     alert("Module settings updated");
        // },
        // onError: (error) => {
        //     console.error("Error updating module settings:", error);
        //     alert("Failed to update module settings");
        // },
    });

    return { modules, isLoading, isError, error, saveModules, isSaving };
};
