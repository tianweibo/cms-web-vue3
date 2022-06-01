import Http from "@/services/axiosMerchants";
const addService = (params: Record<string, any>) => {
    return Http.post("/service/add", params);
};