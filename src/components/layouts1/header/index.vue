<template>
  <span class="theContent">
    <nav-bar></nav-bar>
    <use-tab></use-tab>
  </span>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import NavBar from './navBar.vue'
import UseTab from './useTab.vue'


export default defineComponent({
  name: "Header",
  components: {
     NavBar,UseTab,
  },
  setup(_: any, ctx: any) {
   
    return { 

    };
  }
});
</script>
<style lang="less" scoped>


</style>

