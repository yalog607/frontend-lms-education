import axiosClient from "../lib/axiosClient";

export const getAllTeachersAPI = async () => {
    return await axiosClient.get("/teacher/get-all-teachers");
};
