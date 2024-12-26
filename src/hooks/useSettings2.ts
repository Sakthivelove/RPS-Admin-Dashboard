import { useMutation, useQuery } from '@tanstack/react-query';
import { getGeneralSettings, updateAdminWalletSettings, updateProjectSettings } from '../services/settingsApi';

// General Settings Query
export const useGeneralSettings = () => {
    return useQuery({
        queryKey: ['generalSettings'],
        queryFn: getGeneralSettings,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });
};

// Admin Wallet Settings Mutation
export const useUpdateAdminWalletSettings = () => {
    return useMutation({
        mutationFn: updateAdminWalletSettings,
        onSuccess: () => {
            console.log('Admin wallet settings updated successfully');
        },
        onError: (error) => {
            console.error('Failed to update admin wallet settings:', error);
        },
    });
};

// Project Settings Mutation
// export const useUpdateProjectSettings = () => {
//     return useMutation({
//         mutationFn: updateProjectSettings,
//         onSuccess: () => {
//             console.log('Project settings updated successfully');
//         },
//         onError: (error) => {
//             console.error('Failed to update project settings:', error);
//         },
//     });
// };
