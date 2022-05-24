import { Module, Mutation } from "vuex";
import { v4 as uuidv4 } from "uuid";

import {
  GlobalDataProps,
  btnContent1,
  btnContent2,
  btnContent1Tiger,
  btnContent2Tiger,
  rotaryTable,
  titleTiger,
  titleNoTiger,
  rotaryTableTiger,
  numberBox,
  timeContent,
  numberBoxTiger,
  timeContentTiger,
  arrayContent,
  arrayContentTiger,
  rouselContent,
  rouselContentTiger,
  tigerContent,
  backImg,
  backImgTiger,
  regurContent,
  dialogContent1,
  dialogContent2,
  dialogContent3
} from "../dataType";

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  theIndex: number;
}
export interface ComponentData {
  // 这个元素的 属性，属性请详见下面
  props: any;
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等
  canvasName:
    | "l-dialog"
    | "l-text"
    | "l-image"
    | "l-imageTiger"
    | "l-shape"
    | "l-btn"
    | "l-carousel"
    | "l-backimg"
    | "l-regular";
  formName: string;
  //isTop: boolean;
  isExpand: boolean;
  isHidden: boolean;
  isDrag: boolean;
  // 图层名称
  layerName?: string;
}
export const testComponentsNoTiger: ComponentData[] = [
  {
    id: uuidv4(),
    canvasName: "l-image",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-img",
    layerName: "标题",
    props: { ...titleNoTiger }
  },
  {
    id: uuidv4(),
    canvasName: "l-btn",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-btn",
    layerName: "按钮1",
    props: { ...btnContent1 }
  },
  {
    id: uuidv4(),
    canvasName: "l-btn",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-btn",
    layerName: "按钮2",
    props: { ...btnContent2 }
  },
  {
    id: uuidv4(),
    canvasName: "l-image",
    isExpand: true,
    isHidden: false,
    isDrag: false,
    formName: "r-img",
    layerName: "转盘",
    props: { ...rotaryTable }
  },
  
  {
    id: uuidv4(),
    canvasName: "l-text",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-text",
    layerName: "日期",
    props: { ...timeContent }
  },
  {
    id: uuidv4(),
    canvasName: "l-image",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-img",
    layerName: "箭头",
    props: { ...arrayContent }
  },
  {
    id: uuidv4(),
    canvasName: "l-text",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-text",
    layerName: "次数",
    props: { ...numberBox }
  },
 
   {
    id: uuidv4(),
    canvasName: "l-carousel",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-carousel",
    layerName: "走马灯",
    props: { ...rouselContent }
  }, 
  {
    id: uuidv4(),
    canvasName: "l-backimg",
    isExpand: false,
    isHidden: false,
    isDrag: false,
    formName: "r-backimg",
    layerName: "背景图",
    props: { ...backImg }
  },
  {
    id: uuidv4(),
    canvasName: "l-regular",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-regular",
    layerName: "规则",
    props: { ...regurContent }
  },
  {
    id: uuidv4(),
    canvasName: "l-dialog",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-dialog",
    layerName: "弹框",
    props: dialogContent1
  },
  {
    id: uuidv4(),
    canvasName: "l-dialog",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-dialog",
    layerName: "我是弹框2",
    props: dialogContent2
  },
  {
    id: uuidv4(),
    canvasName: "l-dialog",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-dialog",
    layerName: "我是弹框3",
    props: dialogContent3
  }
]
export const testComponentsTiger: ComponentData[] = [
  {
    id: uuidv4(),
    canvasName: "l-image",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-img",
    layerName: "标题",
    props: { ...titleTiger }
  },
  {
    id: uuidv4(),
    canvasName: "l-imageTiger",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    //isTop:true,
    formName: "r-img",
    layerName: "虎头",
    props: { ...tigerContent }
  }, 
  {
    id: uuidv4(),
    canvasName: "l-btn",
    isExpand: false,
    isHidden: false,
    isDrag: false,
    formName: "r-btn",
    layerName: "按钮1",
    props: { ...btnContent1Tiger }
  },
  {
    id: uuidv4(),
    canvasName: "l-btn",
    isExpand: false,
    isHidden: false,
    isDrag: false,
    formName: "r-btn",
    layerName: "按钮2",
    props: { ...btnContent2Tiger }
  },
  {
    id: uuidv4(),
    canvasName: "l-image",
    isExpand: false,
    isHidden: false,
    isDrag: false,
    formName: "r-img",
    layerName: "转盘",
    props: { ...rotaryTableTiger }
  },
  
  {
    id: uuidv4(),
    canvasName: "l-text",
    isExpand: false,
    isHidden: false,
    isDrag: false,
    formName: "r-text",
    layerName: "日期",
    props: { ...timeContentTiger }
  },
  {
    id: uuidv4(),
    canvasName: "l-image",
    isExpand: false,
    isHidden: false,
    isDrag: false,
    formName: "r-img",
    layerName: "箭头",
    props: { ...arrayContentTiger }
  },
 {
    id: uuidv4(),
    canvasName: "l-text",
    isExpand: false,
    isHidden: false,
    isDrag: false,
    formName: "r-text",
    layerName: "次数",
    props: { ...numberBoxTiger }
  }, 
  {
    id: uuidv4(),
    canvasName: "l-carousel",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-carousel",
    layerName: "走马灯",
    props: { ...rouselContentTiger }
  }, 
  {
    id: uuidv4(),
    canvasName: "l-backimg",
    isExpand: false,
    isHidden: false,
    isDrag: false,
    formName: "r-backimg",
    layerName: "背景图",
    props: { ...backImgTiger }
  },
  {
    id: uuidv4(),
    canvasName: "l-regular",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-regular",
    layerName: "规则",
    props: { ...regurContent }
  },
  {
    id: uuidv4(),
    canvasName: "l-dialog",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-dialog",
    layerName: "我是弹框3",
    props: dialogContent3 // 未中奖
  },
  {
    id: uuidv4(),
    canvasName: "l-dialog",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-dialog",
    layerName: "我是弹框2",
    props: dialogContent2  //积分奖
  },
  {
    id: uuidv4(),
    canvasName: "l-dialog",
    isExpand: false,
    isHidden: false,
    isDrag: true,
    formName: "r-dialog",
    layerName: "弹框",
    props: dialogContent1  //实物奖
  },
  
  
];
const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponentsTiger,
    currentElement: "",
    theIndex: 2
  },
  mutations: {
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
    setComponents(state, isTiger: boolean){
      if(isTiger){
        state.components=testComponentsTiger
      }else{
        state.components=testComponentsNoTiger
      }
    },
    setComponentsDefault(state, obj: {isTiger: boolean;theme: string}){
      if(obj.isTiger){
        for(let i=0;i<testComponentsTiger.length;i++){
          if(testComponentsTiger[i].props.backgroundImageDefault && testComponentsTiger[i].props.backgroundImage){
            testComponentsTiger[i].props.backgroundImage=testComponentsTiger[i].props.backgroundImageDefault
          }
          if(testComponentsTiger[i].props.srcDefault && testComponentsTiger[i].props.src){
            testComponentsTiger[i].props.src=testComponentsTiger[i].props.srcDefault
          }
          if(testComponentsTiger[i].props.textDefault && testComponentsTiger[i].props.srcDefault){
            testComponentsTiger[i].props.text=testComponentsTiger[i].props.textDefault
          }
        }
        state.components=testComponentsTiger;
      }else{
        for(let i=0;i<testComponentsNoTiger.length;i++){
          if(testComponentsNoTiger[i].props.backgroundImageDefault && testComponentsNoTiger[i].props.backgroundImage){
            testComponentsNoTiger[i].props.backgroundImage=testComponentsNoTiger[i].props.backgroundImageDefault
          }
          if(testComponentsNoTiger[i].props.srcDefault && testComponentsNoTiger[i].props.src){
            testComponentsNoTiger[i].props.src=testComponentsNoTiger[i].props.srcDefault
          }
          if(testComponentsNoTiger[i].props.textDefault && testComponentsNoTiger[i].props.srcDefault){
            testComponentsNoTiger[i].props.text=testComponentsNoTiger[i].props.textDefault
          }
        }
        state.components=testComponentsNoTiger
      }
      
    },
    setTheindex(state, index: number) {
      debugger
      state.theIndex = index;
    },
    setActiveRandom(state, currentId: string) {
      let num = state.components.findIndex(item => item.id != currentId);
      state.currentElement = state.components[num].id;
    },
    updateComponent: (state: EditorProps, { key, value, id }) => {
      const updatedComponent = state.components.find(
        component => component.id === (id || state.currentElement)
      );
      if (updatedComponent) {
        if (Array.isArray(key) && Array.isArray(value)) {
          key.forEach((keyName, index) => {
            /* if(keyName=='src' && value[index]==''){
              updatedComponent.props[keyName] = updatedComponent.props.srcDefault
            }else if(keyName=='backgroundImage' && value[index]==''){
              updatedComponent.props[keyName] = updatedComponent.props.backgroundImageDefault
            }else{
              updatedComponent.props[keyName] = value[index];
            } */
            updatedComponent.props[keyName] = value[index];
          });
        } else if (typeof key === "string" && typeof value === "string") {
          /* if(key=='backgroundImage' && value==''){
            updatedComponent.props[key] = value;
          }else if(key=='src'  && value==''){
            updatedComponent.props[key] = value;
          }else{
            updatedComponent.props[key] = value;
          } */
          updatedComponent.props[key] = value;
        }
      }
    }
  },
  actions: {},
  getters: {
    getLcomponents: state => {
      return state.components.filter(
        component =>  component.layerName !== "背景图" &&  component.formName !=="r-regular" &&  component.formName !=="r-dialog" && component.formName!=='l-imageTiger'
      );
    },
    getRcomponents: state => {
      return state.components.filter(
        component => component.layerName !== "我是弹框2" && component.layerName !== "我是弹框3" && component.layerName !== "虎头"
      );
    },
    getBackImgProps: state => {
      return state.components.find(component => component.layerName === "背景图");
    },
    getTitleProps: state => {
      return state.components.find(component => component.formName === "r-title");
    },
    getRegularProps: state => {
      return state.components.find(component => component.formName === "r-regular");
    },
    getDialogProps: state => {
      let a = state.components.filter(component => component.formName === "r-dialog");
      return a[state.theIndex];
    },
    getDialogPropsArr: state => {
      return state.components.filter(component => component.formName === "r-dialog");
    },
    getCurrentElement: state => {
      return state.components.find(component => component.id === state.currentElement);
    },
    getElement: state => (id: string) => {
      return state.components.find(component => component.id === (id || state.currentElement));
    }
  }
};

export default editor;
