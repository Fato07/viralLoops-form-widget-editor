import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: false,
  lastName: false,
};

const requiredFieldsSlice = createSlice({
  name: 'requiredFields',
  initialState,
  reducers: {
    toggleFirstNameRequired: (state) => {
      state.firstName = !state.firstName;
    },
    toggleLastNameRequired: (state) => {
      state.lastName = !state.lastName;
    },
  },
});

export const { toggleFirstNameRequired, toggleLastNameRequired } = requiredFieldsSlice.actions;

export default requiredFieldsSlice.reducer;
