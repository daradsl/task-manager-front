import axios from "axios";
import { User } from "../types/userType";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/users`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching users");
    }
};

export const getLoggedUser = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/users/me`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching loggedUser");
    }
};

export const updateUser = async (id: string, userData: User) => {
    try {
        const response = await axios.put(`${VITE_API_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error("Error updating user");
    }
};

export const createUser = async (userData: User) => {
    try {
        const response = await axios.post(`${VITE_API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        throw new Error("Error creating user");
    }
};
