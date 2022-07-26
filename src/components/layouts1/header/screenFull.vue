<template>
  <span class="container" title="全屏/正常">
    <i class="iconfont" :class="isFullscreen ? 'icon-quxiaoquanping' : 'icon-quanping'" @click="handleFullScreen"></i>
  </span>
</template>
<script lang="ts">
import { defineComponent, reactive, ref,onMounted,onBeforeUnmount} from "vue";
import screenfull from 'screenfull'
import { message } from "ant-design-vue";
export default defineComponent({
  name: "ScreenFull",
  setup(_: any,ctx: any){
    const isFullscreen=ref(false);
    const handleFullScreen=()=> {
      if (!screenfull.enabled) {
        message.warn('浏览器不支持')
        return false
      }
      screenfull.toggle()
    }
    const change=()=> {
      isFullscreen.value = screenfull.isFullscreen
    }
    const destroy=()=> {
      if (screenfull.enabled) {
        screenfull.off('change', change)
      }
    }
    const init=()=>{
      if (screenfull.enabled) {
        screenfull.on('change', change)
      }
    }
    onMounted(()=>{
        init()
    })
    onBeforeUnmount(()=>{
        destroy()
    })
    return{
        init,
        change,
        destroy,
        handleFullScreen,
        isFullscreen
    }
  }
  
})
</script>

<style lang="scss" scoped>
.container {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-top:12px;
  cursor: pointer;

  i {
    width: 40px;
    height: 40px;
    font-size: 20px;

    &:before {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
