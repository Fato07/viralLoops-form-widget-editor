import { z } from 'zod';

export const formSchema = z.object({
 title: z.string().min(1, { message: 'Title is required' }),
 subtitle: z.string(),
  fontSize: z.enum(['small', 'medium', 'large']),
  fontColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: 'Invalid color code' }),
  textAlign: z.enum(['left', 'center', 'right']),
  backgroundColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: 'Invalid color code' }),
  buttonText: z.string().min(1, { message: 'Button text is required' }),
  extraFields: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['checkbox', 'radio', 'dropdown']),
      label: z.string().min(1, { message: 'Label is required' }),
    })).optional(),
});
