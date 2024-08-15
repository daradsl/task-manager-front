import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { createUser, getLoggedUser, updateUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { User } from "../types/userType";

const UserFormPage: React.FC = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    id: "",
  });

  const toast = useToast();

  const getUserData = async () => {
    try {
      const user = await getLoggedUser();
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          password: "********",
          birthDate: new Date(user.birthDate).toISOString().split("T")[0],
          id: user.id,
        });
      }
    } catch (error) {
      console.log("No user logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !formData.id) {
      setLoading(true);
      getUserData();
    }
  }, [formData.id, isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    if (isEditing) {
      handleSubmit();
    } else {
      setIsEditing(true);
    }
  };

  const handleSubmit = async () => {
    const { name, email, password, birthDate, id } = formData;

    if (!name || !email || !password || !birthDate) {
      toast({
        title: "Invalid input",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      if (isAuthenticated) {
        const updatedData: User = {
          name,
          email,
          birthDate: new Date(birthDate),
          id,
        };
        if (password !== "********") {
          updatedData.password = password;
        }
        await updateUser(id, updatedData);
        toast({
          title: "User updated.",
          description: "The user data has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsEditing(false);
      } else {
        await createUser({
          name,
          email,
          password,
          birthDate: new Date(birthDate),
        });
        toast({
          title: "User created.",
          description: "The user has been successfully created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: `Error ${isAuthenticated ? "updating" : "creating"} user.`,
        description: `There was an error ${
          isAuthenticated ? "updating" : "creating"
        } the user data. Please try again.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center h="100vh" bg="gray.100">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Center bg="gray.100" minH="100vh">
      <Box
        mx="auto"
        p={8}
        borderWidth={2}
        borderRadius="md"
        boxShadow="md"
        maxW="2xl"
        w="full"
        bg="white"
      >
        <Heading mb={4} fontSize="lg" textAlign="center">
          {isAuthenticated ? "My Account" : "Create Account"}
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isReadOnly={!isEditing && isAuthenticated}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isReadOnly={!isEditing && isAuthenticated}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              isReadOnly={!isEditing && isAuthenticated}
            />
          </FormControl>
          <FormControl id="birthDate">
            <FormLabel>Birth Date</FormLabel>
            <Input
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              isReadOnly={!isEditing && isAuthenticated}
            />
          </FormControl>
          <Button
            onClick={isAuthenticated ? handleEditClick : handleSubmit}
            colorScheme="teal"
          >
            {isAuthenticated ? (isEditing ? "Save" : "Edit") : "Create"}
          </Button>
          {!isAuthenticated && (
            <Button colorScheme="gray" onClick={() => navigate("/")}>
              Back
            </Button>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default UserFormPage;
