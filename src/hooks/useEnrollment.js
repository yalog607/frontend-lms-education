import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUserEnrollmentAPI } from "../api/enrollment"
import { enrollCourseAPI } from "../api/enrollment"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useGetUserEnrollment = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user-enrollment'],
        queryFn: getUserEnrollmentAPI,
    })
    return { data, isLoading, isError, error };
}

export const useEnrollCourse = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: enrollCourseAPI,
        onSuccess: () => {
            toast.success("Enroll course successfully!");
            queryClient.invalidateQueries(['user-enrollment']);
            queryClient.invalidateQueries(['courses']);
            queryClient.invalidateQueries(['my-courses']);
            queryClient.invalidateQueries(['latestCourses'])
            navigate(`/courses`);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Enroll course failed!");
        }
    })
    return { mutate, isPending, isError, error };
}