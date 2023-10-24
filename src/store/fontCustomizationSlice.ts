import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontSize: 20,
  fontColor: '#000000',
  textAlign: 'left',
};

const fontCustomizationSlice = createSlice({
  name: 'fontCustomization',
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontColor: (state, action) => {
      state.fontColor = action.payload;
    },
    setTextAlign: (state, action) => {
      state.textAlign = action.payload;
    },
  },
});

export const { setFontSize, setFontColor, setTextAlign } = fontCustomizationSlice.actions;

export default fontCustomizationSlice.reducer;
