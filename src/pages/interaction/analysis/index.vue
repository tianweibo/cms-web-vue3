<template>
  <div>
    <span class="back" @click="handleBackEvent">
      <LeftOutlined />返回
    </span>
  </div>
    <div class="statistics-box">   <iframe class="statistics" :src="url" frameborder="0"></iframe></div>
</template>
<script lang="ts">
import storage from '@/utils/storage'
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LeftOutlined } from '@ant-design/icons-vue';
export default defineComponent({
      components: {
    LeftOutlined
  },
    setup() {
        const router = useRouter()
        const route = useRoute()
         const merchantNum = storage.get("merchantNum");
         console.log(merchantNum, route.query.id)
        // const url = merchantNum + route.query.id
        const url = 'https://bp.enbrands.com/seeReport?app_id=224&report_id=180'
        const handleBackEvent = () => {
            router.go(-1)
        }
        return {
            handleBackEvent,
          url
        }
    },
})
</script>
<style scoped>

.back {
  cursor: pointer;
}
.statistics-box,.statistics {
  width: 100%;
  height: 100%;
}

</style>
