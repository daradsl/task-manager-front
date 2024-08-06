import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout";
import customTheme from "./theme";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ChakraProvider>
  );
};

export default App;
