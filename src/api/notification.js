import axiosClient from '../lib/axiosClient';

export const getNotificationOfUser = () => {
  return axiosClient.get('/notification/get-notification');
};

export const createNotification = (data) => {
  return axiosClient.post('/notification/create-notification', data);
};

export const readNotification = (id) => {
  console.log(id)
  if (id) {
    return axiosClient.post(`/notification/read-notification/${id}`);
  }
  return axiosClient.post('/notification/read-notification');
};

export const deleteNotification = (notificationId) => {
  return axiosClient.delete(`/notification/delete-notification/${notificationId}`);
};
