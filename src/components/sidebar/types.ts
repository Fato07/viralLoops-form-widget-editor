import { ExtraField } from "@/types/ExtraField";

export type FormData = {
 title: string;
 subtitle: string;
 fontSize: 'small' | 'medium' | 'large';
 fontColor: string;
 textAlign: 'left' | 'center' | 'right';
 backgroundColor: string;
 buttonText: string;
 extraFields: ExtraField[];
};