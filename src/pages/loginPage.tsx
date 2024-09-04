import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Center,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { login as authLogin, loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/useAuth";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";
import { User } from "../types/userType";

const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      const params = { email, password };
      const response = await authLogin(params);
      const { access_token, user } = response;
      loginSuccess(access_token, user);
    } catch (error) {
      loginFailed();
    }
  };

  const handleLoginWithGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("tokenObj" in response && "profileObj" in response) {
      try {
        const idToken = response.tokenObj.id_token;
        const loginResponse = await loginWithGoogle({ idToken });
        const { access_token, user } = loginResponse;
        loginSuccess(access_token, user);
      } catch (error) {
        loginFailed();
      }
    } else {
      loginFailed();
    }
  };

  const loginFailed = () => {
    toast({
      title: "Login failed.",
      description: "Invalid email or password. Please try again.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const loginSuccess = (access_token: string, user: User) => {
    login(access_token, user);
    toast({
      title: "Login successful.",
      description: "You have been successfully logged in.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/user-page");
  };

  const handleCreateAccount = () => {
    navigate("/user-page");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: VITE_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

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
          <GoogleLogin
            clientId={VITE_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={(response) => handleLoginWithGoogle(response)}
            onFailure={loginFailed}
            cookiePolicy={"single_host_origin"}
          />
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginPage;
