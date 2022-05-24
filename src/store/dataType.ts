import { mapValues, without, pick } from "lodash-es";
export interface LcommonProps {
  width: string;
  height: string;
  top: string;
  left: string;
  display: string;
  position: string;
  zIndex: number;
}
export interface LBackImg {
  backgroundImage: string;
  backgroundImageDefault: string;
  width: string;
  height: string;
  size: string;
  space: number;
  //background: string;
}
export interface LRotaryTable extends LcommonProps {
  src: string;
  srcDefault: string;
  boxShadow: string;
  borderRadius: string;
  size: string;
  space: number;
}
export const titleTiger: LRotaryTable = {
  width: "270px",
  height: "80px",
  size:'270*80',
  space:0.5,
  top: "-140px",
  left: "15px",
  display: "block",
  position: "absolute",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/968c157ca7bdbb8916f254b43ef1312e.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/968c157ca7bdbb8916f254b43ef1312e.png",
  boxShadow: "",
  borderRadius: "",
  zIndex: 8
}; 
export const titleNoTiger: LRotaryTable = {
  width: "270px",
  height: "80px",
  size:'270*80',
  space:0.5,
  top: "60px",
  left: "55px",
  display: "block",
  position: "absolute",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/e7e9e6f6f58eb55d8735370d5cdef5d7.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/e7e9e6f6f58eb55d8735370d5cdef5d7.png",
  boxShadow: "",
  borderRadius: "",
  zIndex: 8
}; 
export const rotaryTable: LRotaryTable = {
  width: "340px",
  height: "340px",
  size:'340*340',
  space:0.5,
  top: "175px",
  left: "15px",
  display: "block",
  position: "absolute",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/f8886722f724a6f9d8f8e58adf22f251.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/f8886722f724a6f9d8f8e58adf22f251.png",
  boxShadow: "",
  borderRadius: "",
  zIndex: 8
}; 
export const rotaryTableTiger: LRotaryTable = {
  width: "260px",
  height: "260px",
  size:'260*260',
  space:0.5,
  top: "30px",
  left: "30px",
  display: "block",
  position: "absolute",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/79ccca303b4bdbacf2c6406ca6687734.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/79ccca303b4bdbacf2c6406ca6687734.png",
  boxShadow: "",
  borderRadius: "",
  zIndex: 8
};
export const rotaryTableStylePropNames = without(
  Object.keys(rotaryTable),
  "position",
  "top",
  "left"
);
export const backImg: LBackImg = {
  width: "380px",
  height: "640px",
  size:'280*640',
  space:1,
  //background:'#666',
  backgroundImageDefault: "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/93c2c5c246c4cd37f15b7c0fd581c99b.png)",
  backgroundImage:
    "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/93c2c5c246c4cd37f15b7c0fd581c99b.png)"
};
export const backImgTiger: LBackImg = {
  width: "380px",
  height: "640px",
  size:'380*640',
  space:1,
  //background:'#666',
  backgroundImageDefault: "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/32bf2e5690a7c1bdbcbfceab18b1b845.png)",
  backgroundImage:
    "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/32bf2e5690a7c1bdbcbfceab18b1b845.png)"
};
export const backStylePropNames = without(Object.keys(backImg));
//export const textStylePropNames = without(Object.keys(backImg), 'position', 'top', 'left','width', 'height')
export interface LRegurContent extends LcommonProps {
  src: string;
  srcDefault: string;
  richText: string;
  backgroundImage: string;
  backgroundImageDefault: string;
  overflowX: string;
  overflowY: string;
  color: string;
  fontSize: string;
  regularText: string;
  ruleType: string;
}
export const regurContent: LRegurContent = {
  width: "290px",
  height: "360px",
  top: "70px",
  left: "10px",
  display: "block",
  overflowY: "auto",
  zIndex: 9,

  //src:'http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/88c7d4e8ab0f380dd7bd8184e604b4d0.png',
  src: "",
  srcDefault:"",
  ruleType:'1',
  richText:
    '<ol><li><span style="color: red;">1111</span>1<strong>222</strong></li><li><span style="color: rgb(255, 255, 0);">3</span><span style="color: rgb(0, 102, 204);">333</span></li><li><span style="color: rgb(0, 102, 204);">33333333</span></li></ol><p><span style="color: rgb(0, 102, 204);">22222222222</span></p>',
  position: "absolute",
  backgroundImage:
    "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/ccc9ab079680531b89f3c495fdc6ba4a.png)",
  backgroundImageDefault:
    "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/ccc9ab079680531b89f3c495fdc6ba4a.png)",
  overflowX: "hidden",
  regularText: "游戏规则",
  color: "red",
  fontSize: "10px"
};
export const regularStylePropNames = without(
  Object.keys(regurContent),
  //"position",
  //"top",
  //"left",
  "backgroundImage",
  "regularText",
  "color"
);
export interface LArrayContent extends LcommonProps {
  src: string;
  srcDefault: string;
  zIndex: number;
  size: string;
  space: number;
}
export const arrayContent: LArrayContent = {
  width: "92px",
  height: "105px",
  top: "295px",
  size:'92*105',
  space:0.3,
  left: "138px",
  display: "block",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/6ae25c6a4c06a0bc048fcff10374ef81.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/6ae25c6a4c06a0bc048fcff10374ef81.png",
  position: "absolute",
  zIndex: 9
};
export const arrayContentTiger: LArrayContent = {
  width: "92px",
  height: "105px",
  size:'92*105',
  space:0.3,
  top: "100px",
  left: "113px",
  display: "block",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/d96a15ee33aa0ea1528cc39a6c6228b3.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/d96a15ee33aa0ea1528cc39a6c6228b3.png",
  position: "absolute",
  zIndex: 9
};
export const tigerContent: LArrayContent = {
  width: "330px",
  size:'92*105',
  space:0.3,
  height: "450px",
  top: "170px",
  left: "25px",
  display: "block",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/44c2f7f9d77fff15b4800f137e563fa5.png",
  srcDefault:"http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/44c2f7f9d77fff15b4800f137e563fa5.png",
  position: "absolute",
  zIndex: 3
};
export interface LNumberBox extends LcommonProps {
  fontSize: string;
  color: string;
  text: string;
  textAlign: string;
}
export const numberBox: LNumberBox = {
  width: "60px",
  height: "20px",
  top: "348px",
  left: "153px",
  display: "block",
  fontSize: "10px",
  color: "#fff",
  text: "剩余10次",
  position: "absolute",
  zIndex: 9999,
  textAlign:'center'
};
export const numberBoxTiger: LNumberBox = {
  width: "60px",
  height: "20px",
  top: "168px",
  left: "130px",
  display: "block",
  fontSize: "10px",
  color: "#fff",
  text: "剩余10次",
  position: "absolute",
  zIndex: 9,
  textAlign:'center'
};
export const regularText = {
  width: "100px",
  height: "44px",
  top: "50px",
  left: "60px",
  display: "block",
  fontSize: "20px",
  color: "green",
  text: "活动规则",
  position: "absolute"
};
export interface LTimeContent extends LcommonProps {
  fontSize: string;
  color: string;
  text: string;
  textAlign: string;
}
export const timeContent: LTimeContent = {
  width: "230px",
  height: "20px",
  top: "520px",
  left: "73px",
  display: "block",
  fontSize: "10px",
  color: "#fff",
  text: "活动截止于2022-12-12 59:59:59",
  position: "absolute",
  zIndex: 9,
  textAlign:'center'
};
export const timeContentTiger: LTimeContent = {
  width: "230px",
  height: "20px",
  top: "330px",
  left: "45px",
  display: "block",
  fontSize: "10px",
  color: "#fff",
  text: "活动截止于2022-12-12 59:59:59",
  position: "absolute",
  zIndex: 9,
  textAlign:'center'
};
export const textStylePropNames = without(Object.keys(timeContent), "position", "top", "left");
export interface LRouselContent extends LTimeContent {
  time: number;
  border: string;
  padding: string;
  borderRadius: string;
  backgroundColor: string;
  lineHeight: string;
}
export const rouselContentTiger: LRouselContent = {
  width: "280px",
  height: "26px",
  top: "-40px",
  left: "30px",
  display: "block",
  fontSize: "12px",
  padding: "0px",
  color: "#fff",
  text: "恭喜某某获取到一等奖,恭喜某某获取到二等奖",
  position: "absolute",
  time: 3000,
  border: "0px solid #444",
  borderRadius: "50px",
  backgroundColor: "rgba(0,0,0,0.3)",
  lineHeight: "26px",
  zIndex: 9,
  textAlign:'center'
};
export const rouselContent: LRouselContent = {
  width: "280px",
  height: "26px",
  top: "160px",
  left: "43px",
  display: "block",
  fontSize: "12px",
  padding: "0px",
  color: "#fff",
  text: "恭喜某某获取到一等奖,恭喜某某获取到二等奖",
  position: "absolute",
  time: 3000,
  border: "0px solid #444",
  borderRadius: "50px",
  backgroundColor: "rgba(0,0,0,0.3)",
  lineHeight: "26px",
  zIndex: 9,
  textAlign:'center'
};
export const rouselStylePropNames = without(Object.keys(rouselContent), "position", "top", "left");
export const imageStylePropNames = without(
  Object.keys(rouselContent),
  "width",
  "top",
  "height",
  "left",
  "border",
  "fontSize",
  "backgroundColor",
  "borderRadius",
  "padding"
);
export interface LBtnContent extends LcommonProps {
  fontSize: string;
  color: string;
  text: string;
  backgroundImage: string;
  backgroundImageDefault: string;
  backgroundColor: string;
  lineHeight: string;
  // border type
  //borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  type: string;
  //opacity: string;
}
export const btnContent1: LBtnContent = {
  width: "148px",
  height: "32px",
  lineHeight: "32px",
  top: "560px",
  left: "30px",
  type: "1",
  display: "block",
  fontSize: "10px",
  color: "red",
  text: "",
  zIndex: 9,
  backgroundColor: "#666",
  backgroundImage:
    "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/31c4e545db6030b7f25ecff6e067ab91.png)",
  backgroundImageDefault:
  "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/31c4e545db6030b7f25ecff6e067ab91.png)",
  position: "absolute",
  borderColor: "#444",
  borderWidth: "2px",
  borderRadius: "6px",
  boxShadow: "#666 5px 5px 2px"
};
export const btnContent2: LBtnContent = {
  width: "148px",
  type: "1",
  height: "32px",
  lineHeight: "32px",
  top: "560px",
  left: "185px",
  display: "block",
  fontSize: "10px",
  color: "yellow",
  text: "按钮2",
  zIndex: 9,
  backgroundImage: "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/f12a60b9f91191d02533f41332fd852f.png)",
  backgroundImageDefault:'url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/f12a60b9f91191d02533f41332fd852f.png)',
  backgroundColor: "#999",
  position: "absolute",
  borderColor: "red",
  borderWidth: "2px",
  borderRadius: "2px",
  boxShadow: "#777 5px 5px 2px"
};
export const btnContent1Tiger: LBtnContent = {
  width: "100px",
  height: "34px",
  lineHeight: "34px",
  top: "360px",
  left: "40px",
  type: "1",
  display: "block",
  fontSize: "10px",
  color: "red",
  text: "",
  zIndex: 9,
  backgroundColor: "#666",
  backgroundImage:
    "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/7b5852af6d90ec8e95b98ac3f5e6a013.png)",
  backgroundImageDefault:
    "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/7b5852af6d90ec8e95b98ac3f5e6a013.png)",
  position: "absolute",
  borderColor: "#444",
  borderWidth: "2px",
  borderRadius: "6px",
  boxShadow: "#666 5px 5px 2px"
};
export const btnContent2Tiger: LBtnContent = {
  width: "100px",
  type: "1",
  height: "34px",
  lineHeight: "34px",
  top: "360px",
  left: "185px",
  display: "block",
  fontSize: "10px",
  color: "yellow",
  text: "按钮2",
  zIndex: 9,
  backgroundImage: "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/1f4f08d8e78a77a48c84102b9236301c.png)",
  backgroundImageDefault: "url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/1f4f08d8e78a77a48c84102b9236301c.png)",
  backgroundColor: "#999",
  position: "absolute",
  borderColor: "red",
  borderWidth: "2px",
  borderRadius: "2px",
  boxShadow: "#777 5px 5px 2px"
};
export const btnStylePropNamesImg = without(Object.keys(btnContent1),'boxShadow','borderRadius','borderWidth','borderColor','backgroundColor', "position", "top", "left");
export const btnStylePropNamesText = without(Object.keys(btnContent1),'backgroundImage', "position", "top", "left");
export const dialogContent1 = {
  text: "恭喜您!抽中了一等奖",
  textFontsize: "22px",
  textColor: "#bb4014",
  text1: "实物奖",
  text1Fontsize: "16px",
  text1Color: "#af7a70",

  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/112a97cdeaf6c3d7abde0c180090b490.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/112a97cdeaf6c3d7abde0c180090b490.png",
  fontSize: "10px",
  background: "#ccc",
  backgroundImage:'url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/86f8d4f687fe84b60dead7f80b0f71da.png)',
  backgroundImageDefault:'url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/86f8d4f687fe84b60dead7f80b0f71da.png)',
  color: "#eee",
  width: "140px",
  height: "80px",
  format:2,
  type: 1,
  btnText: "立即领取"
};
export const dialogContent2 = {
  text: "恭喜你抽中了二等奖",
  textFontsize: "22px",
  textColor: "#bb4014",
  text1: "积分奖",
  text1Fontsize: "16px",
  text1Color: "#af7a70",
  fontSize: "10px",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/0195e69902726cd11714a5bd1782a735.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/0195e69902726cd11714a5bd1782a735.png",
  color: "#bb4014",
  width: "",
  height: "",
  type: 0,
  format:1,
  btnText: "已发放至您的账号，请注意查收"
};
export const dialogContent3 = {
  text: "很遗憾，您未中奖",
  textFontsize: "22px",
  textColor: "#bb4014",
  text1: "",
  text1Fontsize: "10px",
  text1Color: "#bb4014",
  fontSize: "10px",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/0ea121abf6f94ac22e1fa629670ff9bd.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/0ea121abf6f94ac22e1fa629670ff9bd.png",
  color: "#bb4014",
  type: 0,
  format:0,
  width: "",
  height: "",
  btnText: ""
};
export const transformToComponentProps = <T extends {}>(props: T) => {
  return mapValues(props, item => {
    return {
      type: (item as any).constructor as StringConstructor,
      default: item
    };
  });
};

