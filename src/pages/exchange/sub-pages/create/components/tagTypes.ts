import { Moment } from 'moment';
interface ExtType {
  params: TagDataType | undefined;
  type?: string | number;
  value?: number;
}
interface Params {
  key: string;
  operator?: string | undefined;
  value: number;
  ext?: ExtType;
}
export interface TagDataType {
  // 必有
  tagType: string;
  type?: number | string;
  // 可能没有
  time?: Moment[];
  amount?: number;
  endStime?: string;
  gapTime?: string | number;
  gapType?: string | number;
  number?: number;
  number1?: number;
  number2?: number;
  params?: Params;
  operator?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  value?: any;
  formRef?: Function;
}
