import {
  Moment
}
from 'moment' ;interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originFileObj?: any;
}
export interface TagLabel {
  tags: Array<string>;
  inputVisible: boolean;
  inputValue: string;
}
export interface BaseForm {
  name: string;
  actPic: Array<FileItem>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date: any [];
  actType: string;
  label: string;
  ruleText: string;
  ruleImg: Array<FileItem>;
  activeRules: string;
  display: number;
  tag: TagLabel;
}
export interface LimitType {
  type: string;
  id: number;
}
export interface SubGiftForm {
  everydayNum: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  everydayTime: string[] | any;
  inherit: string;
  limit: LimitType;
}
export interface GiftForm {
  available: number;
  exchangeControl: string;
  giftAmount: number;
  id: number;
  isShowPrice: string;
  name: string;
  pictureUrl: string;
  sub: SubGiftForm;
}
export interface Deduction {
  num: number;
  id: number;
}

// export interface RuleListSetChildren {

// }
export interface RuleListType {
  name?: string;
  _uid?: number;
  key: string;
  id: number | string;
  activeKey?: string;
  ruleType?: string;
  validateType?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any [];
}
export interface RuleListSetInfo {
  name?: string;
  _uid?: number;
  key: string;
  id: number | string;
  activeKey?: string;
  ruleType?: string;
  validateType?: string;
  points: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any [];
  ruleOrder: number;
}
export interface RulesInfo {
  checkedSet: boolean;
  checkedtop: boolean;
  deduction: Deduction;
  exhangeType: string;
  ruleList: RuleListType [];
  ruleListSet: RuleListSetInfo [];
}
export interface TxtBg {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  txtBg: any[] | string;
}
export interface RichTxt {
  richTxt: string;
  color: string;
}
export interface ActRule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bg: any[];
  imageObj: TxtBg;
  textObj: RichTxt;
  type: string;
}
export interface BgColorS {
  bg: string;
  color: string;
}
export interface ComfirmExchange {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bg: any[];
  bgInfo: string;
  cancelbtn: BgColorS;
  confirm: BgColorS;
}
export interface ExchangeSucc {
  backBtn: BgColorS;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bg: any[];
  bgInfo: string;
  common: BgColorS;
  detailBtn: BgColorS;
}
export interface ExchangeRecord {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bg: any[];
}
export interface ExchangePage {
  actRuleBtn: BgColorS;
  bgInfo: Array<FileItem>;
  exhangeBtn: BgColorS;
  recordBtn: BgColorS;
}
export interface DecorateInfo {
  comfirmExchange: ComfirmExchange;
  currentRule: string;
  exchangePage: ExchangePage;
  exchangeRecord: ExchangeRecord;
  exchangeSucc: ExchangeSucc;
  subRuleAtive: boolean;
  // 默认主题，
  theme: string;
  actRule: ActRule;
}
// // 完整数据
export interface FullData {
  baseForm: BaseForm;
  // 装修数据
  decorateInfo: DecorateInfo;
  giftInfo: GiftForm;
  rulesinfo: RulesInfo;
}
export interface DecodeScore {
  action: string;
  channel?: null|string;
  eventSwitch: string;
  eventType: string;
  id?: number;
  merchantNum?: null|string;
  note: string;
  params: string;
  platform: null;
  receiver: null;
  ruleId?: string;
  timestamp: number;
}
export interface RuleEventObj {
  appCode: string;
  condition: string;
  createTime: string;
  deadTime: string;
  deadTimestamp: number;
  effectiveTime: number;
  effectiveTimestamp: number;
  eventList: Array<DecodeScore> | string;
  id: number;
  merchantNum: string;
  note: string;
  ruleGroup: string;
  ruleName: string;
  ruleOrder: number;
  sceneCode: string;
  status: string;
}
export interface RuleEventList {
  eventList: Array<RuleEventObj>;
}
export interface ExchangeDetailReq {
  actId: number;
}
export interface ExchangeDetailRes {
  actId: number;
  actPic: string | Array<FileItem>;
  actType: number;
  beginTime: string;
  description: string;
  display: number;
  endTime: string;
  everydayNum: number|null;
  everydayTime: number;
  exchangeControl: number;
  giftAmount: string;
  giftId: number;
  giftName: string;
  giftPic: string;
  inherit: number;
  instConfigInfo: string;
  label: string;
  name: string;
  ruleCondition: string;
  ruleEvent: Array<RuleEventList> | string;
  ruleJson: string;
}
export interface RecordParams {
  accountType: number|string;
  accountValue: number|string;
  status: number|string;
  beginTime: number|string;
  endTime: number|string;
  pageNo: number|string;
  pageSize: number|string;
  actId: number|string;
}
export interface RecordData {
  accountValue: string;
  createAt: string;
  giftId: number;
  giftName: string;
  memberId: number;
  name: string;
  platformUserId: string;
}
export interface RecordList {
  count: number;
  data: Array<RecordData>;
  pageNo: string;
  pageSize: string;
}

export interface GiftTypeReq {
  pageSize: number;
  pageNo: number;
  name: string;
 
}
// 礼品类型
export interface GiftItem {
  cdkeyMode: string;
  createAt: string;
  id: number;
  issueMode: number;
  name: string;
  sys: number;
  typeCode: string;
}
export interface GiftListRes {
  data: Array<GiftItem>
  pageNo: number;
  pageSize: number;
  totalCount: number;
}
// 礼品列表
export interface GiftReq {
  pageSize: number;
  pageNo: number;
  status: number;
}
export interface GiftListItem {
  available: number;
  createAt: string;
  effectiveBegin: string;
  effectiveEnd: string;
  effectiveType: number;
  id: number;
  invId: number;
  name: string;
  pictureUrl: string;
  showStatus: number;
  status: number;
  total: number;
  typeCode: string;
  typeId: number;
  typeName: string;
}
// 礼品列表
export interface GiftRes {
  data: Array<GiftListItem>
  pageNo: number;
  pageSize: number;
  totalCount: number;
}
export interface RuleMap {
  metaCode: string;
  metaName: string;
  metaType: string;
  note: string;
  sceneCode: string;
  status: string;
}