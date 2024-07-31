import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ConfigurationPage from './pages/configurationPage';
import AnotherPage from './pages/anotherPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ConfigurationPage />} />
      <Route path="/outra-pagina" element={<AnotherPage />} />
    </Routes>
  );
};

export default AppRoutes;
