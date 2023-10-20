import { configureStore } from '@reduxjs/toolkit';
import titleSubtitleReducer from './titleSubtitleSlice';
import fontCustomizationReducer from './fontCustomizationSlice';
import submitButtonReducer from './submitButtonSlice';

const store = configureStore({
  reducer: {
    titleSubtitle: titleSubtitleReducer,
    fontCustomization: fontCustomizationReducer,
    submitButton: submitButtonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
