import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNotification,
  getNotificationOfUser,
  readNotification,
  deleteNotification,
} from '../api/notification';
import { toast } from 'react-hot-toast';

export function useNotifications() {
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotificationOfUser,
    select: (res) => res.data || [],
  });

  const markAsReadMutation = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });

  // Đánh dấu tất cả đã đọc
  const markAllAsRead = () => {
    markAsReadMutation.mutate(undefined);
  };

  // Số lượng chưa đọc
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    isLoading,
    isError,
    error,
    unreadCount,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead,
    deleteNotification: deleteMutation.mutate,
    isMarking: markAsReadMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useCreateNotification() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNotification,
    onSuccess: (response) => {
      const totalSent = response?.count || 0;
      toast.success(
        totalSent > 0
          ? `Notification sent to ${totalSent} learners successfully!`
          : 'Notification created successfully!',
      );
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Create notification failed!');
    },
  });

  return {
    createInstructorNotification: mutation.mutate,
    isCreatingNotification: mutation.isPending,
  };
}
