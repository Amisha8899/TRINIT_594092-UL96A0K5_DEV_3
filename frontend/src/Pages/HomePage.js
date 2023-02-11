import React from "react";
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/SignUp";
const HomePage = () => {
    return <Container maxW='xl' centerContent>
    <Box
    d='flex'
    justifyContent='center'
    p="6px 10px"
    bg={"white"}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth="1px"
    align="center" 
    >
      <Text 
      as='b' 
      fontSize="2xl" 
      fontStyle="Poppins" 
      color="black" 
      >
      cReate ID to cHat
      </Text>  
    </Box>
    <Box 
    bg='white'
    w="100%"
    p={4}
    borderRadius='lg'
    borderWidth="1px"
    >
<Tabs variant='soft-rounded'>
  <TabList mb='1em'>
    <Tab width='50%'>Let's Chat</Tab>
    <Tab width='50%'>Make ID</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
    </Container>
};
export default HomePage;