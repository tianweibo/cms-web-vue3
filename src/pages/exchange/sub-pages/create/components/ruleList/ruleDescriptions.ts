export const descriptions = [
  {
    "metaName": "时间段内累计订单金额（付款成功）",
    "metaCode": "totalPaidOrderAmount",
    "totalPaidOrderAmount": {
      "title": "时间段内累计订单金额（付款成功）",
      "p1": "指特定某段时间内，累计付款成功的订单总笔数（按父订单笔数统计）。",
      "p2": "订单信息在订单量大特别是在大促期间可能会出现延迟或者漏单的情况，请谨慎设置兑换活动订单条件。 付款完成时间即对账完成时间。"
    }
  },
  {
    "metaName": "时间段内累计订单笔数（付款成功）",
    "metaCode": "paidOrderNum",
    "paidOrderNum": {
      "title": "时间段内累计订单笔数（付款成功）",
      "p1": "指特定某段时间内，累计付款成功的订单总金额（不含运费）。订单信息在订单量大特别是在大促期间可能会出现延迟或者漏单的情况，请谨慎设置兑换活动订单条件。",
      "p2": "付款完成时间即对账完成时间。为保证金额计算的准确性，金额计算以出库消息为准，在非延时执行条件下会影响部分条件执行时效。"
    }
  },
  {
    "metaName": "时间段内累计订单金额（交易成功）",
    "metaCode": "totalSuccessAmount",
    "totalSuccessAmount": {
      "title": "时间段内累计订单金额（交易成功）",
      "p1": "",
      "p2": ""
    }
  },
  {
    "metaName": "时间段内累计订单笔数（交易成功）",
    "metaCode": "successOrderNum",
    "successOrderNum": {
      "title": "时间段内累计订单笔数（交易成功）",
      "p1": "",
      "p2": ""
    }
  },
  {
    "metaName": "会员积分数",
    "metaCode": "memberPoint",
    "memberPoint": {
      "title": "会员积分数",
      "p1": "",
      "p2": ""
    }
  },
  {
    metaName: "会员等级",
    metaCode: "memberGrade",
    memberGrade: {
      title: "会员等级",
      p1: "指当前为某一等级的会员。",
      p2: ""
    }
  },
  {
    metaName: "会员标签",
    metaCode: "memberLabel",
    memberLabel: {
      title: "会员标签",
      p1: "",
      p2: ""
    }
  },
  {
    "metaName": "会员生日",
    "metaCode": "birthday",
    "birthday": {
      "title": "会员生日",
      "p1": "指在会员生日当月的第一笔订单。",
      "p2": ""
    }
  },
  {
    "metaName": "星座",
    "metaCode": "constellation",
    "constellation": {
      "title": "星座",
      "p1": "",
      "p2": ""
    }
  },
  {
    metaName: "会员所在省份",
    metaCode: "province",
    province: {
      title: "会员所在省份",
      p1: "指完善会员信息后会员所在省份。",
      p2: ""
    }
  }
];
