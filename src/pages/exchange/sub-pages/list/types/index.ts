import { VNodeChild } from 'vue'
export interface FormState {
  name: string;
  giftName: string;
  exchangeStatus: string | number;
}
export interface LabelState {
  value: string;
  label?: string;
}
export interface ChangeListParmas extends FormState {
  pageNo: number;
  pageSize: number;
}
export interface ExchangeActInfo {
  actId: number;
  beginTime: string;
  display: number;
  endTime: string;
  exchangeStatus: number;
  giftAmount: string;
  giftInventory: string;
  giftName: string;
  giftPic: string;  
  merchantName: string;
  name: string;
  top: number;
}
export interface ExchangeListRes {
  data: Array<ExchangeActInfo>;
  count: number;
}
export interface PaginationParams {
  total: number;
  pageSize: number;//每页中显示10条数据
  showSizeChanger: boolean;
  pageSizeOptions: string [];
  showTotal: Function;
  onChange: Function;
  onShowSizeChange: Function;
}

export interface MenuInfo {
  key: string;
  keyPath: string[];
  item: VNodeChild;
  domEvent: MouseEvent;
}
type KeyNumber = 3000000063246473
interface TemplateList {
  appId: string;
  url: string;
}
export interface TemplateInfo {
  KeyNumber: TemplateList;
}
export interface QrInfo {
  visible: boolean;
  link: string;
}
export interface AdjustStoreParams {
  num: number;
  type: number;
  actId: number;
}
export interface CardInfo {
  visible: boolean;
  title: string;
  num: number;
  type: number | string;
  actId: number;
  record: ExchangeActInfo;
}
export interface SetActStatusParams {
  actId: number;
  status: number;
}

export interface SetTopParams {
  top: number;
  actId: number;
}