import { Box, Heading, VStack, FormControl, FormLabel, Input, Select, Button, Checkbox, Stack, Text, Textarea } from '@chakra-ui/react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setTitle, setSubtitle } from '../../store/titleSubtitleSlice';
import { setFontSize, setFontColor, setTextAlign } from '../../store/fontCustomizationSlice';
import { setBackgroundColor, setText } from '../../store/submitButtonSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/zodSchemas/formSchema';
import { FormData } from './types';
import { toggleFirstNameRequired, toggleLastNameRequired } from '@/store/requiredFieldsSlice';
import { ExtraField, FieldType, addField, removeField, updateField } from '@/store/extraFieldsSlice';
import Field from '../Field/Field';
import FormFields from './FormFields/FormFields';
import { saveWidgetSettings } from '@/service/apiService';

const Sidebar = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });


    const handleFormSubmit = (data: FormData) => {
        console.log(data);
        try {
            saveWidgetSettings(data).then((res) => {
                console.log('Data saved successfully:', res);
            });

        } catch (error: any) {
            console.log('Error saving data:', error.message);

        }

    };

    const dispatch = useDispatch();

    // State from Redux
    const fontSize = useSelector((state: RootState) => state.fontCustomization.fontSize);
    const fontColor = useSelector((state: RootState) => state.fontCustomization.fontColor);
    const textAlign = useSelector((state: RootState) => state.fontCustomization.textAlign);
    const backgroundColor = useSelector((state: RootState) => state.submitButton.backgroundColor);
    const buttonText = useSelector((state: RootState) => state.submitButton.text);
    const isFirstNameRequired = useSelector((state: RootState) => state.requiredFields.firstName);
    const isLastNameRequired = useSelector((state: RootState) => state.requiredFields.lastName);
    const extraFields = useSelector((state: RootState) => state.extraFields);

    const handleAddField = (type: FieldType) => {
        const newField: ExtraField = {
            id: Date.now().toString(), // simple unique ID generation
            type: type
        };
        dispatch(addField(newField));
    };

    return (
        <Box
            as="form"
            w="300px"
            p="20px"
            borderRight="1px solid #e2e8f0"
            overflowY="auto"
            onSubmit={handleSubmit(handleFormSubmit)}>

            <VStack spacing={4} align="stretch">
                {/* Title and Subtitle */}
                <FormFields register={register} />

                <Heading size="md">Field Requirements</Heading>
                <Checkbox
                    isChecked={isFirstNameRequired}
                    onChange={() => dispatch(toggleFirstNameRequired())}
                >
                    First Name is required
                </Checkbox>
                <Checkbox
                    isChecked={isLastNameRequired}
                    onChange={() => dispatch(toggleLastNameRequired())}
                >
                    Last Name is required
                </Checkbox>

                {/* Font Customization */}
                <Heading size="md">Font Customization</Heading>
                <FormControl>
                    <FormLabel>Font Size</FormLabel>
                    <Select
                        {...register("fontSize")}
                        value={fontSize}
                        onChange={(e) => dispatch(setFontSize(e.target.value))}
                        placeholder="Select font size"
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Font Color</FormLabel>
                    <Input
                        {...register("fontColor")}
                        type="color"
                        value={fontColor}
                        onChange={(e) => dispatch(setFontColor(e.target.value))}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Text Alignment</FormLabel>
                    <Select
                        {...register("textAlign")}
                        value={textAlign}
                        onChange={(e) => dispatch(setTextAlign(e.target.value))}
                        placeholder="Select alignment"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </Select>
                </FormControl>

                {/* Submit Button Customization */}
                <Heading size="md">Submit Button</Heading>
                <FormControl>
                    <FormLabel>Background Color</FormLabel>
                    <Input
                        {...register("backgroundColor")}
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => dispatch(setBackgroundColor(e.target.value))}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Button Text</FormLabel>
                    <Input
                        {...register("buttonText")}
                        value={buttonText}
                        onChange={(e) => dispatch(setText(e.target.value))}
                        placeholder="Enter button text"
                    />
                </FormControl>
                {/* Extra Fields Settings */}
                <Heading size="md">Extra Fields</Heading>
                <Stack spacing={3}>
                    <Button onClick={() => handleAddField('checkbox')}>Add Checkbox</Button>
                    <Button onClick={() => handleAddField('radio')}>Add Radio Button</Button>
                    <Button onClick={() => handleAddField('dropdown')}>Add Dropdown</Button>
                </Stack>

                {/* List of added extra fields */}
                {extraFields.map(field => (
                    <Box key={field.id} mt={4} p={4} borderWidth="1px" borderRadius="md">
                        <Field field={field} register={register} />
                        <Button mt={2} onClick={() => dispatch(removeField(field.id))}>Remove Field</Button>
                    </Box>
                ))}
            </VStack>
            <Button type="submit">Save</Button>

        </Box>
    );
};

export default Sidebar;
