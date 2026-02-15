import axiosClient from "../lib/axiosClient";

export const getLatestCoursesAPI = async() => {
    return await axiosClient.get('/course/get-latest-courses');
}

export const getAllCoursesAPI = async() => {
    return await axiosClient.get('/course/get-all-courses');
}

export const getUserCourseAPI = async() => {
    return await axiosClient.get('/course/get-user-courses');
}

export const createCoursesAPI = async(data) => {
    if (!data) return null;
    return await axiosClient.post('/course/create-course', data);
}

export const getCourseByIdAPI = async(id) => {
    if (!id) return null;
    return await axiosClient.get(`/course/get-course/${id}`);
}

export const getCourseOfTeacherAPI = async(id) => {
    if (!id) return null;
    return await axiosClient.get(`/course/get-courses-of-teacher/${id}`);
}

export const updateCourseAPI = async({data, id}) => {
    if (!id || !data) return null;
    return await axiosClient.put(`/course/update-course/${id}`, data);
}

export const deleteCourseAPI = async(id) => {
    if (!id) return null;
    return await axiosClient.delete(`/course/delete-course/${id}`);
}

export const searchCourseAPI = async(q) => {
    if (!q) return [];
    return await axiosClient.get(`/course/search-course/${q}`,);
}