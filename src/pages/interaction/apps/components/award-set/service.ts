import Http from "@/services/axios";
const getGiftList = (params: Record<string, any>) => {
    return Http.get(
      '/api/gifts/pageList',params
    )
  }
  
  // 礼品类型列表
   const getGiftTypeList = (params: Record<string, any>) => {
    return Http.get('/api/giftTypes/list',
      params
    )
  }
  
  const addService = (params: Record<string, any>) => {
      return Http.post("/service/add", params);
  };
  export {addService,getGiftList,getGiftTypeList}