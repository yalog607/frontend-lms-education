import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginAPI, registerAPI, logoutAPI } from '../api/auth.js';
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
        isLoggingOut: logoutMutation.isPending
    };
};