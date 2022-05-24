import Http from "@/services/axios";

import { ChangeListParmas, ExchangeListRes, TemplateInfo, AdjustStoreParams, SetActStatusParams, SetTopParams } from '@/pages/exchange/sub-pages/list/types/index'
import { ExchangeDetailRes, ExchangeDetailReq,RecordList, RecordParams } from  '@/pages/exchange/sub-pages/create/types/index'
import { IResponse } from "@/types/types";
// 查询兑换列表
export const getExchangeList = (params: ChangeListParmas): Promise<IResponse<ExchangeListRes>> => {
  return Http.get("/exchange/getActs", params);
};
// 编辑兑换 /exchange/getAct 编辑兑换
export const getExchangeAct = (params: ExchangeDetailReq): Promise<IResponse<ExchangeDetailRes>> => {
  return Http.get("/exchange/getAct", params);
}
// 获取活动链接
export const getAppletUrl = (params: string): Promise<IResponse<TemplateInfo>> => {
  return Http.get(`/applet/getUrl${params}`);
}
// 修改库存
export const updateStockData = (params: AdjustStoreParams): Promise<IResponse<string []>> => {
  return Http.post("/exchange/updateStock", params);
};
// 修改活动状态
export const updateActStatus = (params: SetActStatusParams): Promise<IResponse<string []>> => {
  return Http.post("/exchange/updateStatus", params);
};
// 设置兑换列表顶事exchange/setTop
export const setTop = (params: SetTopParams): Promise<IResponse<string []>> => {
  return Http.post("/exchange/setTop", params);
};
// 查询兑换记录
export const getExchangeRecordList = (params: RecordParams): Promise<IResponse<RecordList>> => {
  return Http.get("/exchange/getExchangeLogs", params);
};
