import { useQuery } from '@tanstack/react-query';
import { getAllTeachersAPI } from '../api/teacher';

export const useGetAllTeachers = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['teachers'],
        queryFn: getAllTeachersAPI
    });
    return { data, isLoading, isError, error };
};
