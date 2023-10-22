import React from 'react';
import { Text, Textarea } from '@chakra-ui/react';

interface RadioFieldProps {
 field: {
  options?: { label: string; value: string }[];
 };
 updateOptions: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RadioField = ({ field, updateOptions }: RadioFieldProps) => (
 <>
  <Text fontWeight="bold">Radio Button</Text>
  <Textarea
   value={field.options?.map((option) => option.label).join(', ') || ''}
   onChange={updateOptions}
   placeholder="Option 1, Option 2, Option 3"
   maxW="100%"
  />
 </>
);

export default RadioField;
