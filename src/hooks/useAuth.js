import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginAPI, registerAPI, logoutAPI, changePasswordAPI, getMeAPI, updateAvatarAPI, updateInfoAPI } from '../api/auth.js';
import useAuthStore from '../store/useAuthStore.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
    const { setAuth, logout } = useAuthStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: loginAPI,
        onSuccess: (data) => {
            setAuth(data.user, data.accessToken);

            toast.success(`Welcome, ${data.user.first_name}`);
            queryClient.setQueryData(['me'], data.user)
            navigate('/home');
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.response?.data?.message || "Login failed!");
        }
    });

    const registerMutation = useMutation({
        mutationFn: registerAPI,
        onSuccess: (data) => {
            setAuth(data.user, data.accessToken)

            toast('Register successfully!', { icon: '🎉' });
            queryClient.setQueryData(['me'], data.user)
            navigate('/home');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Register failed!");
        }
    });

    const changePasswordMutation = useMutation({
        mutationFn: changePasswordAPI,
        onSuccess: () => {
            toast.success('Change your password successfully!');
            queryClient.invalidateQueries(['me']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Change the password failed!");
        }
    })

    const logoutMutation = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            logout();
            toast.success('Logout successfully!');
            queryClient.setQueryData(['me'], null)
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Logout failed!");
        }
    })

    return {
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
        changePass: changePasswordMutation.mutate,
        isChangingPass: changePasswordMutation.isPending,
    };
};

export const useGetMe = () => {
    const { data, isLoading: isGetting } = useQuery({
        queryKey: ['me'],
        queryFn: getMeAPI
    });
    return {
        userInfo: data?.user || [], isGetting
    }
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    
    const updateAvatarMutation = useMutation({
        mutationFn: updateAvatarAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(['me']);
        },
        onError: (err) => {
            console.log("Update avatar error: ", err);
            toast.error("Update avatar failed!")
        }
    });

    const updateInfoMutation = useMutation({
        mutationFn: updateInfoAPI,
        onSuccess: () => {
            toast.success('Profile updated successfully!');
            queryClient.invalidateQueries(['me']);
        },
        onError: (err) => {
            console.log("Update user error: ", err);
            toast.error("Update user failed!")
        }
    })

    return {
        updateAvatar: updateAvatarMutation.mutate,
        isUpdatingAvatar: updateAvatarMutation.isPending,
        updateInfo: updateInfoMutation.mutate,
        isUpdatingInfo: updateInfoMutation.isPending
    }
}