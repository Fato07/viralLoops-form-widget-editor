import React from 'react';
import { Checkbox, Icon, Input, Text, Tooltip, Flex, Box } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeField } from '@/store/extraFieldsSlice';

const CheckboxField = ({ field, updateLabel, toggleRequired }) => {
 const dispatch = useDispatch();

 return (
  <>
   <Flex alignItems="center" justifyContent="space-between">
    <Text fontWeight="bold">Checkbox</Text>
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
    placeholder="Checkbox Label"
    maxW="100%"
   />
   <Checkbox mt={5} isChecked={field.required} onChange={toggleRequired}>
    Required
   </Checkbox>
  </>
 );
}

export default CheckboxField;
