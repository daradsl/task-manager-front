import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout";
import customTheme from "./theme";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Router>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;
