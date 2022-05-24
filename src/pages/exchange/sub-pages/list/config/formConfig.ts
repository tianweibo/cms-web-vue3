import { LabelState } from "../types/index";
export const activeList: LabelState[] = [
  { value: "全部状态" },
  { value: "未发布" },
  { value: "未开始" },
  { value: "暂停" },
  { value: "进行中" },
  { value: "已兑完" },
  { value: "已结束" },
];
// enum来配合选中状态
export enum activeStates {
  "未发布" = 1,
  "未开始" = 2,
  "暂停" = 3,
  "进行中" = 4,
  "已兑完" = 5,
  "已结束" = 6,
}