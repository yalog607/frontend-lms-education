import axiosClient from "../lib/axiosClient";

export const getLessonByIdAPI = async(id) => {
    try {
        return await axiosClient.get(`/lesson/get-lesson/${id}`);
    } catch {
        return await axiosClient.get(`/lesson/lesson/${id}`);
    }
}

export const createLessonAPI = async (data) => {
    return await axiosClient.post('/lesson/create-lesson', data);
}

export const updateLessonAPI = async ({ lessonId, data }) => {
    return await axiosClient.put(`/lesson/update-lesson/${lessonId}`, data);
}

export const deleteLessonAPI = async (lessonId) => {
    return await axiosClient.delete(`/lesson/delete-lesson/${lessonId}`);
}

export const getRecentLessonOfTeacherAPI = async () => {
    return await axiosClient.get('/lesson/get-recent-lessons-of-teacher');
}

export const signMuxTokenAPI = async(playbackId) => {
    return await axiosClient.post('/mux/sign', {playbackId});
}