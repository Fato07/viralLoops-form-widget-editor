import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './sidebar/Sidebar';

interface LayoutProps {
 children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
 return (
  <Flex>
   <Sidebar />
   <Box flex="1" p="4">
    {children}
   </Box>
  </Flex>
 );
};

export default Layout;
