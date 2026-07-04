import axiosClient from "../lib/axiosClient";

export const getCommentsByLessonIdAPI = async (lessonId) => {
    return await axiosClient.get(`/comment/get-comments/${lessonId}`);
}

export const createCommentAPI = async (data) => {
    return await axiosClient.post(`/comment/create-comment`, data);
}

export const deleteCommentAPI = async (commentId) => {
    return await axiosClient.delete(`/comment/delete-comment/${commentId}`);
}