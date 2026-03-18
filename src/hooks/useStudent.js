import { useQuery } from '@tanstack/react-query';
import { getAllStudentsAPI } from '../api/student';

export const useGetAllStudents = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['students'],
        queryFn: getAllStudentsAPI
    });
    return { data, isLoading, isError, error };
};
