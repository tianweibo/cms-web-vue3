<template>
    <div :style="styleProps" class="back-img"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  backImg,
  backStylePropNames
} from "../../../../../../store/dataType"; 
const defaultProps = transformToComponentProps(backImg);

// array that contains style props
export default defineComponent({
  name: "l-backimg",
  props: {
    ...defaultProps
  },
  setup(props) {
    // 重用并且简化
    // 抽离并且获得 styleProps
    const { styleProps } = useComponentCommon(props, backStylePropNames);
    return {
      styleProps
    };
  }
});
</script>

<style scoped>
.back-img{
  background-size: 100%;
  height:300px;
}
</style>
