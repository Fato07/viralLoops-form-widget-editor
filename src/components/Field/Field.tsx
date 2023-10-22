import { updateField } from '@/store/extraFieldsSlice';
import { RootState } from '@/store/store';
import { Checkbox, Input, Text, Textarea } from '@chakra-ui/react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Field = ({ field, register }) => {
  const dispatch = useDispatch();
  const extraFields = useSelector((state: RootState) => state.extraFields);

  const updateLabel = (e) => {
    const updatedField = { ...field, label: e.target.value };
    dispatch(updateField(updatedField));
  };

  const updateOptions = (e) => {
    const options = e.target.value.split(',').map(label => ({ label: label.trim(), value: label.trim() }));
    const updatedField = { ...field, options };
    dispatch(updateField(updatedField));
  };

  const toggleRequired = () => {
    const updatedField = { ...field, required: !field.required };
    dispatch(updateField(updatedField));
  };

  switch (field.type) {
    case 'checkbox':
      return (
        <>
          <Text fontWeight="bold">Checkbox</Text>
          <Input
            {...register(`extraFields.${field.id}.label`)}
            value={field.label || ''}
            onChange={updateLabel}
            placeholder="Checkbox Label"
            maxW="100%"
          />
          <Checkbox
            {...register(`extraFields.${field.id}.required`)}
            mt={2}
            isChecked={field.required}
            onChange={toggleRequired}>
            Required
          </Checkbox>
        </>
      );
    case 'radio':
      return (
        <>
          <Text fontWeight="bold">Radio Button</Text>
          <Textarea
            {...register(`extraFields.${field.id}.options`)}
            value={field.options?.map((option) => option.label).join(', ') || ''}
            onChange={updateOptions}
            placeholder="Option 1, Option 2, Option 3"
            maxW="100%"
          />
        </>
      );
    case 'dropdown':
      return (
        <>
          <Text fontWeight="bold">Dropdown</Text>
          <Textarea
            {...register(`extraFields.${field.id}.options`)}
            value={field.options?.map((option) => option.label).join(', ') || ''}
            onChange={updateOptions}
            placeholder="Option 1, Option 2, Option 3"
            maxW="100%" />
        </>
      );
    default:
      return null;
  }

};

export default Field