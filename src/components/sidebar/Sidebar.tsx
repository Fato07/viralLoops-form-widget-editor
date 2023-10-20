import { Box, Heading, VStack, FormControl, FormLabel, Input, Select, Button } from '@chakra-ui/react';
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

const StyledSidebar = styled(Box)`
    width: 300px;
    padding: 20px;
    border-right: 1px solid #e2e8f0;
`;

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
    };

    const dispatch = useDispatch();

    // State from Redux
    const title = useSelector((state: RootState) => state.titleSubtitle.title);
    const subtitle = useSelector((state: RootState) => state.titleSubtitle.subtitle);
    const fontSize = useSelector((state: RootState) => state.fontCustomization.fontSize);
    const fontColor = useSelector((state: RootState) => state.fontCustomization.fontColor);
    const textAlign = useSelector((state: RootState) => state.fontCustomization.textAlign);
    const backgroundColor = useSelector((state: RootState) => state.submitButton.backgroundColor);
    const buttonText = useSelector((state: RootState) => state.submitButton.text);

    return (
        <StyledSidebar as="form" onSubmit={handleSubmit(handleFormSubmit)}>

            <VStack spacing={4} align="stretch">
                {/* Title and Subtitle */}
                <Heading size="md">Form Settings</Heading>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        {...register("title")}
                        value={title}
                        onChange={(e) => dispatch(setTitle(e.target.value))}
                        placeholder="Enter title"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Subtitle</FormLabel>
                    <Input
                        {...register("subtitle")}
                        value={subtitle}
                        onChange={(e) => dispatch(setSubtitle(e.target.value))}
                        placeholder="Enter subtitle"
                    />
                </FormControl>

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
            </VStack>
            <Button type="submit">Save</Button>

        </StyledSidebar>
    );
};

export default Sidebar;
