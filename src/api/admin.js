import axiosClient from "../lib/axiosClient";

export const upgradeToInstructorAPI = async(userId) => {
    return await axiosClient.put(`/admin/upgrade-to-instructor`, { userId });
}