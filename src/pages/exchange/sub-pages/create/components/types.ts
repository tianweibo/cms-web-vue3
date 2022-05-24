// import { Moment } from 'moment';
export interface FormState {
  name: string;
  actPic: any[] | undefined;
  date: any[];
  actType: string| undefined | number;
  label: string| undefined;
  ruleText: string| undefined;
  ruleImg: any [];
  activeRules: string;
  tag: any;
  display: number;
}
export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
}

export interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
