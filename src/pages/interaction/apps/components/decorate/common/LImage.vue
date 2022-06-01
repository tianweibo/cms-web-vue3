<template>
  <img :style="styleProps" class="l-image-component" :src="src" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useComponentCommon from "../../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  img,
  imgStylePropNames
} from "@/store/dataType/common";
const defaultProps = transformToComponentProps(img);

// array that contains style props
export default defineComponent({
  name: "l-image",
  props: {
    ...defaultProps
  },
  setup(props) {
    // 重用并且简化
    // 抽离并且获得 styleProps
    const { styleProps } = useComponentCommon(props, imgStylePropNames);
    return {
      styleProps
    };
  }
});
</script>

<style scoped></style>
