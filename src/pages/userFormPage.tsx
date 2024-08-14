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

const UserFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    id: "",
  });

  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
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
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("No user logged in.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
      if (isLoggedIn) {
        await updateUser(id, {
          name,
          email,
          password,
          birthDate: new Date(birthDate),
          id,
        });
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
        title: `Error ${isLoggedIn ? "updating" : "creating"} user.`,
        description: `There was an error ${
          isLoggedIn ? "updating" : "creating"
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
          {isLoggedIn ? "My Account" : "Create Account"}
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isReadOnly={!isEditing && isLoggedIn}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isReadOnly={!isEditing && isLoggedIn}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              isReadOnly={!isEditing && isLoggedIn}
            />
          </FormControl>
          <FormControl id="birthDate">
            <FormLabel>Birth Date</FormLabel>
            <Input
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              isReadOnly={!isEditing && isLoggedIn}
            />
          </FormControl>
          <Button
            onClick={isLoggedIn ? handleEditClick : handleSubmit}
            colorScheme="teal"
          >
            {isLoggedIn ? (isEditing ? "Save" : "Edit") : "Create"}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default UserFormPage;
