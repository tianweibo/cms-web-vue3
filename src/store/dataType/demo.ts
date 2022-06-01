import { mapValues, without} from "lodash-es";
import {LcommonProps,LBackImg,LText,LBtn,LImage} from './common'


export const title: LImage = {
  width: "270px",
  height: "80px",
  size:'270*80',
  space:0.5,
  top: "40px",
  left: "15px",
  display: "block",
  position: "absolute",
  src: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/968c157ca7bdbb8916f254b43ef1312e.png",
  srcDefault: "http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/968c157ca7bdbb8916f254b43ef1312e.png",
  boxShadow: "",
  borderRadius: "",
  zIndex: 8
}; 




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



export const text: LText = {
  width: "60px",
  height: "20px",
  top: "300px",
  left: "3px",
  display: "block",
  fontSize: "10px",
  color: "#fff",
  text: "剩余10次",
  position: "absolute",
  zIndex: 9999,
  textAlign:'center'
};


export const btn: LBtn = {
  width: "148px",
  height: "40px",
  lineHeight: "40px",
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



export const transformToComponentProps = <T extends {}>(props: T) => {
  return mapValues(props, item => {
    return {
      type: (item as any).constructor as StringConstructor,
      default: item
    };
  });
};














 



