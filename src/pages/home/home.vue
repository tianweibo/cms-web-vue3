<template>
  <div>
    <side-bar></side-bar>
    <nav-bar></nav-bar>
    <app-main></app-main>
    <use-tab></use-tab>
    <menu-tab></menu-tab>
    <theme-change></theme-change>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

import {SideBar, NavBar, AppMain,UseTab,MenuTab,ThemeChange} from "@/components/layouts1/index"
export default defineComponent({
  name: "home",
  components: {
    SideBar, NavBar, AppMain,UseTab,MenuTab,
    ThemeChange
  },
  setup(_: any, ctx: any) {
   
    return { 

    };
  }
});
</script>
<style lang="less" scoped>


</style>
<style lang="less">

</style>
