import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';
import { RootState } from '@/store/store';
import { setSubtitle, setTitle } from '@/store/titleSubtitleSlice';

const FormFields = () => {
 const dispatch = useDispatch();
 const title = useSelector((state: RootState) => state.titleSubtitle.title);
 const subtitle = useSelector((state: RootState) => state.titleSubtitle.subtitle);

 return (
  <div>
   <Heading size="md">Form Settings</Heading>
   <FormControl>
    <FormLabel>Title</FormLabel>
    <Input
     value={title}
     onChange={(e) => dispatch(setTitle(e.target.value))}
     placeholder="Enter title"
    />
   </FormControl>
   <FormControl>
    <FormLabel>Subtitle</FormLabel>
    <Input
     value={subtitle}
     onChange={(e) => dispatch(setSubtitle(e.target.value))}
     placeholder="Enter subtitle"
    />
   </FormControl>
  </div>
 );
};

export default FormFields;
