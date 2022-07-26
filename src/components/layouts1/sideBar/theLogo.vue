<template>
  <div :class="!elMenuCollapse ? 'logo' : 'mobile-logo'">
    <img :src="!elMenuCollapse ? logo :logoMobile " alt="logo"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import logo from "@/assets/logo.png";
import logoMobile from "@/assets/logo-mobile.png";
export default defineComponent({
  props: {
    elMenuCollapse: {
      type: Boolean,
      required: true,
      
    },
  },
  name: "TheLogo",
  setup(_: any, ctx: any) {
    return { 
        logo,
        logoMobile
    };
  }
});
</script>
<style lang="scss" scoped>
.logo {
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #fff;
  transition: all 0.5s ease-in-out;
  background-color: #122150;
  transition: all 0.3s linear;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
  img {
    width: 100%;
    height:100px;
  }
}

.mobile-logo {
  width: 64px;
  height: 86px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #122150;
  transition: all 0.3s linear;

  img {
    width: 40px;
    height: 40px;
  }
}
</style>
