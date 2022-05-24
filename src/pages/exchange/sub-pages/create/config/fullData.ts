export const baseFormInfo = {
  name: "",
  actPic: [],
  date: [],
  actType: "",
  label: "",
  ruleText: "",
  ruleImg: [],
  activeRules: '1',
  display: 1,
  tag: {
    tags: [],
    inputVisible: false,
    inputValue: ""
  }
}
export const baseGiftInfo = {
  available: 0,
  exchangeControl: "0",
  giftAmount: 0,
  id: 0,
  isShowPrice: "1",
  name: "",
  pictureUrl: "",
  sub: {
    everydayNum: 0,
    everydayTime: [],
    inherit: "1",
    limit: {
      id: 0,
      type: "1"
    }
  }
}
export const baseRulesInfo = {
  exhangeType: '1',
  // 设置参与门槛
  checkedtop: false,
  // 参与门槛规则设置
  ruleList: [],
  // 设置对减门槛
  checkedSet: false,
  // 减分扣减设置
  ruleListSet: [],
  deduction: {
    num: 0,
    id: 0
  }
}
export const baseDecorateInfo = {
  currentRule: '1',
  subRuleAtive: false,
  // 默认主题，
  theme: '2',
  // 兑换页面信息
  exchangePage: {
    bgInfo: [],
    actRuleBtn: {
      bg: '#000000 50%',
      color: '#fff'
    },
    exhangeBtn: {
      bg: '#FF623E',
      color: '#fff'
    },
    recordBtn: {
      bg: '#000000 50%',
      color: '#fff'
    }
  },
  // 活动规则页信息
  actRule: {
    type: '1',
    bg: [],
    textObj: {
      richTxt: '',
      color: '#000'
    },
    imageObj: {
      txtBg: []
    }
  },
  exchangeRecord: {
    bg: []
  },
  comfirmExchange: {
    cancelbtn: {
      bg: "",
      color: "#fff"
    },
    confirm: {
      bg: "#FF623E",
      color: "#fff"
    },
    bg: [],
    bgInfo: 'linear-gradient(180deg, #FFFFFF 0%, #FFE8E8 100%)'
  },
  exchangeSucc: {
    bg: [],
    detailBtn: {
      bg: '',
      color: '#ff623e'
    },
    backBtn: {
      bg: '#ff623e',
      color: '#fff'
    },
    common: {
      bg: '',
      color: '#333333'
    },
    bgInfo: 'linear-gradient(180deg, #ffffff 0%, #ffe8e8 100%)'
  }
}
