// src/components/Layout.tsx
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
} from "@chakra-ui/react";
import { BiTask } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <Box>
      <Flex
        as="header"
        bg="teal.500"
        color="white"
        align="center"
        justify="center"
        p={2}
        position="sticky"
        top={0}
        zIndex={1}
        boxShadow="md"
      >
        <Heading size="md" fontFamily="Arial, sans-serif">
          Task Time Manager
        </Heading>
        <Icon as={BiTask} boxSize={6} marginLeft={2} />
      </Flex>

      {!isLoginPage && (
        <Center>
          <Box mt={4}>
            <Breadcrumb spacing="8px" separator="-">
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/configs">
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
