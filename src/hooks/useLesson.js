import { useQuery } from '@tanstack/react-query';
import { getLessonByIdAPI, signMuxTokenAPI } from '../api/lesson.js';

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