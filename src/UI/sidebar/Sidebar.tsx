import { Box, Heading, VStack, FormControl, FormLabel, Input, Select, Button, Checkbox, Stack, useToast, Tooltip, Spinner, Flex } from '@chakra-ui/react';
import TitleSubtitleFields from '../TitleSubtitleFields/TitleSubtitleFields';
import FontCustomization from '../FontCustomization/FontCustomization';
import SubmitButtonCustomization from '../SubmitButtonCustomization/SubmitButtonCustomization';
import ExtraFieldsSettings from '../ExtraFieldsSettings/ExtraFieldsSettings';


const Sidebar = () => {
    return (
        <Flex direction="column" h="100vh">
            <Box
                as="form"
                w="300px"
                p="20px"
                borderRight="1px solid #e2e8f0"
                overflowY="auto"
                flex="1"
            >
                <VStack spacing={4} align="stretch">
                    <TitleSubtitleFields />
                    <FontCustomization />
                    <SubmitButtonCustomization />
                    <ExtraFieldsSettings />
                </VStack>
            </Box>
        </Flex>
    );
};

export default Sidebar;
