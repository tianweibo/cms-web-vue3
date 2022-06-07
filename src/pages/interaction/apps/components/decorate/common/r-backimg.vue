<template>
  <ul class="r-text-component">
    <!-- <li class="clearfix r-text-item" style="height:80px">
      <span class="theLabel">
        背景颜色：
      </span>
      <span class="theValue">
        <color-picker
          :value="theBackground"
          @change="
            v => {
              changeValue(v, 'background');
            }
          "
        ></color-picker>
      </span>
    </li> -->
    <li class="clearfix" style="height:110px">
      <span class="theLabel r-text-item" style="float:left">
        背景图片：
      </span>
      <span class="theValue" >
        <uploadImg
          :size="size"
          :space="space"
          :para="'backgroundImage'"
          :textpos="'common'"
          :picUrl='theBackground'
          @imageUrl="imageUrl"
        ></uploadImg>
      </span>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
//import ColorPicker from "../common/ColorPicker.vue";
//import useComponentCommon from '../../hocks/useComponentCommon'
import { transformToComponentProps, backImg } from "@/store/data-type/common";
const defaultProps = transformToComponentProps(backImg);
// array that contains style props
import uploadImg from "./upload-img.vue";
export default defineComponent({
  name: "l-image",
  props: {
    ...defaultProps
  },
  components: {
    //ColorPicker,
    uploadImg
  },
  emits: ["change"],
  setup(props, context) {
    //const { styleProps, handleClick} = useComponentCommon(props, textStylePropNames)
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
    let theBackground = computed(() => {
      let a=props.backgroundImage.match(/\(([^)]*)\)/)
      if(a && a[1]){
        return a[1];
      }else{
        return ''
      }
    })
    return {
      theBackground,
      changeValue,
      imageUrl,
      checked: ref(false),
      value: ref(false)
    };
  }
});
</script>

<style scoped>
@import "../common/r-common.less";
</style>
