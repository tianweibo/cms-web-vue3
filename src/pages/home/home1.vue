<template>
  <a-layout style="height:100%">
    <a-layout-sider   v-model:collapsed="isCollapse" :trigger="null" collapsible :style="asideStyle">
      <side-bar :isCollapse="isCollapse" :isPhone="isPhone"></side-bar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <i class="iconfont icon-fold" :class="{ rotate: foldState }" @click="changeSlidebarState" />
        <bread-crumb style="float:left"></bread-crumb>
        <theme-change style="float:right"></theme-change>
        <screen-full style="float:right"></screen-full>
        <the-header></the-header> 
        
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <menu-tab></menu-tab>
        <app-main></app-main>
      </a-layout-content>
    </a-layout>
    <div class="sidenav-mask" :class="{ show: isPhone && isCollapse }" @click="changeSlidebarState"></div>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, reactive, ref,onMounted ,watch,computed} from "vue";
import {SideBar, TheHeader, AppMain,MenuTab,BreadCrumb,ThemeChange,screenFull} from "@/components/layouts1/index"
const navBarHeight = 66 // header高度
const reuseTabHeight = 70 // 历史记录栏高度
const marginHeight = 20 // 历史记录栏与舞台的间距
//const sidebarWidth = '210px'
const totalHeight = navBarHeight + reuseTabHeight + marginHeight
export default defineComponent({
  name:'Home',
  components: {SideBar, AppMain,MenuTab,
    TheHeader,BreadCrumb,ThemeChange,screenFull
    },
  setup() {
    let  foldState=ref(false) // 控制左侧菜单栏按键
    let  isCollapse=ref(false) // 左侧菜单栏是否折叠
    let sidebarWidth=ref('210px') // 左侧菜单栏展开的宽度
    let clientWidth=ref(0) // 页面宽度
    let clientHeight=ref(0) // 页面高度
    let isPhone=ref(false)
    const asideStyle=computed(()=>{
      const style = {}
      if (isPhone.value) {
        style['position'] = 'absolute'
        style['height'] = `${clientHeight.value}px`
        style['zIndex'] = 12
        if (isCollapse.value === false) {
          style['transform'] = `translateX(-${sidebarWidth.value})`
        } else {
          style['transform'] = 'translateX(0)'
        }
      }
      return style
    })
    const setResize=()=> {
      clientHeight.value = document.body.clientHeight
      clientWidth.value = document.body.clientWidth
      //???this.$refs.appMain.$el.style.minHeight = `${this.clientHeight - totalHeight + 20}px`
    }
    // 控制菜单折叠
    const changeSlidebarState=()=> {
      isCollapse.value = !isCollapse.value
      foldState.value = !foldState.value;
    }
    /* computed:{
      elMenuCollapse() {
      if (this.isPhone) {
        return false
      }

      return this.isCollapse
    },
    } */
    watch(isCollapse,()=>{
      if (isPhone.value) {
        // 手机模式
        sidebarWidth.value = '210px'
        if (isCollapse.value === false) {
          //this.transX = 0
        } else {
          //this.transX = -1 * sidebarWidth
        }
        } else {
          //this.transX = 0
          sidebarWidth.value = isCollapse.value === false ? '210px' : '56px'
        }
    })
    onMounted(()=>{
      setResize()
      if (clientWidth.value < 500) {
        isPhone.value = true
      } else {
        isPhone.value = false // 检测屏幕宽度, 确定默认是否展开
        if (clientWidth.value <= 768) {
          // emitter.emit('removeSidebarSearch')
          isCollapse.value = true
        } else {
          isCollapse.value = false
          //emitter.emit('showSidebarSearch')
        }
      }
      // 监测屏幕宽度 折叠左侧菜单栏
      window.onresize = () => {
        setResize()
        if (clientWidth.value <= 500) {
          isPhone.value = true
        } else if (clientWidth.value <= 800) {
          isPhone.value = false
        }
      }
    })
    return {
      foldState,
      isCollapse,
      sidebarWidth,
      clientWidth,
      clientHeight,
      isPhone,
      asideStyle,
      changeSlidebarState
      
    };
  },
});
</script>
<style lang="less">
.iconfont {
        font-size: 20px;
        font-weight: 500;
        color:#333;
        cursor: pointer;
        transform: rotate(0deg);
        transition: all 0.3s linear;
        margin-right: 10px;
        display: inline-block;
        float:left;
        &:hover {
          color: #3963bc;
        }
}
.rotate {
        transform: rotate(180deg);
        transition: all 0.3s linear;
}
.sidenav-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: none;
  cursor: pointer;

  &.show {
    display: block;
  }
}
</style>
