<template>
  <ul class="r-text-component">
    <!-- <li class="clearfix r-text-item">
      <span class="theLabel">
        是否开启：
      </span>
      <span class="theValue">
        <a-checkbox v-model:checked="theDisplay" @change="value => changeValue(value, 'display')" />
      </span>
    </li> -->
    <li class="clearfix r-text-item">
      <span class="theLabel">
        文案：
      </span>
      <span class="theValue">
        <a-input disabled v-model:value="theText" @change="value => changeValue(value, 'text')" />
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        背景颜色：
      </span>
      <span class="theValue">
        <color-picker
          :value="theBackgroundColor"
          @change="
            v => {
              changeValue(v, 'backgroundColor');
            }
          "
        ></color-picker>
      </span>
    </li>

    <li class="clearfix r-text-item">
      <span class="theLabel">
        文字大小：
      </span>
      <span class="theValue">
        <a-input-number
          id="inputNumber"
          v-model:value="theFontSize"
          :min="12"
          :max="15"
          @change="value => changeValue(value, 'fontSize')"
        />
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        文字颜色：
      </span>
      <span class="theValue">
        <color-picker
          :value="theColor"
          @change="
            v => {
              changeValue(v, 'color');
            }
          "
        ></color-picker>
      </span>
    </li>
   <!--  <border-content
      :values="theBorder"
      @change="
        v => {
          changeValue(v, 'border');
        }
      "
    ></border-content> -->
    <li class="clearfix r-text-item">
      <span class="theLabel">
        边框圆角：
      </span>
      <span class="theValue">
        <a-slider
          v-model:value="theBorderRadius"
          :min="1"
          :max="300"
          @change="value => changeValue(value, 'borderRadius')"
        />
      </span>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ColorPicker from "../ColorPicker.vue";
//import BorderContent from "../BorderContent.vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  rouselContent,
  rouselStylePropNames
} from "../../../../../../../src/store/dataType";
const defaultProps = transformToComponentProps(rouselContent);

// array that contains style props
export default defineComponent({
  name: "r-carousel",
  props: {
    ...defaultProps
  },
  components: {
    ColorPicker,
    //BorderContent
  },
  emits: ["change"],
  setup(props, context) {
    const { styleProps, handleClick } = useComponentCommon(props, rouselStylePropNames);
    const changeValue = (e: any, param: string) => {
      let obj = {
        key: param,
        value: e
      };
      context.emit("change", obj);
    };
    
    let theColor = computed(() => props.color);
    //let theBorder = computed(() => props.border);
    let theFontSize = computed(() => parseInt(props.fontSize));
    let theText = computed(() => props.text);
    let theBorderRadius = computed(() => parseInt(props.borderRadius));
    let theBackgroundColor = computed(() => props.backgroundColor);
    /* let theDisplay = computed(() => {
      if (props.display == "block") {
        return true;
      } else {
        return false;
      }
    }); */
    return {
      styleProps,
      //theBorder,
      theBackgroundColor,
      theFontSize,
      theColor,
      theText,
     // theDisplay,
      handleClick,
      theBorderRadius,
      changeValue,
      checked: ref(false),
      value: ref(false)
    };
  }
});
</script>

<style scoped>
@import "./Rcommon.less";
</style>
