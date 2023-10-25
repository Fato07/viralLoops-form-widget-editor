import { saveWidgetSettings } from '@/service/apiService';
import { RootState } from '@/store/store';
import { Box, Button, Spinner, Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {

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
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    const data = {
      fields: {
        title: title,
        subtitle: subtitle,
        firstName: {
          isRequired: isFirstNameRequired
        },
        lastName: {
          isRequired: isLastNameRequired
        },
      },
      fontSettings: {
        fontSize: fontSize,
        fontColor: fontColor,
        textAlign: textAlign,
      },
      submitButton: {
        backgroundColor: backgroundColor,
        text: buttonText
      },
      extraFields
    }

    setIsLoading(true);
    console.log('data', data)

    saveWidgetSettings(data)
      .then((res) => {
        toast({
          title: "Success",
          description: "Data saved successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error saving data:', error.message);
        toast({
          title: "Error",
          description: "An error occurred while saving. Please try again.",
          status: "error",
          // duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      }).then(() => {

        // Event Based to trigger the serverless function to process and generate the HTML
        // The serverless fucntion acts as our background worker
        axios.get('/api/processWidget').then((res) => {
          console.log('res', res.data);
          toast({
            title: "Success",
            description: `Widget ${res.data.data.widgetSettingsId} generated successfully`,
            isClosable: true,
          });
        });
      });
  }

  return (
    <Box
      as="footer"
      mt="auto"
      p="4"
      borderTop="1px solid #e2e8f0"
      zIndex="10"
      bg="white"
      width="100%"
    >
      <Tooltip label="Save your settings" aria-label="Save tooltip">
        <Button
          float={'right'}
          width={'100px'}
          isLoading={isLoading}
          loadingText="Saving..."
          leftIcon={isLoading ? <Spinner size="xs" /> : undefined}
          aria-label="Save Settings"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Tooltip>
    </Box>
  );
}
export default Footer;
