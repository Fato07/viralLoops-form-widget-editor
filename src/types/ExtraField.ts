export type FieldType = 'checkbox' | 'radio' | 'dropdown';

export interface FieldOption {
  label: string;
  value: string;
}

export interface ExtraField {
  id: string; // A unique identifier for each field
  type: FieldType;
  label?: string; // For checkbox
  options?: FieldOption[]; // For radio and dropdown
  required: boolean;
}