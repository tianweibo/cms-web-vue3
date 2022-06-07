<template>
  <component :is="tag" :style="styleProps" class="l-text-component" @click="handleClick">
   <span v-if="type=='0'">{{ text }}</span> 
  </component>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useComponentCommon from "../../../hocks/use-component-common";
import {
  transformToComponentProps,
  btn,
  btnStylePropNamesImg,
  btnStylePropNamesText
} from "@/store/data-type/common";
const defaultProps = transformToComponentProps(btn);
// array that contains style props
export default defineComponent({
  name: "l-btn",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    ...defaultProps
  },
  setup(props) {
    let btnStylePropNames: string[]=[]
    if(props.type=='1'){ //图片
      btnStylePropNames=btnStylePropNamesImg
    }else if(props.type=='0'){ //文本
     btnStylePropNames=btnStylePropNamesText
    }
    const { styleProps, handleClick } = useComponentCommon(props, btnStylePropNames);
   return {
      styleProps,
      handleClick
    };
  }
});
</script>

<style scoped>
div.l-text-component,
p.l-text-component {
  margin-bottom: 0;
  text-align: center;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}

.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
}
</style>
