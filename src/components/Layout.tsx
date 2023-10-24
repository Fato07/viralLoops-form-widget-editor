import {
  Box, Flex
} from '@chakra-ui/react';
import Sidebar from './sidebar/Sidebar';
import Preview from './preview/Preview';
import Footer from './Footer/Footer';

const Layout = () => {

  return (
    <Flex minHeight="100vh">
      <Box height="100%" overflowY="auto" maxW="300px" width="full">
        <Sidebar />
      </Box>
      <Flex flexDirection="column" flex="1">
        <Box flex="1" p="4" display="flex" justifyContent="center" alignItems="center">
          <Preview />
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default Layout;
