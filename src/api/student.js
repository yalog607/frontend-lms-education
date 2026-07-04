import axiosClient from "../lib/axiosClient";

export const getAllStudentsAPI = async () => {
    return await axiosClient.get("/student/get-all-students");
};
