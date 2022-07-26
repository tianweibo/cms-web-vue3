<template>
  <span>
    <a-switch checked-children="明" un-checked-children="暗" checkedValue="1" unCheckedValue="2" @change="handleThemeChange" v-model:checked="currentTheme"/>
  </span>
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
    const handleThemeChange=() =>{
        document.getElementsByTagName('body')[0].className = THEME_MAP_CLASS[currentTheme.value];
        localStorage.setItem('CURRENT_THEME', currentTheme.value)
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
        currentTheme,
    };
  }
});
</script>
<style lang="less" scoped>


</style>
<style lang="less">

</style>
