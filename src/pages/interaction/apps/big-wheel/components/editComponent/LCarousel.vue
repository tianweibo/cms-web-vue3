<template>
  <div :style="styleProps" style="position:relative,overflow">
    <img class='title_img' :style="imgProps" src="http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/d5f34ab0a1a08f7773e599eb0014e5f6.png" />
    <a-carousel autoplay :dots="false" :style="styleProps" class="ant-carousel">
      <div v-for="(item, index) in theText" :key="index">{{ item }}</div>
    </a-carousel>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  rouselContent,
  rouselStylePropNames,
  imageStylePropNames
} from "../../../../../../../src/store/dataType";
const defaultProps = transformToComponentProps(rouselContent);
// array that contains style props
export default defineComponent({
  name: "l-carousel",
  props: {
    tag: {
      type: String,
      default: "span"
    },
    ...defaultProps
  },
  setup(props) {
    // 重用并且简化
    // 抽离并且获得 styleProps
    let theText = computed(() => props.text.split(","));
    const { styleProps } = useComponentCommon(props, rouselStylePropNames);
    const { imgProps } = useComponentCommon(props, imageStylePropNames);
    return {
      styleProps,
      imgProps,
      theText
    };
  }
});
</script>

<style scoped>
.ant-carousel {
  padding: 0;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
}

.title_img {
  margin-left:10px;
  font-size: 16px;
  margin-top:5px;
  width:16px;
}
</style>
