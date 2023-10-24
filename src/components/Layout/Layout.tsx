import {
  Box, Flex, Text
} from '@chakra-ui/react';
import Sidebar from '../sidebar/Sidebar';
import Preview from '../preview/Preview';
import Footer from '../Footer/Footer';
import { useUser } from "@clerk/nextjs";

const Layout = () => {

  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <Flex minHeight="100vh">
      <Box height="100%" overflowY="auto" maxW="300px" width="full">
        <Sidebar />
      </Box>
      <Flex flexDirection="column" flex="1">

        <Box flex="1" p="4" display="flex" height="700px" justifyContent="center" alignItems="center">
          <Preview />
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default Layout;
