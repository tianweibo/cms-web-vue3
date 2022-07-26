<template>
  <section class="container">
    <div class="wrapper" id="wrapper">
      <router-view v-slot="{ Component }" :key="$route.fullPath">
        <transition appear name="fade-transform" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";


export default defineComponent({
  name: "AppMain",
  setup(_: any, ctx: any) {
   
    return { 

    };
  }
});
</script>
<style lang="less" scoped>
.container {
  .wrapper {
    width: 100%;
    height: 100%;
    text-align: left;
  }
}
</style>
