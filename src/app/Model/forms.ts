import { field } from "./field";

export interface forms {
  formid?: number;
  formname: string;
  description: string;
  versionnumber: number;
  fieldsList: field[];
  versionsList?: any[];
  flag?: number;

}




