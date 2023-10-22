import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './sidebar/Sidebar';
import Preview from './preview/Preview';

interface LayoutProps {
 children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
 return (
  <Flex>
   <Sidebar />
   <Box flex="1" p="4" display="flex" justifyContent="center" alignItems="center">
    <Preview />
   </Box>
  </Flex>
 );
};

export default Layout;
