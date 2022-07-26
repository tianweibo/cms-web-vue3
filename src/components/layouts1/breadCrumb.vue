<template>
  <div class="nav-title">
    <a class="item" v-for="(item, index) in titleArr" style="cursor: default;" :key="index">
      <p>{{ item }}</p>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref ,onMounted} from "vue";
export default defineComponent({
  name:'BreadCrumb',
  setup(_: any, ctx: any) {
    //const stageInfo=computed(()=> this.$store.getters.getStageInfo(this.$route.name))
    const stageInfo=ref('田卫勃')
    //const titleArr=computed(()=> stageInfo.value.map(item => item.title).filter(item => !!item))
    const titleArr=ref(['1506','田卫勃'])
    return{
        stageInfo,
        titleArr
    }
  }
})
</script>
<style lang="less">
.nav-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  width:300px;
  .item {
    i {
      margin-right: 4px;
    }

    display: flex;
    align-items: center;
    padding-right: 18px;
    position: relative;
    color: #999;

    &:after {
      content: '/';
      position: absolute;
      top: 0;
      right: 6px;
    }
  }

  .item:last-child {
    color: #333;
    padding-right: 0;

    &:after {
      content: '';
    }
  }
}
</style>
