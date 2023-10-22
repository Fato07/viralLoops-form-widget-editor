import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setFontSize, setFontColor, setTextAlign } from '../../store/fontCustomizationSlice';

const FontCustomization = ({ register }) => {
 const dispatch = useDispatch();

 // Redux state
 const fontSize = useSelector((state: RootState) => state.fontCustomization.fontSize);
 const fontColor = useSelector((state: RootState) => state.fontCustomization.fontColor);
 const textAlign = useSelector((state: RootState) => state.fontCustomization.textAlign);

 return (
  <>
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
  </>
 );
};

export default FontCustomization;
