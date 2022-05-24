<template>
  <ul class="r-text-component">
    <li class="clearfix" style="height:110px">
      <span class="theLabel r-text-item" style="float:left;">
        转盘背景图片：
      </span>
      <span class="theValue" style="float:left;">
               <uploadImg
          :size="'250*250'"
          :space="10"
          :para="'src'"
          :textpos="'common'"
          :picUrl='theSrc'
          @imageUrl="imageUrl"
        ></uploadImg>
      </span>
    </li>
    <!-- <shadow-picker
      :values="theShadow"
      @change="
        v => {
          changeValue(v, 'boxShadow');
        }
      "
    ></shadow-picker>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        边框圆角：
      </span>
      <span class="theValue">
        <a-slider
          v-model:value="theBorderRadius"
          @change="
            v => {
              changeValue(v, 'borderRadius');
            }
          "
        />
      </span>
    </li> -->
  </ul>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
//import ShadowPicker from "../ShadowPicker.vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  rotaryTable,
  rotaryTableStylePropNames
} from "../../../../../../store/dataType";
const defaultProps = transformToComponentProps(rotaryTable);
import uploadImg from "../UploadImg.vue";
// array that contains style props
export default defineComponent({
  name: "l-image",
  props: {
    ...defaultProps
  },
  components: {
    //ShadowPicker,
    uploadImg
  },
  emits: ["change"],
  setup(props, context) {
    let theShadow = computed(() => props.boxShadow);
    let theBorderRadius = computed(() => parseInt(props.borderRadius));
    const changeValue = (e: any, param: string) => {
      let obj = {
        key: param,
        value: e
      };
      context.emit("change", obj);
    };
    let theSrc = computed(() => props.src)
     const imageUrl = (data: { para: string; name: string }) => {
      let obj = {
        key: data.para,
        value: data.name
      };
      context.emit("change", obj);
      //formActMess[data.para] = data.name;
    };
    const { styleProps, handleClick } = useComponentCommon(props, rotaryTableStylePropNames);
    return {
      styleProps,
      theSrc,
      handleClick,
      imageUrl,
      changeValue,
      theBorderRadius,
      theShadow
    };
  }
});
</script>

<style scoped>
@import "./Rcommon.less";
</style>
