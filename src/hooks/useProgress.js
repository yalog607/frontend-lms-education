import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCourseProgressAPI, updateProgressAPI } from '../api/progress';
import useAuthStore from '../store/useAuthStore';

export const useCourseProgress = (lessonIds) => {
    const { user } = useAuthStore();
    return useQuery({
        queryKey: ['course-progress', lessonIds],
        queryFn: () => {
            if (!user) return Promise.resolve(null);
            return getCourseProgressAPI(lessonIds);
        },
        enabled: lessonIds?.length > 0 && !!user,
    });
};

export const useUpdateProgress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProgressAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(['course-progress']); 
        }
    });
};