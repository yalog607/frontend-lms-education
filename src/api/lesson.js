import axiosClient from "../lib/axiosClient";

export const getLessonByIdAPI = async(id) => {
    return await axiosClient.get(`/lesson/get-lesson/${id}`);
}

export const signMuxTokenAPI = async(playbackId) => {
    return await axiosClient.post('/mux/sign', {playbackId});
}