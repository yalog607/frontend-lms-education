import axiosClient from "../lib/axiosClient";

export const updateProgressAPI = async (data) => {
    if (data) {
        const result = await axiosClient.post('/progress/update', data);
        return result.data;
    }
    return null;
}

export const getCourseProgressAPI = async (lessonIds) => {
    if (lessonIds && lessonIds.length > 0) {
        const result = await axiosClient.post('/progress/course-progress', { lessonIds });
        return result.data;
    }
    return [];
}