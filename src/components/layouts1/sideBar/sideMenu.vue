<template>
  <div>
     <a-menu
      mode="inline"
      checked-children="Dark"
      un-checked-children="Light"
      theme="dark"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @openChange="onOpenChange"
    >
    <menu-tree v-for="item in sidebarList" :key="item.path" :item="item"></menu-tree>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed,onMounted,toRefs,ref } from "vue";
import { useStore } from "vuex";
import MenuTree from './menuTree.vue'
export default defineComponent({
  name: "SideMenu",
  components: {
    MenuTree
  },
  setup(props: any, ctx: any) {
    const store = useStore();
    const sidebarList = computed(
        () => store.getters["init/sidebarList"]
    );
    let collapsed=ref(true)
    const state = reactive({
      rootSubmenuKeys: [],
      openKeys: [],
      selectedKeys: [],
    });
    const onOpenChange = (openKeys: string[]) => {
      /* const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
      if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      } */
    };
    onMounted(()=>{
        console.log(sidebarList.value,'twb')
    })
    return { 
        sidebarList,
        collapsed,
        ...toRefs(state),
        onOpenChange,
    };
  }
});
</script>
<style lang="less" scoped>


</style>
