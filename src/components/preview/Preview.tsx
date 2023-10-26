
import { RootState } from '@/store/store';
import { Box, Heading, Text, Input, Button, VStack, Checkbox, RadioGroup, Radio, Select } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useUser } from "@clerk/nextjs";
import Typist from 'react-typist';

const Preview = () => {
  // Fetch state from Redux store
  const title = useSelector((state: RootState) => state.titleSubtitle.title);
  const subtitle = useSelector((state: RootState) => state.titleSubtitle.subtitle);
  const fontSize = useSelector((state: RootState) => state.fontCustomization.fontSize);
  const fontColor = useSelector((state: RootState) => state.fontCustomization.fontColor);
  const textAlign = useSelector((state: RootState) => state.fontCustomization.textAlign);
  const backgroundColor = useSelector((state: RootState) => state.submitButton.backgroundColor);
  const buttonText = useSelector((state: RootState) => state.submitButton.text);
  const isFirstNameRequired = useSelector((state: RootState) => state.requiredFields.firstName);
  const isLastNameRequired = useSelector((state: RootState) => state.requiredFields.lastName);
  const extraFields = useSelector((state: RootState) => state.extraFields);
  const { user } = useUser();

  return (
    <Box
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      width="100%"
      maxW="500px"
      position="absolute"
    // top="300px"
    >
      <VStack spacing={4} align="stretch">
        <Heading
          size="lg"
          fontSize={fontSize}
          color={fontColor}
          textAlign={textAlign as any}
        >
          {title}
        </Heading>
        <Text
          fontSize="md"
          color={fontColor}
          textAlign={textAlign as any}
        >
          {subtitle}
        </Text>
        <Input placeholder={`First Name${isFirstNameRequired ? ' *' : ''}`} required={isFirstNameRequired} />
        <Input placeholder={`Last Name${isLastNameRequired ? ' *' : ''}`} required={isLastNameRequired} />

        <Input placeholder="Email*" required />
        {/* Render Extra Fields */}
        {extraFields.map(field => {
          switch (field.type) {
            case 'checkbox':
              return (
                <Checkbox key={field.id} isRequired={field.required}>
                  {field.label}
                </Checkbox>
              );
            case 'radio':
              return (
                <RadioGroup key={field.id}>
                  <Text>{field.label}</Text>
                  {field.options?.map(option => (
                    <Radio value={option.value} key={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              );
            case 'dropdown':
              return (
                <Select key={field.id} placeholder={field.label}>
                  {field.options?.map(option => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              );
            default:
              return null;
          }
        })}

        <Button backgroundColor={backgroundColor} color="white">
          {buttonText}
        </Button>

      </VStack>
    </Box>
  );
};

export default Preview;
