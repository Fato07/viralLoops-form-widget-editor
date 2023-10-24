import { SignUp } from "@clerk/clerk-react";
import { Flex } from "@chakra-ui/react";

const SignUpPage = () => {
 return (
  <Flex
   height="100vh"
   width="100vw"
   alignItems="center"
   justifyContent="center"
  >
   <SignUp />
  </Flex>
 );
};

export default SignUpPage;
