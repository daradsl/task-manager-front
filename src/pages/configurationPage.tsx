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
import { getUsers, updateUser } from "../services/userService";

const ConfigurationPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    id: "",
  });

  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "birthDate" ? value : value,
    }));
  };

  const toggleEditing = async () => {
    const { name, email, password, birthDate, id } = formData;
    if (isEditing) {
      try {
        await updateUser(formData.id, {
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
      } catch (error) {
        toast({
          title: "Error updating user.",
          description:
            "There was an error updating the user data. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await getUsers();
        const user = users[0];
        setFormData({
          name: user.name,
          email: user.email,
          password: "********",
          birthDate: new Date(user.birthDate).toISOString().split("T")[0],
          id: user.id,
        });
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error fetching user data.",
          description:
            "There was an error fetching the user data. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUserData();
  }, []);

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
          My Account
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <FormControl id="birthDate">
            <FormLabel>Birth Date</FormLabel>
            <Input
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <Button onClick={toggleEditing} colorScheme="teal">
            {isEditing ? "Save" : "Edit"}
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default ConfigurationPage;
