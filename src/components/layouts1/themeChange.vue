<template>
  <div>
    <a-button @click="handleThemeChange('1')" type="primary">sun(亮色)</a-button>
    <a-button @click="handleThemeChange('2')" type="primary">dark（黑暗）</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref,onMounted } from "vue";

const THEME_MAP_CLASS = {
    '1': 'sun',
    '2': 'dark'
};
const THEME_SET = {
    DEFAULT: '1',
    DARK: '2',
  };
export default defineComponent({
  name: "ThemeChange",
  setup(_: any, ctx: any) {
    let currentTheme=ref('1');
    const handleThemeChange=(theme = THEME_SET.DEFAULT) =>{
        if (currentTheme.value !== theme) {
          currentTheme.value = theme;
          document.getElementsByTagName('body')[0].className = THEME_MAP_CLASS[currentTheme.value];
          localStorage.setItem('CURRENT_THEME', currentTheme.value)
        }
    }
    const getCurrentTheme=()=> {
        currentTheme.value = localStorage.getItem('CURRENT_THEME') || THEME_SET.DEFAULT;
        document.getElementsByTagName('body')[0].className = THEME_MAP_CLASS[currentTheme.value];
    }
    onMounted(()=>{
      getCurrentTheme()
    })
    return { 
        handleThemeChange,
        getCurrentTheme,
        currentTheme
    };
  }
});
</script>
<style lang="less" scoped>


</style>
<style lang="less">

</style>
