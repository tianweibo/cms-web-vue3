import Http from "@/services/axios";
import MHttp from  "@/services/axiosMerchants";
import { ExchangeDetailRes,  GiftListRes , GiftRes, GiftReq,  GiftTypeReq } from  '@/pages/exchange/sub-pages/create/types/index'
import { IResponse } from "@/types/types";
// 创建兑换果冻
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addExchangeAct = (params: ExchangeDetailRes): Promise<IResponse<any>> => {
  return Http.post("/exchange/addAct", params);
}
// 编辑兑换 /exchange/getAct 编辑兑换
export const getExchangeAct = (params: {actId: number}): Promise<IResponse<ExchangeDetailRes>> => {
  return Http.get("/exchange/getAct", params);
}
// 礼品查询
export const getGiftList = (params: GiftReq):  Promise<IResponse<GiftRes>> => {
  return MHttp.get('/api/gifts/pageList', params)
}

// 礼品类型列表
export const getGiftTypeList = (params: GiftTypeReq): Promise<IResponse<GiftListRes>> => {
  return MHttp.get("/api/giftTypes/list", params);
};

// 获取字典
export const getRuleMap = () => {
  return Http.get("/exchange/getRules");
};
