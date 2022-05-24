export interface Data {
  pageName: string;
}

export interface ActParam {
  status: number | string;
  scenceId: number | string;
  id: number;
  name: string;
  pageNum: number;
  pageSize: number;
}
export interface Activity {
  id: number; // id
  name: string; // 活动名称
  beginAt: string; // 开始时间
  endAt: string; // 结束时间
  // scenceId?: number; // 互动类型id
  scenceType?: string; // 互动类型
  status: number; // 1-未发布 2-暂停 3-发布 4-结束
  joinCount: number; // 参与人数
  time: string;
}

export interface ActivityListRes {
  data: Array<Activity>;
  count: number;
}

// changeStatus
export interface ChangeStatusParams {
  actId: number;
  status: number;
}

// scenceList scence
export interface ScenceParams {
  pageNum: number;
  pageSize: number;
}

export interface Scence {
  scenceId: string;
  scenceName: string;
}

export interface ScenceListRes {
  data: Array<Scence>;
  count: number;
}

// 互动记录
export interface LogInfo {
  ouid: string;
  award: string;
  actName: string;
  createAt: string;
}
export interface HdLogsParams {
  id: number;
  awardType: number;
  beginAt: string;
  endAt: string;
  ouid: string;
  time: string;
  lastId: number;
  actId: number|string;
}
export interface HdLogsRes {
  data: Array<LogInfo>;
  totalCount: number;
}
export interface QrInfo {
  visible: boolean;
  link: string;
}
type KeyNumber = 3000000063246473
interface TemplateList {
  appId: string;
  url: string;
}
export interface TemplateInfo {
  KeyNumber: TemplateList;
}
export interface ExportParams {
  job: string;
  type: number;
  source: number;
  name: string;
  merchantNum: number;
}