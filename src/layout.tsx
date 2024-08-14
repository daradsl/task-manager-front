import React from "react";
import {
  Box,
  Flex,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";
import { BiTask } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";

  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box>
      <Flex
        as="header"
        bg="teal.500"
        color="white"
        align="center"
        justify="space-between"
        p={2}
        position="sticky"
        top={0}
        zIndex={1}
        boxShadow="md"
      >
        <Flex align="flex-start">
          <Heading size="md" fontFamily="Arial, sans-serif">
            Task Time Manager
          </Heading>
          <Icon as={BiTask} boxSize={6} marginLeft={2} />
        </Flex>
        {isAuthenticated && (
          <Flex align="flex-end">
            <Button colorScheme="white" variant="link" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        )}
      </Flex>

      {!isLoginPage && isAuthenticated && (
        <Center>
          <Box mt={4}>
            <Breadcrumb spacing="8px" separator="-">
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/user-page">
                  <Text fontWeight="bold">Configs</Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/new-page">
                  <Text fontWeight="bold">New Page</Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
        </Center>
      )}

      <Box p={4}>{children}</Box>
    </Box>
  );
};

export default Layout;
