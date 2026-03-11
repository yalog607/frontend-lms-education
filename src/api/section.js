import axiosClient from '../lib/axiosClient.js';

export const createSectionAPI = async (data) => {
  return await axiosClient.post('/section/create-section', data);
};

export const updateSectionAPI = async ({ sectionId, data }) => {
  return await axiosClient.put(`/section/update-section/${sectionId}`, data);
};

export const deleteSectionAPI = async (sectionId) => {
  return await axiosClient.delete(`/section/delete-section/${sectionId}`);
};
