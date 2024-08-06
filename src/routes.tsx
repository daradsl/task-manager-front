import React from "react";
import { Route, Routes } from "react-router-dom";
import UserFormPage from "./pages/userFormPage";
import AnotherPage from "./pages/anotherPage";
import LoginPage from "./pages/loginPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/user-page" element={<UserFormPage />} />
      <Route path="/new-page" element={<AnotherPage />} />
    </Routes>
  );
};

export default AppRoutes;