export interface GlobalDataProps {
  user: any;
  templates: any;
  bigWheel: any;
  global: any;
}
export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: any; //补充
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等
  canvasName: "l-text" | "l-image" | "l-shape";
  // 图层是否隐藏
  isExpand?: boolean;
  isHidden: boolean;
  isDrag: boolean;
  // 图层是否锁定
  isLocked?: boolean;
  // 图层名称
  layerName?: string;
}

export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}
export const commonDefaultProps: CommonComponentProps = {
  // actions
  actionType: "",
  url: "",
  // size
  height: "",
  width: "373px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  // border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  // shadow and opacity
  boxShadow: "0 0 0 #000000",
  opacity: "1",
  // position and x,y
  position: "absolute",
  left: "0",
  top: "0",
  right: "0"
};
export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}
export interface ImageComponentProps extends CommonComponentProps {
  src: string;
  srcDefault: string;
}
export interface ShapeComponentProps extends CommonComponentProps {
  backgroundColor: string;
}
export type AllComponentProps = TextComponentProps & ImageComponentProps & ShapeComponentProps;
export const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "left",
  color: "#000000",
  backgroundColor: "",
  ...commonDefaultProps
};
export const imageDefaultProps: ImageComponentProps = {
  src: "test.url",
  srcDefault:'',
  ...commonDefaultProps
};
export const shapeDefaultProps: ShapeComponentProps = {
  backgroundColor: "",
  ...commonDefaultProps
};
export const isEditingProp = {
  isEditing: {
    type: Boolean,
    default: false
  }
};
//export const textStylePropNames = without(Object.keys(textDefaultProps), 'actionType', 'url', 'text')
export const imageStylePropsNames = without(
  Object.keys(imageDefaultProps),
  "actionType",
  "url",
  "src"
);
export const shapeStylePropsNames = without(Object.keys(imageDefaultProps), "actionType", "url");
