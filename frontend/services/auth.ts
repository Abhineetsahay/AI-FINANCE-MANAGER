import api from "@/lib/api";
import Cookies from "js-cookie";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
    user_income: number;
}

export const loginUser = async (data: LoginPayload) => {
    try {
        const response = await api.post("/auth/login", data);

        Cookies.set(
            "access-token",
            response.data.access_token,
            {
                expires: 7,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (
    data: RegisterPayload
) => {
    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;
};

export const logoutUser = () => {
    Cookies.remove("access-token");
};