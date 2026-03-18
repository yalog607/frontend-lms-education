import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCourseByIdForTeacherAPI, getEnrolledCourseIdsAPI, checkOwnCourseAPI, getUserCourseAPI, searchCourseAPI, getLatestCoursesAPI, getAllCoursesAPI, getCourseByIdAPI, getCourseOfTeacherAPI, createCoursesAPI, updateCourseAPI, deleteCourseAPI } from '../api/course';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

export const useGetLatestCourse = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['latestCourses'],
        queryFn: getLatestCoursesAPI
    })
    return { data, isLoading, isError, error };
}

export const useGetCourse = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['courses'],
        queryFn: getAllCoursesAPI
    })
    return { data, isLoading, isError, error };
}

export const useGetUserCourse = () => {
    const { user } = useAuthStore();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['my-courses', user?._id],
        queryFn: getUserCourseAPI,
        enabled: !!user?._id,
    })

    return { data, isLoading, isError, error}
}

export const useCourseById = (id) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['course', id],
        queryFn: () => getCourseByIdAPI(id),
        enabled: !!id
    })
    return { data, isLoading, isError, error };
}

export const useCourseByIdForTeacher = (id) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['course-for-teacher', id],
        queryFn: () => getCourseByIdForTeacherAPI(id),
        enabled: !!id
    })
    return { data, isLoading, isError, error };
}

export const useCourseOfTeacher = (teacherId) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['teacherCourses', teacherId],
        queryFn: () => getCourseOfTeacherAPI(teacherId),
        enabled: !!teacherId
    })
    return { data, isLoading, isError, error };
}

export const useTeacherCourses = (teacherId) => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['teacher-courses-safe', teacherId],
        enabled: !!teacherId,
        queryFn: async () => {
            try {
                const result = await getCourseOfTeacherAPI(teacherId);
                const courses = result?.courses || result?.data || [];
                if (Array.isArray(courses)) {
                    return { courses, source: 'teacher-endpoint' };
                }
            } catch (teacherApiError) {
                console.log('Teacher course endpoint fallback:', teacherApiError?.message);
            }

            const allCoursesPayload = await getAllCoursesAPI();
            const allCourses = allCoursesPayload?.courses || allCoursesPayload?.data || [];
            const filtered = allCourses.filter((course) => {
                const teacher = course?.teacher_id;
                if (!teacher) return false;
                if (typeof teacher === 'string') return teacher === teacherId;
                return teacher?._id === teacherId;
            });

            return { courses: filtered, source: 'all-courses-fallback' };
        }
    })

    return {
        data,
        courses: data?.courses || [],
        source: data?.source || 'unknown',
        isLoading,
        isError,
        error,
        refetch,
    };
}

export const useCreateCourse = () => {
    const queryClient = useQueryClient();

    const courseMutation = useMutation({
        mutationFn: createCoursesAPI,
        onSuccess: () => {
            toast.success("Create a course successfully!");
            queryClient.invalidateQueries(['latestCourses', 'courses', 'course-for-teacher']);
        },
        onError: (error) => {
            toast.error('Create a course unsuccessfully');
            console.log("Create a course error", error);
        }
    })

    return {
        create: courseMutation.mutate,
        isCreating: courseMutation.isPending
    }
}

export const useUpdateCourse = () => {
    const queryClient = useQueryClient();

    const courseMutation = useMutation({
        mutationFn: updateCourseAPI,
        onSuccess: (data, variables) => {
            toast.success("Update a course successfully!");
            queryClient.invalidateQueries(['courses']);
            queryClient.invalidateQueries(['course-for-teacher']);
            if (variables.id) {
                queryClient.invalidateQueries({ queryKey: ['course', variables.id] });
            }
        },
        onError: (error) => {
            toast.error('Update a course unsuccessfully');
            console.log("Update a course error", error);
        }
    })

    return {
        update: courseMutation.mutate,
        isUpdating: courseMutation.isPending
    }
}

export const useDeleteCourse = () => {
    const queryClient = useQueryClient();

    const courseMutation = useMutation({
        mutationFn: deleteCourseAPI,
        onSuccess: () => {
            toast.success("Delete a course successfully!");
            queryClient.invalidateQueries(['courses']);
            queryClient.invalidateQueries(['course-for-teacher']);
            queryClient.invalidateQueries({ queryKey: ['teacher-courses-safe'] });
            queryClient.invalidateQueries({ queryKey: ['teacherCourses'] });
        },
        onError: (error) => {
            toast.error('Delete a course unsuccessfully');
            console.log("Delete a course error", error);
        }
    })

    return {
        delete: courseMutation.mutate,
        isDeleting: courseMutation.isPending
    }
}

export const useInstructorCreateCourse = () => {
    const queryClient = useQueryClient();

    const courseMutation = useMutation({
        mutationFn: createCoursesAPI,
        onSuccess: () => {
            toast.success('Create course successfully!');
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            queryClient.invalidateQueries({ queryKey: ['latestCourses'] });
            queryClient.invalidateQueries({ queryKey: ['teacher-courses-safe'] });
            queryClient.invalidateQueries({ queryKey: ['teacherCourses'] });
            queryClient.invalidateQueries({ queryKey: ['course-for-teacher'] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Create course failed!');
        },
    });

    return {
        createCourse: courseMutation.mutate,
        isCreatingCourse: courseMutation.isPending,
    };
};

export const useInstructorUpdateCourse = () => {
    const queryClient = useQueryClient();

    const courseMutation = useMutation({
        mutationFn: updateCourseAPI,
        onSuccess: (_, variables) => {
            toast.success('Update course successfully!');
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            queryClient.invalidateQueries({ queryKey: ['latestCourses'] });
            queryClient.invalidateQueries({ queryKey: ['teacher-courses-safe'] });
            queryClient.invalidateQueries({ queryKey: ['teacherCourses'] });
            queryClient.invalidateQueries({ queryKey: ['course-for-teacher'] });
            if (variables?.id) {
                queryClient.invalidateQueries({ queryKey: ['course', variables.id] });
            }
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Update course failed!');
        },
    });

    return {
        updateCourse: courseMutation.mutate,
        isUpdatingCourse: courseMutation.isPending,
    };
};

export const useSearchCourse = (searchTerm) => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['search-course', searchTerm],
        queryFn: () => searchCourseAPI(searchTerm),
        enabled: !!searchTerm && searchTerm.length > 0,
        // Giữ kết quả cũ khi đang fetch kết quả mới (tránh nhấp nháy UI)
        placeholderData: (previousData) => previousData,
    });

    if (isError) {
        console.log("Use search course error: ", error);
    }

    return {
        data: data?.data,
        isLoading,
        isError,
        error
    }
}

export const useCheckOwnCourse = (course_id) => {
    const { user } = useAuthStore();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['check-own-course', course_id, user?._id],
        queryFn: () => {
            if (!user) return Promise.resolve(null);
            return checkOwnCourseAPI(course_id);
        },
        enabled: !!course_id && !!user?._id
    })
    return { data, isLoading, isError, error };
}

export const useGetEnrolledCourseIds = () => {
    const { user } = useAuthStore();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['enrolled-course-ids', user?._id],
        queryFn: getEnrolledCourseIdsAPI,
        enabled: !!user?._id,
    })
    return { data, isLoading, isError, error };
}