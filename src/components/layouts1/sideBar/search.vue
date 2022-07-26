<template>
  <div v-if='!elMenuCollapse'>
    <a-input-search
      v-model:value="theInput"
      placeholder="input search text"
      enter-button="Search"
      size="small"
      @search="onSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";


export default defineComponent({
  props: {
    elMenuCollapse: {
      type: Boolean,
      required: true,
    },
  },
  name: "TheSearch",
  setup(_: any, ctx: any) {
    const theInput=ref('')
    const onSearch=()=>{
        console.log('开始搜索了')
    }
    return { 
        theInput,
        onSearch
    };
  }
});
</script>
<style lang="less" scoped>


</style>
