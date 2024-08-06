import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Center,
  VStack,
} from "@chakra-ui/react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {};

  const handleCreateAccount = () => {};

  return (
    <Center h="100vh">
      <Box
        p={8}
        borderWidth={2}
        borderRadius="md"
        boxShadow="md"
        maxW="md"
        w="full"
        bg="white"
      >
        <Heading mb={4} fontSize="lg" textAlign="center">
          Login
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            w="full"
            _hover={{ bg: "teal.700" }}
          >
            Log In
          </Button>
          <Button
            onClick={handleCreateAccount}
            w="full"
            bg="gray.600"
            color="white"
            _hover={{ bg: "gray.700" }}
          >
            Create Account
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginPage;
