import Http from "@/services/axios";
import MHttp from  "@/services/axiosMerchants";
import {
  ActParam,
  ActivityListRes,
  ScenceListRes,
  HdLogsRes,
  HdLogsParams,
  TemplateInfo,
  ExportParams
} from "@/pages/interaction/list/types";
import { IResponse } from "@/types/types";

export const getActs = (params: ActParam): Promise<IResponse<ActivityListRes>> => {
  return Http.get("/activity/getActs", params);
};

// /activity/changeStatus
export const changeStatus = (params: {
  actId: number;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<IResponse<any>> => {
  return Http.get("/activity/changeStatus", params);
};

// activity/hdLogs
export const hdLogs = (params: Partial<HdLogsParams>): Promise<IResponse<HdLogsRes>> => {
  return Http.get("/activity/getHdLog", params);
};

// /activity/scenceList
export const scenceList = (params: {
  pageNum: number;
  pageSize: number;
}): Promise<IResponse<ScenceListRes>> => {
  return Http.get("/activity/scenceList", params);
};
// 获取活动链接地址
export const getActLink = (params: string): Promise<IResponse<TemplateInfo>> => {
  return Http.get(`/applet/getUrl${params}`);
}
export const exportApi = (params: ExportParams): Promise<IResponse<null>> => {
  return MHttp.post("/api/offlineTasks/create", params );
};