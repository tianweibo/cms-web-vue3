<template>
  <a-carousel :dots="false" :after-change="onChange">
    <div><img src="https://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/9e4801990ab02882eaf7fa6b13ddeb77.png" alt=""></div>
    <div>222222222222</div>
  </a-carousel>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const onChange = (current: number) => {
      console.log(current);
    };
    return {
      onChange,
    };
  },
});
</script>
<style lang="less" scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
  width: 100px;

  /* height: 160px; */
  height: 375px;
  overflow: hidden;
  text-align: center;

  /* line-height: 160px; */
  background: #364d79;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>