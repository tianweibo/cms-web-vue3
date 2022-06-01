import { mapValues,without} from "lodash-es";
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
  }
  export interface LText extends LcommonProps {
    fontSize: string;
    color: string;
    text: string;
    textAlign: string;
  }
  export interface LBtn extends LcommonProps {
    fontSize: string;
    color: string;
    text: string;
    backgroundImage: string;
    backgroundImageDefault: string;
    backgroundColor: string;
    lineHeight: string;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
    boxShadow: string;
    type: string;      //背景是图片还是颜色 0颜色1图片
    //opacity: string;
  }
  export interface LImage extends LcommonProps {
    src: string;
    srcDefault: string;
    size: string;
    space: number;
    boxShadow?: string;
    borderRadius?: string;
  }
  export interface EditorProps {
    components: ComponentData[]; // 供编辑器渲染的数组
    currentElement: string;  // 当前编辑的是哪个元素，uuid
    theIndex: number;
  }
  export interface ComponentData {
    props: any;  // 这个元素的 属性，属性请详见下面
    id: string; // id，uuid v4 生成
    // 业务组件库名称 l-text，l-image 等等
    canvasName: "l-dialog"| "l-text"| "l-image"| "l-imageTiger"| "l-shape"| "l-btn"| "l-carousel"| "l-backimg"  | "l-regular";// 左边装修需要的组件
    formName: string;  //右边展示需要的组件
    isExpand: boolean; //元素是否可放大
    isHidden: boolean; // 元素是否隐藏
    isDrag: boolean;   // 元素是否可拖拽
    layerName?: string; // 图层名称
  }
  export interface GlobalDataProps {
    user: any;
    templates: any;
    bigWheel: any;
    global: any;
    demo: any;
  }
  export const transformToComponentProps = <T extends {}>(props: T) => {
    return mapValues(props, item => {
      return {
        type: (item as any).constructor as StringConstructor,
        default: item
      };
    });
  };
  export const backImg: LBackImg = {
    width: "",
    height: "",
    size:'',
    space:1,
    //background:'#666',
    backgroundImageDefault: "",
    backgroundImage:
      ""
  };
  export const backStylePropNames = without(Object.keys(backImg));
  export const btn: LBtn = {
    width: "",
    height: "",
    lineHeight: "",
    top: "",
    left: "",
    type: "1",
    display: "",
    fontSize: "",
    color: "",
    text: "",
    zIndex: 9,
    backgroundColor: "",
    backgroundImage:
      "",
    backgroundImageDefault:
    "",
    position: "",
    borderColor: "",
    borderWidth: "",
    borderRadius: "",
    boxShadow: ""
  };
  export const btnStylePropNamesImg = without(Object.keys(btn),'boxShadow','borderRadius','borderWidth','borderColor','backgroundColor', "position", "top", "left");
  export const btnStylePropNamesText = without(Object.keys(btn),'backgroundImage', "position", "top", "left");
  export const text: LText = {
    width: "",
    height: "",
    top: "",
    left: "",
    display: "",
    fontSize: "",
    color: "",
    text: "",
    position: "",
    zIndex: 9,
    textAlign:''
  };
  export const textStylePropNames = without(Object.keys(text), "position", "top", "left");

  export const img: LImage = {
    width: "",
    height: "",
    size:'',
    space:0.5,
    top: "",
    left: "",
    display: "",
    position: "",
    src: "",
    srcDefault: "",
    boxShadow: "",
    borderRadius: "",
    zIndex: 8
  }; 

  export const imgStylePropNames = without(
    Object.keys(img),
    "position",
    "top",
    "left"
  );