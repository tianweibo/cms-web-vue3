<template>
  <ul class="r-text-component">
    <li class="clearfix" style="height:110px;">
      <span class="theLabel  r-text-item" style="float:left;">
        {{layerName}}:
      </span>
      <span class="theValue">
          <uploadImg
          :size="size"
          :space="space"
          :para="para"
          :textpos="'common'"
          @imageUrl="imageUrl"
          :picUrl='theSrc'
        ></uploadImg>
      </span>
    </li>
  </ul>
</template>
<script lang="ts">
import uploadImg from "../UploadImg.vue";
import { defineComponent, computed } from "vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  rotaryTable,
  rotaryTableStylePropNames
} from "../../../../../../store/dataType";
const defaultProps = transformToComponentProps(rotaryTable);
export default defineComponent({
  name: "r-image",
  props: {
    ...defaultProps,
    layerName:{
      default:'',
      type:String
    }
  },
  components: {
    uploadImg
   // ShadowPicker
  },
  emits: ["change"],
  setup(props, context) {
    let theSrc = computed(() => props.src);
    let para = computed(() => {
      if (props.layerName == "背景图") {
        return 'backgroundImage'
      } else {
        return 'src';
      }
    });
    let theShadow = computed(() => props.boxShadow);
    let theBorderRadius = computed(() => parseInt(props.borderRadius));
    const changeValue = (e: any, param: string) => {
      let obj = {
        key: param,
        value: e
      };
      context.emit("change", obj);
    };
    const imageUrl = (data: { para: string; name: string }) => {
      let obj = {
        key: data.para,
        value: data.name
      };
      context.emit("change", obj);
    };
    const { styleProps, handleClick } = useComponentCommon(props, rotaryTableStylePropNames);
    return {
      para,
      styleProps,
      handleClick,
      theSrc,
      changeValue,
      theBorderRadius,
      theShadow,
      imageUrl
    };
  }
});
</script>

<style scoped>
@import "./Rcommon.less";
</style>
