import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUserEnrollmentAPI } from "../api/enrollment"
import { enrollCourseAPI } from "../api/enrollment"
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetUserEnrollment = () => {
    const { user } = useAuthStore();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user-enrollment', user?._id],
        queryFn: getUserEnrollmentAPI,
        enabled: !!user?._id,
    })
    return { data, isLoading, isError, error };
}

export const useEnrollCourse = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: enrollCourseAPI,
        onSuccess: (response, courseId) => {
            toast.success(response?.message || "Enroll course successfully!");
            queryClient.invalidateQueries(['user-enrollment']);
            queryClient.invalidateQueries(['courses']);
            queryClient.invalidateQueries(['my-courses']);
            queryClient.invalidateQueries(['enrolled-course-ids']);
            if (courseId) {
                queryClient.invalidateQueries(['check-own-course', courseId]);
            }
            queryClient.invalidateQueries(['latestCourses'])
            navigate(`/courses`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Enroll course failed!");
        }
    })
    return { mutate, isPending, isError, error };
}