<template>
  <div>
    <the-logo :elMenuCollapse="elMenuCollapse"></the-logo>
    <the-search :elMenuCollapse="elMenuCollapse"></the-search>
    <side-menu></side-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref,computed} from "vue";
import TheSearch from './search.vue'
import SideMenu from './sideMenu.vue'
import TheLogo from './theLogo.vue'
export default defineComponent({
  name: "SideBar",
  components: {
     TheSearch,SideMenu,TheLogo
  },
   props:{
    isPhone: {
      type: Boolean,
      default: false
    },
    isCollapse:{
      type: Boolean,
      default: false
    }
  },
  setup(props: any, ctx: any) {
    const elMenuCollapse=computed(()=>{
      if (props.isPhone) {
        return true;
      }
      return props.isCollapse;
    })
    return { 
        elMenuCollapse
    };
  }
});
</script>
<style lang="less" scoped>


</style>
<style lang="less">

</style>
