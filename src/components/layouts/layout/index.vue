<template>
  <a-layout class="layout">
    <a-layout-header v-if="isShowMenu"> <Header @changeMenu="changeMenu" /> </a-layout-header>
    <a-layout>
      <a-layout-sider v-if="isShowMenu">
        <MenuLeft :menulist="leftMenu" />
      </a-layout-sider>
      <a-layout-content>
        <div class="page-box">
          <Breadcrumb v-if="false"></Breadcrumb>
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { reactive, computed, onMounted, ref } from "vue";
import MenuLeft from "@/components/layouts/menuLeft/index.vue";
import Header from "@/components/layouts/header/index.vue";
import { useRoute } from "vue-router";

export default {
  components: { Header, MenuLeft },
  setup() {
    const isShowMenu = ref(false);
    const leftMenu: any = reactive([]);
    const changeMenu = function(menu: any) {
      leftMenu.splice.apply(leftMenu, [0, leftMenu.length, ...menu]);
    };

    const route = useRoute();
    const key = computed(() => (route.path !== void 0 ? `${route.path}${new Date()}` : new Date()));

    onMounted(() => {
      let storage = localStorage.getItem("isShowMenu") === "1";
      isShowMenu.value = storage;
    });
    return {
      leftMenu,
      changeMenu,
      key,
      isShowMenu
    };
  }
};
</script>
<style lang="less" scoped>
.ant-layout-header {
  padding: 0 20px;
}

.layout {
  min-width: 1200px;
  height: 100%;

  .header-box {
    height: 100%;
    color: #fff;
  }

  .logo {
    width: 180px;
    height: 40px;
    background-image: url(https://biv.oss-cn-hangzhou.aliyuncs.com/common/logo.png);
    background-size: cover;
  }
}
</style>
