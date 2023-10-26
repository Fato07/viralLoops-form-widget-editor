import React, { ChangeEvent, useState } from 'react';
import { Box, Flex, Icon, Input, Text, Textarea, Tooltip } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeField } from '@/store/extraFieldsSlice';

// TODO: Add Proper types
const DropdownField = ({ field, updateLabel, updateOptions }: any) => {
 const dispatch = useDispatch();

 const [isExceeded, setIsExceeded] = useState(false);

 const handleOptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  const optionsCount = e.target.value.split(',').length;

  if (optionsCount > 10) {
   setIsExceeded(true);
  } else {
   setIsExceeded(false);
   updateOptions(e);
  }
 };

 return (
  <>
   <Flex alignItems="center" justifyContent="space-between">
    <Text fontWeight="bold">Dropdown</Text>
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
       onClick={() => dispatch(removeField(field.id))}
      />
     </Box>
    </Tooltip>
   </Flex>
   <Input
    mt={5}
    value={field.label || ''}
    onChange={updateLabel}
    placeholder="Dropdown Label"
    maxW="100%"
   />
   <Textarea
    mt={5}
    // TODO: Add proper types for options
    value={field.options?.map((option: any) => option.label).join(', ') || ''}
    onChange={handleOptionChange}
    placeholder="Option 1, Option 2, Option 3"
    maxW="100%"
    borderColor={isExceeded ? "red.500" : undefined}
   />
   {isExceeded && <Text color="red.500" fontSize="sm">You can add up to 10 options only.</Text>
   }

  </>
 );
}

export default DropdownField;
