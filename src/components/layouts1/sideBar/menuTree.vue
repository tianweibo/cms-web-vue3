<template>
    <a-sub-menu v-if="item.children?.length >= 0" :key="item.path">
        <template #title>
            <span class="anticon">
                <i v-if="!filterIcon(item.icon)" :class="item.icon"></i>
                <img v-else :src="item.icon" class="img-icon" />
                <span>{{ item.title }}</span>
            </span>
            
        </template>
        <menu-tree v-for="child in item.children" :key="child.path" :item="child" />
    </a-sub-menu>
    <a-menu-item v-else :key="item.path" @click="navigateTo(item.path)">
        <span class="anticon">
            <i v-if="!filterIcon(item.icon)" :class="item.icon"></i>
            <img v-else :src="item.icon" class="img-icon" />
            <span>{{ item.title }}</span>
        </span>
    </a-menu-item>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
//import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  name: "MenuTree",
  components: {
    
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(_: any, ctx: any) {
    const router = useRouter();
    const navigateTo=(path)=> {
      router.push(path)
    }
    const filterIcon=(icon) =>{
      return icon.indexOf('/') !== -1
    }
    return { 
        filterIcon,
        navigateTo
    };
  }
});
</script>
<style lang="less" scoped>
.img-icon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  margin-left: 5px;
  display: inline-block;
  transform: translateY(21px);
}

.iconfont {
  margin-right: 10px;
  margin-left: 5px;
  color: #fff;
  height: 20px;
}
.title {
  display: inline-block;
}
.ant-menu.ant-menu-inline-collapsed>.ant-menu-item .anticon span{
    opacity: 0;
}
.ant-menu.ant-menu-inline-collapsed>.ant-menu-submenu .anticon span{
    opacity: 0;
}
</style>
