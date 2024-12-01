import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { UserTaskDetails } from '../services/user/userService'; // import the type for the user task

const fetchUserTaskDetails = async (id: string): Promise<UserTaskDetails> => {
    const response = await api.get(`/users/task/${id}`);
    return response.data;
};

export const useUserTaskDetails = (id: string) => {
    return useQuery({
        queryKey: ['userTaskDetails', id],
        queryFn: () => fetchUserTaskDetails(id)
    });
};
