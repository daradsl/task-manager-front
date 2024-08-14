import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import UserFormPage from "./pages/userFormPage";
import AnotherPage from "./pages/anotherPage";
import { useAuth } from "./context/useAuth";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/user-page" element={<UserFormPage />} />
      <Route
        path="/new-page"
        element={isAuthenticated ? <AnotherPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default AppRoutes;
