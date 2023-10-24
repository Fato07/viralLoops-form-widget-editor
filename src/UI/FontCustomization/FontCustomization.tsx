import {
 FormControl, FormLabel, Input, Slider, SliderTrack, SliderFilledTrack,
 SliderThumb, HStack, IconButton, Tooltip, Box
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setFontSize, setFontColor, setTextAlign } from '../../store/fontCustomizationSlice';
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';

const FontCustomization = () => {
 const dispatch = useDispatch();

 const fontSize = useSelector((state: RootState) => state.fontCustomization.fontSize);
 const fontColor = useSelector((state: RootState) => state.fontCustomization.fontColor);
 const textAlign = useSelector((state: RootState) => state.fontCustomization.textAlign);

 return (
  <>
   <FormControl mb="2">
    <FormLabel>Font Size</FormLabel>
    <Slider
     min={10}
     max={30}
     value={fontSize}
     onChange={(val) => dispatch(setFontSize(val))}>
     <SliderTrack>
      <SliderFilledTrack />
     </SliderTrack>
     <SliderThumb boxSize={6}>
      <Box color="gray.600" fontWeight="bold">{fontSize}</Box>
     </SliderThumb>
    </Slider>
   </FormControl>

   <FormControl mb="2">
    <FormLabel>Font Color</FormLabel>
    <Input
     type="color"
     value={fontColor}
     onChange={(e) => dispatch(setFontColor(e.target.value))}
    />
   </FormControl>

   <FormControl mb="2">
    <FormLabel>Text Alignment</FormLabel>
    <HStack spacing="2">
     <Tooltip label="Align left">
      <IconButton
       aria-label="Align left"
       icon={<FaAlignLeft />}
       variant={textAlign === 'left' ? 'solid' : 'outline'}
       onClick={() => dispatch(setTextAlign('left'))}
      />
     </Tooltip>
     <Tooltip label="Align center">
      <IconButton
       aria-label="Align center"
       icon={<FaAlignCenter />}
       variant={textAlign === 'center' ? 'solid' : 'outline'}
       onClick={() => dispatch(setTextAlign('center'))}
      />
     </Tooltip>
     <Tooltip label="Align right">
      <IconButton
       aria-label="Align right"
       icon={<FaAlignRight />}
       variant={textAlign === 'right' ? 'solid' : 'outline'}
       onClick={() => dispatch(setTextAlign('right'))}
      />
     </Tooltip>
    </HStack>
   </FormControl>
  </>
 );
};

export default FontCustomization;
