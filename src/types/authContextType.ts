import { createContext } from "react";
import { User } from "./userType";

export type AuthContextType = {
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
