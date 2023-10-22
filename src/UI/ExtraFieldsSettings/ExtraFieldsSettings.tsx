import { Box, Button, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ExtraField, FieldType } from '@/types/ExtraField';
import { addField, removeField } from '@/store/extraFieldsSlice';
import ExtraFormField from '../ExtraFormField/ExtraFormField';

const ExtraFieldsSettings = () => {
 const dispatch = useDispatch();
 const extraFields = useSelector((state: RootState) => state.extraFields);

 const handleAddField = (type: FieldType) => {
  const newField: ExtraField = {
   id: Date.now().toString(), // simple unique ID generation
   type: type,
   required: true,
  };
  dispatch(addField(newField));
 };

 return (
  <>
   <Stack spacing={3}>
    <Button onClick={() => handleAddField('checkbox')}>Add Checkbox</Button>
    <Button onClick={() => handleAddField('radio')}>Add Radio Button</Button>
    <Button onClick={() => handleAddField('dropdown')}>Add Dropdown</Button>
   </Stack>

   {/* List of added extra fields */}
   {extraFields.map((field) => (
    <Box key={field.id} mt={4} p={4} borderWidth="1px" borderRadius="md">
     <ExtraFormField field={field} />
     <Button mt={2} onClick={() => dispatch(removeField(field.id))}>Remove Field</Button>
    </Box>
   ))}
  </>
 );
};

export default ExtraFieldsSettings;
