import { Box, Heading, VStack, FormControl, FormLabel, Input, ColorModeScript, Button, Select } from '@chakra-ui/react';
import styled from 'styled-components';

const StyledSidebar = styled(Box)`
    width: 300px;
    padding: 20px;
    border-right: 1px solid #e2e8f0;
`;

const Sidebar = () => {
 return (
  <StyledSidebar>
   <VStack spacing={4} align="stretch">
    {/* Title and Subtitle */}
    <Heading size="md">Form Settings</Heading>
    <FormControl>
     <FormLabel>Title</FormLabel>
     <Input placeholder="Enter title" />
    </FormControl>
    <FormControl>
     <FormLabel>Subtitle</FormLabel>
     <Input placeholder="Enter subtitle" />
    </FormControl>

    {/* Font Customization */}
    <Heading size="md">Font Customization</Heading>
    <FormControl>
     <FormLabel>Font Size</FormLabel>
     <Select placeholder="Select font size">
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
     </Select>
    </FormControl>
    <FormControl>
     <FormLabel>Font Color</FormLabel>
     <Input type="color" />
    </FormControl>
    <FormControl>
     <FormLabel>Text Alignment</FormLabel>
     <Select placeholder="Select alignment">
      <option value="left">Left</option>
      <option value="center">Center</option>
      <option value="right">Right</option>
     </Select>
    </FormControl>

    {/* Submit Button Customization */}
    <Heading size="md">Submit Button</Heading>
    <FormControl>
     <FormLabel>Background Color</FormLabel>
     <Input type="color" />
    </FormControl>
    <FormControl>
     <FormLabel>Button Text</FormLabel>
     <Input placeholder="Enter button text" />
    </FormControl>
   </VStack>
  </StyledSidebar>
 );
};

export default Sidebar;
