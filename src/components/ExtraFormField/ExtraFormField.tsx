import React from 'react';
import { useDispatch } from 'react-redux';
import CheckboxField from '../CheckboxField/CheckboxField';
import RadioField from '../RadioField/RadioField';
import DropdownField from '../DropdownField/DropdownField';
import { ExtraField, FieldType } from '@/types/ExtraField';
import { updateField } from '@/store/extraFieldsSlice';


const ExtraFormField = ({ field }: { field: ExtraField }) => {
  const dispatch = useDispatch();

  const updateLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedField = { ...field, label: e.target.value };
    dispatch(updateField(updatedField));
  };

  const updateOptions = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let options = e.target.value.split(',').map(label => ({ label: label.trim(), value: label.trim() }));

    const updatedField = { ...field, options };
    dispatch(updateField(updatedField));
  };


  const toggleRequired = () => {
    const updatedField = { ...field, required: !field.required };
    dispatch(updateField(updatedField));
  };

  const fieldTypes = {
    checkbox: CheckboxField,
    radio: RadioField,
    dropdown: DropdownField,
  };

  const FieldTypeComponent = fieldTypes[field.type];

  return FieldTypeComponent ? (
    <FieldTypeComponent field={field} updateLabel={updateLabel} updateOptions={updateOptions} toggleRequired={toggleRequired} />
  ) : null;
};

export default ExtraFormField;