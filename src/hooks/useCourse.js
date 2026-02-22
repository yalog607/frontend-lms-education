import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checkOwnCourseAPI, getUserCourseAPI, searchCourseAPI, getLatestCoursesAPI, getAllCoursesAPI, getCourseByIdAPI, getCourseOfTeacherAPI, createCoursesAPI, updateCourseAPI, deleteCourseAPI } from '../api/course';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['my-courses'],
        queryFn: getUserCourseAPI
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

export const useCourseOfTeacher = (teacherId) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['teacherCourses', teacherId],
        queryFn: () => getCourseOfTeacherAPI(teacherId),
        enabled: !!teacherId
    })
    return { data, isLoading, isError, error };
}

export const useCreateCourse = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const courseMutation = useMutation({
        mutationFn: createCoursesAPI,
        onSuccess: () => {
            toast.success("Create a course successfully!");
            queryClient.invalidateQueries(['courses']);
            queryClient.invalidateQueries({ queryKey: ['latestCourses'] });
            navigate('/home');
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
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const courseMutation = useMutation({
        mutationFn: updateCourseAPI,
        onSuccess: (data, variables) => {
            toast.success("Update a course successfully!");
            queryClient.invalidateQueries(['courses']);
            if (variables.id) {
                queryClient.invalidateQueries({ queryKey: ['course', variables.id] });
            }
            navigate('/home');
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
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['check-own-course', course_id],
        queryFn: () => checkOwnCourseAPI(course_id),
        enabled: !!course_id
    })
    return { data, isLoading, isError, error };
}