import axiosClient from "../lib/axiosClient";

export const loginAPI = async(data) => {
    return await axiosClient.post('/auth/login', data);
}

export const registerAPI = async(data) => {
    return await axiosClient.post('/auth/register', data);
}

export const logoutAPI = async() => {
    return await axiosClient.post('/auth/logout')
}

export const getMe = async() => {
    return await axiosClient.get('/auth/me');
}