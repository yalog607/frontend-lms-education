import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCommentsByLessonIdAPI, createCommentAPI } from "../api/comment";
import { toast } from "react-hot-toast";

export const useCommentsByLessonId = (lessonId) => {
    return useQuery({
        queryKey: ['comments', lessonId],
        queryFn: () => getCommentsByLessonIdAPI(lessonId),
        enabled: !!lessonId,
    })
}

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: createCommentAPI,
        onSuccess: () => {
            toast.success('Comment created successfully!');
            queryClient.invalidateQueries(['comments']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Create comment failed!");
        }
    });
    return { mutate, isLoading };
}