<template>
  <ul class="r-text-component">
    <li class="clearfix r-text-item">
      <span class="theLabel">
        是否展示：
      </span>
      <span class="theValue">
        <a-checkbox v-model:checked="theDisplay" @change="value => changeValue(value, 'display')" />
      </span>
    </li>
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
        上边距：
      </span>
      <span class="theValue">
        <a-input-number
          id="inputNumber"
          v-model:value="theTop"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'top')"
        />
      </span>
    </li>
   <!--  <li class="clearfix r-text-item">
      <span class="theLabel">
        x轴坐标：
      </span>
      <span class="theValue">
        <a-input-number
          id="inputNumber"
          v-model:value="theLeft"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'left')"
        />
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        容器高度：
      </span>
      <span class="theValue">
        <a-input-number
          id="inputNumber"
          v-model:value="theHeight"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'height')"
        />
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        容器宽度：
      </span>
      <span class="theValue">
        <a-input-number
          id="inputNumber"
          v-model:value="theWidth"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'width')"
        />
      </span>
    </li> -->
    <li class="clearfix r-text-item">
      <span class="theLabel">
        文字大小：
      </span>
      <span class="theValue">
        <a-input-number
          id="inputNumber"
          v-model:value="theFontSize"
          :min="1"
          :max="60"
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
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ColorPicker from "../ColorPicker.vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  timeContent,
  textStylePropNames
} from "../../../../../../store/dataType";
const defaultProps = transformToComponentProps(timeContent);

// array that contains style props
export default defineComponent({
  name: "l-image",
  props: {
    ...defaultProps
  },
  components: {
    ColorPicker
  },
  emits: ["change"],
  setup(props, context) {
    const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
    const changeValue = (e: any, param: string) => {
      let obj = {
        key: param,
        value: e
      };
      context.emit("change", obj);
    };
    let theTop = computed(() => parseInt(props.top));
    let theLeft = computed(() => parseInt(props.left));
    let theColor = computed(() => props.color);
    let theWidth = computed(() => parseInt(props.width));
    let theHeight = computed(() => parseInt(props.height));
    let theFontSize = computed(() => parseInt(props.fontSize));
    let theText = computed(() => props.text);
    let theDisplay = computed(() => {
      if (props.display == "block") {
        return true;
      } else {
        return false;
      }
    });
    return {
      styleProps,
      theTop,
      theLeft,
      theWidth,
      theHeight,
      theFontSize,
      theColor,
      theText,
      theDisplay,
      handleClick,
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
