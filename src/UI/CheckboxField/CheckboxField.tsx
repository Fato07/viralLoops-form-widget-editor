import React from 'react'
import { Checkbox, Input, Text } from '@chakra-ui/react';

interface CheckboxFieldProps {
 field: {
  label?: string;
  required: boolean;
 };
 updateLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
 toggleRequired: () => void;
}

const CheckboxField = ({ field, updateLabel, toggleRequired }: CheckboxFieldProps) => {
 return (
  <>
   <Text fontWeight="bold">Checkbox</Text>
   <Input
    value={field.label || ''}
    onChange={updateLabel}
    placeholder="Checkbox Label"
    maxW="100%"
   />
   <Checkbox mt={2} isChecked={field.required} onChange={toggleRequired}>
    Required
   </Checkbox>
  </>
 )
}

export default CheckboxField