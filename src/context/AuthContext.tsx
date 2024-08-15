import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { User } from "../types/userType";
import { AuthContextType } from "../types/authContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string, user: User) => {
    localStorage.setItem("jwt_token", token);
    setIsAuthenticated(true);
    setUser(user);
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    setUser(null);
    delete axios.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
