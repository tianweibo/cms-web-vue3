import { Module, Mutation } from "vuex";
import {EditorProps,GlobalDataProps} from "../dataType/common";
import {demoData} from "../data/demo"

const demo: Module<EditorProps, GlobalDataProps> = {
  namespaced: true,
  state: {
    components: demoData,
    currentElement: "",
    theIndex: 2,
  },
  mutations: {
    setActive(state, currentId: string) {
      state.currentElement = currentId;
    },
    updateComponent: (state: EditorProps, { key, value, id }) => {
      const updatedComponent = state.components.find(
        component => component.id === (id || state.currentElement)
      );
      if (updatedComponent) {
        if (Array.isArray(key) && Array.isArray(value)) {
          key.forEach((keyName, index) => {
            updatedComponent.props[keyName] = value[index];
          });
        } else if (typeof key === "string" && typeof value === "string") {
          updatedComponent.props[key] = value;
        }
      }
    }
  },
  actions: {},
  getters: {
    getLcomponents: state => {
      return state.components.filter(
        component =>  component.layerName !== "背景图" 
      );
    },
    getRcomponents: state => {
      return state.components.filter(
        component => component.layerName !== "我是弹框2" 
      );
    },
    getCurrentElement: state => {
        return state.components.find(component => component.id === state.currentElement);
    },
    getBackImgProps: state => {
      return state.components.find(component => component.layerName === "背景图");
    },
    getTitleProps: state => {
      return state.components.find(component => component.formName === "r-title");
    }
  }
};

export default demo;
