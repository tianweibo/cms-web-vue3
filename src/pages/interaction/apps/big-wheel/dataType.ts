export interface FormActMess {
    name: string;            //活动名称
    actTime: any;        //活动时间，传给后端需要拆为 beginAt  endAt
    pic: string;             // 活动图片
    ruleType: number;        // 规则类型1:文本 2:图文
    ifDisplay: number;       // 推广方式 1:公开 2:自主
    ruleBaseMap: string;    // 规则底图
    ruleContent: string;         //规则内容
  }
export interface FormPriceMess {
    freeTimesPerDay: number;
    isFreeTimesPerDay: boolean;
    addTimesScore: number;
    isAddTimesScore: boolean;
    isPriceLimit: boolean;
    joinTimesPerDay: number;
    isJoinTimesPerDay: boolean;
    joinTimes: number;
    isJoinTimes: boolean;
    displayDays: number;
    isDisplayDays: boolean;
    isWinOptimize: boolean;
  }

export interface UserObject{
  key: string;
  level: string;
  mobile: string;
  nick: string;
  repMobile: string;
  repNick: string;
  }
  
export interface AwardObject{
      name: string;   //奖项名称
      giftAmount: number;  //库存
      rate: number;    //中奖概率
      pic: string;       //奖项图片
      level: number;
      type: number;     //奖品类型 奖品类型 0:谢谢参与 1:积分 2:礼品
      default: string;   // 是否是默认类型 0:不是 1:是
      giftId: number;          //传礼品id;
      score: number;
      giftAvailableAmount: number;
    giftRemainAmount: number;
    rewardId: number;
  }
export interface AwardDetailObject{
      name: string;   //奖项名称
      giftAmount: number;  //库存
      rate: number;    //中奖概率
      pic: string;       //奖项图片
      level: number;
      type: number;     //奖品类型 奖品类型 0:谢谢参与 1:积分 2:礼品
      default: string;   // 是否是默认类型 0:不是 1:是
      giftId: number;          //传礼品id;
      score: number;
      giftAvailableAmount: number;
      giftRemainAmount: number;
      rewardId: number;
  }
export interface AwardLevelObject {
    label: string;
    value: number;
  }
  export interface GiftTypeObj {
    cdkeyMode: number;
    createAt: string;
    id: number;
    issueMode: number;
    name: string;
    sys: number;
    typeCode: string;
  }
  export interface GiftObj {
    available: number;
    createAt: string;
    effectiveBegin: string;
    effectiveEnd: string;
    effectiveType: 0;
    id: number;
    invId: number;
    name: string;
    pictureUrl: string;
    showStatus: number;
    status: number;
    total: number;
    typeCode: string;
    typeId: number;
    typeName: string;
  }