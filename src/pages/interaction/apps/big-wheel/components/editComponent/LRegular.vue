<template>
  <div :style="styleProps" class="l-regular" @click.prevent="handleClick" :src="src">
    <span v-html="richText" v-if="src == ''"> </span>
    <img :src="src" v-if="src != ''" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  regurContent,
  regularStylePropNames
} from "../../../../../../store/dataType";
const defaultProps = transformToComponentProps(regurContent);

// array that contains style props
export default defineComponent({
  name: "l-regular",
  props: {
    ...defaultProps
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(props, regularStylePropNames);
    return {
      styleProps,
      // data:'<ol><li><span style="color: red;">1111</span>1<strong>222</strong></li><li><span style="color: rgb(255, 255, 0);">3</span><span style="color: rgb(0, 102, 204);">333</span></li><li><span style="color: rgb(0, 102, 204);">33333333</span></li></ol><p><span style="color: rgb(0, 102, 204);">22222222222</span></p>',
      handleClick
    };
  }
});
</script>

<style scoped>
@import "./Rcommon.less";
.l-regular{
  
}
</style>
