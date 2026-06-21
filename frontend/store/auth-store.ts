import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;

    login: (token: string) => void;
    logout: () => void;
}

const getToken = () => {
    if (typeof window === "undefined") return null;

    return Cookies.get("access-token") || null;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: getToken(),

    isAuthenticated: !!getToken(),

    login: (token) => {
        Cookies.set("access-token", token, {
            expires: 7,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        set({
            token,
            isAuthenticated: true,
        });
    },

    logout: () => {
        Cookies.remove("access-token");

        set({
            token: null,
            isAuthenticated: false,
        });
    },
}));