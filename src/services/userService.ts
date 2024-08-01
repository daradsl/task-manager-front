import axios from "axios";
import { User } from "../types/userType";

const API_URL = "http://localhost:3000";

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching users");
    }
};

export const updateUser = async (id: string, userData: User) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error("Error updating user");
    }
};
