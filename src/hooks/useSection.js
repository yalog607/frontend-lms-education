import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createSectionAPI, deleteSectionAPI, updateSectionAPI } from '../api/section.js';

export const useCreateSection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSectionAPI,
    onSuccess: () => {
      toast.success('Create section successfully!');
      queryClient.invalidateQueries({ queryKey: ['course'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Create section failed!');
    },
  });

  return {
    createSection: mutation.mutate,
    isCreatingSection: mutation.isPending,
  };
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateSectionAPI,
    onSuccess: () => {
      toast.success('Update section successfully!');
      queryClient.invalidateQueries({ queryKey: ['course'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Update section failed!');
    },
  });

  return {
    updateSection: mutation.mutate,
    isUpdatingSection: mutation.isPending,
  };
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteSectionAPI,
    onSuccess: () => {
      toast.success('Delete section successfully!');
      queryClient.invalidateQueries({ queryKey: ['course'] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Delete section failed!');
    },
  });

  return {
    deleteSection: mutation.mutate,
    isDeletingSection: mutation.isPending,
  };
};
