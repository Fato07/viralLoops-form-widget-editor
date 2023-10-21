import { configureStore } from '@reduxjs/toolkit';
import titleSubtitleReducer from './titleSubtitleSlice';
import fontCustomizationReducer from './fontCustomizationSlice';
import submitButtonReducer from './submitButtonSlice';
import requiredFieldsReducer from './requiredFieldsSlice';
import extraFieldsReducer from './extraFieldsSlice';

const store = configureStore({
  reducer: {
    titleSubtitle: titleSubtitleReducer,
    requiredFields: requiredFieldsReducer,
    fontCustomization: fontCustomizationReducer,
    submitButton: submitButtonReducer,
    extraFields: extraFieldsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
