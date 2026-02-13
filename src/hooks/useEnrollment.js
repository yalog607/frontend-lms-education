import { useQuery } from "@tanstack/react-query"
import { getUserEnrollmentAPI } from "../api/enrollment"


export const useGetUserEnrollment = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['user-enrollment'],
        queryFn: getUserEnrollmentAPI,
    })
    return {data, isLoading, isError, error};
}