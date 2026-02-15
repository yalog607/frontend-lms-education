import axiosClient from "../lib/axiosClient";

export const loginAPI = async (data) => {
    return await axiosClient.post('/auth/login', data);
}

export const registerAPI = async (data) => {
    return await axiosClient.post('/auth/register', data);
}

export const logoutAPI = async () => {
    return await axiosClient.post('/auth/logout')
}

export const changePasswordAPI = async (data) => {
    return await axiosClient.post('/auth/change-password', data)
}

export const getMeAPI = async () => {
    return await axiosClient.get('/auth/me');
}

export const updateAvatarAPI = async (data) => {
    return await axiosClient.post('/auth/update-avatar-user', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateInfoAPI = async (data) => {
    return await axiosClient.put('/auth/update-user', data)
}