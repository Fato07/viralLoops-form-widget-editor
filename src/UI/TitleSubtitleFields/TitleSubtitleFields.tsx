import { FormControl, FormLabel, Input, Checkbox } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setTitle, setSubtitle } from '../../store/titleSubtitleSlice';
import { toggleFirstNameRequired, toggleLastNameRequired } from '@/store/requiredFieldsSlice';

const TitleSubtitleFields = ({ register }) => {
 const dispatch = useDispatch();

 // Redux state
 const title = useSelector((state: RootState) => state.titleSubtitle.title);
 const subtitle = useSelector((state: RootState) => state.titleSubtitle.subtitle);
 const isFirstNameRequired = useSelector((state: RootState) => state.requiredFields.firstName);
 const isLastNameRequired = useSelector((state: RootState) => state.requiredFields.lastName);

 return (
  <>
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
  </>
 );
};

export default TitleSubtitleFields;
