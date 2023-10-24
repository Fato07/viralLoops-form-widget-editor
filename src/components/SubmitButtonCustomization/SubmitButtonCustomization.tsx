import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setBackgroundColor, setText } from '../../store/submitButtonSlice';

const SubmitButtonCustomization = () => {
 const dispatch = useDispatch();

 // Redux state
 const backgroundColor = useSelector((state: RootState) => state.submitButton.backgroundColor);
 const buttonText = useSelector((state: RootState) => state.submitButton.text);

 return (
  <>
   <FormControl>
    <FormLabel>Background Color</FormLabel>
    <Input
     type="color"
     value={backgroundColor}
     onChange={(e) => dispatch(setBackgroundColor(e.target.value))}
    />
   </FormControl>
   <FormControl>
    <FormLabel>Button Text</FormLabel>
    <Input
     value={buttonText}
     onChange={(e) => dispatch(setText(e.target.value))}
     placeholder="Enter button text"
    />
   </FormControl>
  </>
 );
};

export default SubmitButtonCustomization;
