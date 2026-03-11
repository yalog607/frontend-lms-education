import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUserAPI, getAllUsersAPI } from '../api/auth.js';
import { getAllCoursesAPI } from '../api/course.js';
import { toast } from 'react-hot-toast';

const normalizeUsersFromCourses = (coursePayload) => {
  const courses = coursePayload?.courses || coursePayload?.data || [];
  const map = new Map();

  courses.forEach((course) => {
    const teacher = course?.teacher_id;
    if (!teacher?._id) {
      return;
    }

    if (!map.has(teacher._id)) {
      map.set(teacher._id, {
        _id: teacher._id,
        first_name: teacher.first_name || '',
        last_name: teacher.last_name || '',
        email: teacher.email || '',
        role: teacher.role || 'teacher',
        coursesCount: 0,
      });
    }

    const existing = map.get(teacher._id);
    map.set(teacher._id, {
      ...existing,
      coursesCount: existing.coursesCount + 1,
    });
  });

  return Array.from(map.values());
};

export const useAdminUsers = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      try {
        const response = await getAllUsersAPI();
        return {
          users: response?.users || response?.data || [],
          source: 'users-api',
        };
      } catch (apiError) {
        const coursePayload = await getAllCoursesAPI();
        return {
          users: normalizeUsersFromCourses(coursePayload),
          source: 'courses-fallback',
          fallbackReason: apiError?.response?.data?.message || 'User API is unavailable.',
        };
      }
    },
  });

  return {
    users: data?.users || [],
    source: data?.source || 'unknown',
    fallbackReason: data?.fallbackReason || '',
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUserAPI,
    onSuccess: () => {
      toast.success('Delete user successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Delete user failed!');
    },
  });

  return {
    deleteUser: mutation.mutate,
    isDeletingUser: mutation.isPending,
  };
};
