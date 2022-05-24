import Http from "@/services/axiosMerchants";
const addService = (params: Record<string, any>) => {
    return Http.post("/service/add", params);
};
const addBigWheels=(params: Record<string, any>) => {
    return Http.post("/activity/addAct", params);
};
const detailBigWheels=(params: Record<string, any>)=>{
    return Http.get("/activity/detail",params)
}
const editBigWheels=(params: Record<string, any>)=>{
    return Http.post("/activity/updateAct",params)
}
export {addService,addBigWheels,detailBigWheels,editBigWheels}