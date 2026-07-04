import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLessonAPI, deleteLessonAPI, getLessonByIdAPI, getRecentLessonOfTeacherAPI, signMuxTokenAPI, updateLessonAPI } from '../api/lesson.js';
import { toast } from 'react-hot-toast';

export const useLesson = (lessonId) => {
    return useQuery({
        queryKey: ['lesson', lessonId],
        queryFn: () => getLessonByIdAPI(lessonId),
        enabled: !!lessonId, 
        staleTime: 5 * 60 * 1000, 
    });
};

export const useMuxToken = (playbackId) => {
    return useQuery({
        queryKey: ['mux-token', playbackId],
        queryFn: () => signMuxTokenAPI(playbackId),
        enabled: !!playbackId, 
        staleTime: 30 * 60 * 1000, 
    });
};

export const useRecentLessonsOfTeacher = () => {
    return useQuery({
        queryKey: ['recent-lessons-of-teacher'],
        queryFn: getRecentLessonOfTeacherAPI,
    });
};

export const useCreateLesson = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createLessonAPI,
        onSuccess: () => {
            toast.success('Create lesson successfully!');
            queryClient.invalidateQueries({ queryKey: ['course'] });
            queryClient.invalidateQueries({ queryKey: ['course-for-teacher'] });
            queryClient.invalidateQueries({ queryKey: ['recent-lessons-of-teacher'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Create lesson failed!');
        }
    });

    return {
        createLesson: mutation.mutate,
        isCreatingLesson: mutation.isPending,
    };
};

export const useUpdateLesson = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateLessonAPI,
        onSuccess: () => {
            toast.success('Update lesson successfully!');
            queryClient.invalidateQueries({ queryKey: ['course'] });
            queryClient.invalidateQueries({ queryKey: ['course-for-teacher'] });
            queryClient.invalidateQueries({ queryKey: ['recent-lessons-of-teacher'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Update lesson failed!');
        }
    });

    return {
        updateLesson: mutation.mutate,
        isUpdatingLesson: mutation.isPending,
    };
};

export const useDeleteLesson = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteLessonAPI,
        onSuccess: () => {
            toast.success('Delete lesson successfully!');
            queryClient.invalidateQueries({ queryKey: ['course'] });
            queryClient.invalidateQueries({ queryKey: ['course-for-teacher'] });
            queryClient.invalidateQueries({ queryKey: ['recent-lessons-of-teacher'] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Delete lesson failed!');
        }
    });

    return {
        deleteLesson: mutation.mutate,
        isDeletingLesson: mutation.isPending,
    };
};