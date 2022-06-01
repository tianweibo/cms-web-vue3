import { v4 as uuidv4 } from "uuid";
import {ComponentData} from "../dataType/common";
import {
  backImg,
  text,
  title,
  btn
} from "../dataType/demo";
export const demoData: ComponentData[] = [
  {
    id: uuidv4(),
    canvasName: "l-btn",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-btn",
    layerName: "按钮",
    props: { ...btn }
  },
  
  {
    id: uuidv4(),
    canvasName: "l-image",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-img",
    layerName: "标题",
    props: { ...title }
  },
  {
    id: uuidv4(),
    canvasName: "l-text",
    isExpand: true,
    isHidden: false,
    isDrag: true,
    formName: "r-text",
    layerName: "text",
    props: { ...text }
  },
  {
    id: uuidv4(),
    canvasName: "l-backimg",
    isExpand: true,
    isHidden: false,
    isDrag: false,
    formName: "r-backimg",
    layerName: "背景图",
    props: { ...backImg }
  }
]
