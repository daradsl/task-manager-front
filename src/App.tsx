import React from 'react';
import { ChakraProvider, Box, Flex, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useTheme, Center, Icon } from '@chakra-ui/react';
import { BiTask } from 'react-icons/bi';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './routes';

const App: React.FC = () => {
  const theme = useTheme();

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box>
          <Flex
            as="header"
            bg="teal.500"
            color="white"
            align="center"
            justify="center"
            p={4}
            position="sticky"
            top={0}
            zIndex={1}
            boxShadow="md"
          >
            <Heading size="md" fontFamily="Brush Script MT, Cursive">
              Task Time Manager
            </Heading>
            <Icon as={BiTask} boxSize={6} marginLeft={2}/>
          </Flex>

          <Center>
            <Box mt={4}>
              <Breadcrumb spacing="8px" separator=">">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/">Configurações</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/outra-pagina">Outra Página</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
          </Center>

          <Box p={4}>
            <AppRoutes />
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
