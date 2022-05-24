<template>
  <div class="box">
  <div>您可以通过分享活动链接，来邀请会员参加活动</div>
  <div class="qr-wrap">
   <QrcodeVue :value="text" :size="300" level="H"></QrcodeVue>
   </div>
   <div class="input-warp">
      <span style="width:220px"><a-input type="text" :value="text" /></span> <span style="margin-left:16px"><a-button @click="copyText" type="primary">复制</a-button></span>
   </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, PropType } from 'vue';
import useClipboard from 'vue-clipboard3'
import QrcodeVue from "qrcode.vue"
import { message } from 'ant-design-vue';
import { QrInfo } from '../types/index'
export default defineComponent({
  name: 'QrCard',
  props: {
    qrInfo: Object as PropType<QrInfo>
  },
  components: {
    QrcodeVue
  },
  setup(props) {
    const { toClipboard } = useClipboard()
    const text: Ref<string> = ref('');
    text.value = ''
    if (props && props['qrInfo']) {
      console.log(props['qrInfo'], 'props[]')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      text.value = props['qrInfo']['link']|| ''
    }
    const copyText = async () => {
      try {
        await toClipboard(text.value)
        console.log('Copied to clipboard')
        message.success('复制成功')
      } catch (e) {
        console.error(e)
        message.success('复制失败')
      }
    }
    return {
      text,
      copyText
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 16px;
}

.qr-wrap {
  margin-top: 8px;
}

.input-warp {
  display: flex;
  flex-direction: row;
  width: 300px;
  margin-top: 8px;
}
</style>