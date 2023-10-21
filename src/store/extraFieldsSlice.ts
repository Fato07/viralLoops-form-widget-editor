import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FieldType = 'checkbox' | 'radio' | 'dropdown';

interface FieldOption {
  label: string;
  value: string;
}

export interface ExtraField {
  id: string; // A unique identifier for each field
  type: FieldType;
  label?: string; // For checkbox
  options?: FieldOption[]; // For radio and dropdown
  required?: boolean;
}

const initialState: ExtraField[] = [];

const extraFieldsSlice = createSlice({
  name: 'extraFields',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<ExtraField>) => {
      if (state.length < 3) { // Ensure we don't add more than 3 fields
        state.push(action.payload);
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      return state.filter(field => field.id !== action.payload);
    },
    updateField: (state, action: PayloadAction<ExtraField>) => {
      const index = state.findIndex(field => field.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  },
});

export const { addField, removeField, updateField } = extraFieldsSlice.actions;

export default extraFieldsSlice.reducer;
