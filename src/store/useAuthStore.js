import { create } from "zustand";
import { getMeAPI } from "../api/auth";

const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isCheckingAuth: true,
    
    setAuth: (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        set({ user, token });
    },

    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({user});
    },

    checkAuth: async () => {
        const token = get().token; 
        if (!token) {
           set({ isCheckingAuth: false, user: null });
           return;
        }
        set({ isCheckingAuth: true });

        try {
          const res = await getMeAPI(); 

          if (res.user) {
            set({ user: res.user });
          }
        } catch (error) {
          console.log("Checking auth error:", error);
          set({ user: null, token: null, isCheckingAuth: false });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        } finally {
            set({ isCheckingAuth: false });
        }
      },

    logout: () => {
        localStorage.clear();
        set({ user: null, token: null });
    }
}));

export default useAuthStore;