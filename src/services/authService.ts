import axios from "axios";
import { LoginType } from "../types/loginType";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const login = async (params: LoginType) => {
    try {
        const response = await axios.post(`${VITE_API_URL}/auth/login`, params);
        if (response.data.access_token) {
            localStorage.setItem('jwt_token', response.data.access_token);
        }
        return response.data;
    } catch (error) {
        throw new Error("Error logging in");
    }
};
