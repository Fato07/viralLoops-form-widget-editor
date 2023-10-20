
import { RootState } from '@/store/store';
import { Box, Heading, Text, Input, Button, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Preview = () => {
 // Fetch state from Redux store
 const title = useSelector((state: RootState) => state.titleSubtitle.title);
 const subtitle = useSelector((state: RootState) => state.titleSubtitle.subtitle);
 const fontSize = useSelector((state: RootState) => state.fontCustomization.fontSize);
 const fontColor = useSelector((state: RootState) => state.fontCustomization.fontColor);
 const textAlign = useSelector((state: RootState) => state.fontCustomization.textAlign);
 const backgroundColor = useSelector((state: RootState) => state.submitButton.backgroundColor);
 const buttonText = useSelector((state: RootState) => state.submitButton.text);

 return (
  <Box
   p="4"
   borderWidth="1px"
   borderRadius="lg"
   boxShadow="lg"
   width="100%"
   maxW="500px"
  >
   <VStack spacing={4} align="stretch">
    <Heading
     size="lg"
     fontSize={fontSize}
     color={fontColor}
     textAlign={textAlign as any}
    >
     {title}
    </Heading>
    <Text
     fontSize="md"
     color={fontColor}
     textAlign={textAlign as any}
    >
     {subtitle}
    </Text>
    <Input placeholder="First Name" />
    <Input placeholder="Last Name" />
    <Input placeholder="Email" required />
    <Button backgroundColor={backgroundColor} color="white">
     {buttonText}
    </Button>
   </VStack>
  </Box>
 );
};

export default Preview;
