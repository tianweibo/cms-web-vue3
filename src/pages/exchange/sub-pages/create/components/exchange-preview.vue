<template>
  <div class="box-wrap">
    <exchange-list v-if="fullData && fullData.decorateInfo.currentRule == '3'" :fullData="fullData" />
    <exchange-main :fullData="fullData" v-else/>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import exchangeMain from './previewCom/exchange-main.vue'
import exchangeList from './previewCom/exchange-list.vue'
import { FullData } from "../types/index";
export default defineComponent({
  components: {
    exchangeMain,
    exchangeList
  },
  props: {
    fullData: Object as PropType<FullData>,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="less" scoped>
.box-wrap {
  display: flex;
  width: 375px;
  height: 690px;
  margin: 0 50px;
  background-color: #f3f3fe;
  border: 1px solid #c4c4c4;
}
</style>
