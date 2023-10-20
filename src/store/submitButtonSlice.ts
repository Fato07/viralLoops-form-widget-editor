import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backgroundColor: '#3182CE',
  text: 'Submit',
};

const submitButtonSlice = createSlice({
  name: 'submitButton',
  initialState,
  reducers: {
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setBackgroundColor, setText } = submitButtonSlice.actions;

export default submitButtonSlice.reducer;
