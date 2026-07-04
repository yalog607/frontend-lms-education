import { create } from "zustand";
import { getMeAPI } from "../api/auth";
let lastCheckAuth = 0;
let checkAuthTimeout = null;

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

    checkAuth: async (force = false) => {
        // Debounce: chỉ cho phép gọi 1 lần mỗi 5s, trừ khi force=true
        const now = Date.now();
        if (!force && now - lastCheckAuth < 5000) {
            if (checkAuthTimeout) clearTimeout(checkAuthTimeout);
            checkAuthTimeout = setTimeout(() => get().checkAuth(true), 5000 - (now - lastCheckAuth));
            return;
        }
        lastCheckAuth = now;
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