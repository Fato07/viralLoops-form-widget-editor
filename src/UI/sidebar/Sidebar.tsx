import { Box, Heading, VStack, FormControl, FormLabel, Input, Select, Button, Checkbox, Stack } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/zodSchemas/formSchema';
import { FormData } from './types';
import { saveWidgetSettings } from '@/service/apiService';
import TitleSubtitleFields from '../TitleSubtitleFields/TitleSubtitleFields';
import FontCustomization from '../FontCustomization/FontCustomization';
import SubmitButtonCustomization from '../SubmitButtonCustomization/SubmitButtonCustomization';
import ExtraFieldsSettings from '../ExtraFieldsSettings/ExtraFieldsSettings';

const Sidebar = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const extraFields = useSelector((state: RootState) => state.extraFields);

    const handleFormSubmit = (data: FormData) => {
        const restructuredData = {
            fields: {
                title: data.title,
                subtitle: data.subtitle
            },
            fontSettings: {
                fontSize: data.fontSize,
                fontColor: data.fontColor,
                textAlign: data.textAlign
            },
            submitButton: {
                backgroundColor: data.backgroundColor,
                text: data.buttonText
            },
            extraFields: extraFields
        };

        saveWidgetSettings(restructuredData)
            .then((res) => {
                console.log('Data saved successfully:', res);
            })
            .catch(error => {
                console.log('Error saving data:', error.message);
            });

    };

    return (
        <Box as="form" w="300px" p="20px" borderRight="1px solid #e2e8f0" overflowY="auto" onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4} align="stretch">
                <TitleSubtitleFields register={register} />
                <FontCustomization register={register} />
                <SubmitButtonCustomization register={register} />
                <ExtraFieldsSettings />
            </VStack>
            <Button type="submit">Save</Button>
        </Box>
    );
};

export default Sidebar;
