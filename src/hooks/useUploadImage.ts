import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { uploadImageToServer } from '../services/tournamentImageService';

export const useUploadImage = (setBannerImage: React.Dispatch<React.SetStateAction<string>>) => {
    const mutation = useMutation({
        mutationKey: ['uploadImage'],
        mutationFn: uploadImageToServer,
        onSuccess: (data) => {
            if (data.status) {
                setBannerImage(data.banner_image);  // Set the uploaded image URL
                toast.success('Image uploaded successfully!');
            } else {
                toast.error('Image upload failed.');
            }
        },
        onError: (error: any) => {
            toast.error('Failed to upload image: ' + error.message);
        },
    });

    const uploadImage = async (formData: FormData) => {
        return mutation.mutateAsync(formData);
    };

    return { uploadImage, mutation };
};


