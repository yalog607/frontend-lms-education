import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCourseProgressAPI, updateProgressAPI } from '../api/progress';

export const useCourseProgress = (lessonIds) => {
    return useQuery({
        queryKey: ['course-progress', lessonIds],
        queryFn: () => getCourseProgressAPI(lessonIds),
        enabled: lessonIds?.length > 0,
    });
};

// Cập nhật tiến trình
export const useUpdateProgress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProgressAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(['course-progress']); 
        }
    });
};