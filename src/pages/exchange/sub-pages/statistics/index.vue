<template>
  <div>
    <span class="back" @click="handleBackEvent"> <LeftOutlined />返回 </span>
  </div>
  <div class="statistics-box">
    <iframe class="statistics" :src="url" frameborder="0"></iframe>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { LeftOutlined } from '@ant-design/icons-vue';
import storage from "@/utils/storage";
export default defineComponent({
  components: {
    LeftOutlined
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { actId } = route.query;
    const merchantNum = storage.get("merchantNum");
    const devId = 'x-crmali'
    const url: Ref<string> = ref(`https://bp.enbrands.com/seeReport?app_id=224&report_id=180&dev_id=${devId}&business_id=TB&act_id=${actId}&merchant_id=${merchantNum}`)
    const handleBackEvent = () => {
      router.go(-1)
    }
    return {
      handleBackEvent,
      url
    };
  }
});
</script>

<style lang="less" scoped>
.back {
  cursor: pointer;
}

.statistics-box,
.statistics {
  width: 100%;
  height: 100%;
}
</style>
