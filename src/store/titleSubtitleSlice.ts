import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  subtitle: '',
};

const titleSubtitleSlice = createSlice({
  name: 'titleSubtitle',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setSubtitle: (state, action) => {
      state.subtitle = action.payload;
    },
  },
});

export const { setTitle, setSubtitle } = titleSubtitleSlice.actions;

export default titleSubtitleSlice.reducer;
