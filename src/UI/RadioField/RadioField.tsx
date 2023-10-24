import React from 'react';
import { Text, Textarea, Flex, Tooltip, Box, Icon } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

const RadioField = ({ field, updateOptions, removeField }) => (
 <>
  <Flex alignItems="center" justifyContent="space-between">
   <Text fontWeight="bold">Radio</Text>
   <Tooltip label="Remove Field" placement="top-end">
    <Box
     as="span"
     display="inline-block"
     transition="color 0.2s"
     color="red.500"
     _hover={{ color: "red.700" }}
    >
     <Icon
      as={FaTrashAlt}
      cursor="pointer"
      onClick={() => removeField(field.id)}
     />
    </Box>
   </Tooltip>
  </Flex>
  <Textarea
   mt={5}
   value={field.options?.map((option) => option.label).join(', ') || ''}
   onChange={updateOptions}
   placeholder="Option 1, Option 2, Option 3"
   maxW="100%"
  />
 </>
);


export default RadioField;
