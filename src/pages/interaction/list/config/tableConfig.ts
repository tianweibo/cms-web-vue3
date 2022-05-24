export const columns = [
  {
    title: "活动ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "活动名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "活动有效期",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "互动类型",
    dataIndex: "scenceType",
    key: "scenceType",
    slots: { customRender: "scenceType" },
  },
  {
    title: "参加人数",
    dataIndex: "joinCount",
    key: "joinCount",
  },
  {
    title: "活动状态",
    dataIndex: "status",
    key: "status",
    slots: { customRender: "status" },
  },
  {
    title: "操作",
    align:'center',
    dataIndex: "action",
    key: "action",
    slots: { customRender: "action" },
  },
]