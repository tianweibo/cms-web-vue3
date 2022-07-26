<template>
  <div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";


export default defineComponent({
  name: "UserList",
  setup(_: any, ctx: any) {
    const actList=ref([
      {
        name:'我是活动名称',
        startTime:'2022-07-21 09:30',
        endTime:'2022-07-21 21:30'
      }
    ])
    return { 
      actList
    };
  }
});
</script>
<style lang="less" scoped>


</style>
<style lang="less">

</style>
