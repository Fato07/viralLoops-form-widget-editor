import { SignIn } from "@clerk/nextjs";
import { Flex } from '@chakra-ui/react';

const SignUpPage = () => {
 return (
  <Flex
   height="100vh"
   width="100vw"
   alignItems="center"
   justifyContent="center"
  >
   <SignIn />
  </Flex>
 );
};

export default SignUpPage;
