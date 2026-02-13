import axiosClient from "../lib/axiosClient";

export const getUserEnrollmentAPI = async() => {
    return await axiosClient.get('/enrollment/get-enrollments-of-user');
}