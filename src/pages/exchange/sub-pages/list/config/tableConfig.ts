export const columns = [
  {
    title: "活动ID",
    dataIndex: "actId",
    key: "actId",
  },
  {
    title: "活动名称",
    dataIndex: "name",
    key: "name",
    slots: { customRender: "name" },
  },
  {
    title: "有效期",
    dataIndex: "validateTime",
    key: "validateTime",
    slots: { customRender: "validateTime" },
  },
  {
    title: "礼品名称",
    key: "giftName",
    dataIndex: "giftName",
  },
  {
    title: "剩余库存/总库存",
    key: "gitRM",
    dataIndex: "gitRM",
    slots: { customRender: "gitRM" },
  },
  {
    title: "来源店铺",
    dataIndex: "merchantName",
    key: "merchantName",
  },
  {
    title: "活动状态",
    dataIndex: "exchangeStatus",
    key: "exchangeStatus",
    slots: { customRender: "exchangeStatus" },
  },
  {
    title: "操作",
    dataIndex: "operator",
    key: "operator",
    align:'center',
    slots: { customRender: "operator" },
  },
];
export const record = {
  actId: 0,
  beginTime: '',
  display: 0,
  endTime: '',
  exchangeStatus: 0,
  giftAmount: '',
  giftInventory: '',
  giftName: '',
  giftPic: '',  
  merchantName: '',
  name: '',
  top: 0,
}
export const actStatus = {
  1: "#FAAD14",
  2: "#4A5AED",
  3: "#f4ea2a",
  4: "#52C41A",
  5: "#52C41A",
  6: "#D9D9D9",
};
export const actStates = {
  1: "未发布",
  2: "未开始",
  3: "暂停",
  4: "进行中",
  5: "已兑完",
  6: "已结束",
};