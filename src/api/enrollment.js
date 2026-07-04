import axiosClient from "../lib/axiosClient";

export const getUserEnrollmentAPI = async() => {
    return await axiosClient.get('/enrollment/get-enrollments-of-user');
}

export const enrollCourseAPI = async(course_id) => {
    return await axiosClient.post('/enrollment/purchase-course', { course_id });
}