<template>
  <a-form ref="formRef" >
    <a-form-item ref="name" label="页面背景图"  style="padding-left: 34px; border-bottom: 1px solid #E7EAF4;">
      <div class="clearfix exhange-bg " >
        <div>
        <!-- :imgList="actInfo.bg" -->
          <upload-img ref="childImgLoad" :imgList="exchangeRecord.bg"   @uploadImgList="subUploadImg" />
        </div>
        <div class="photo-rule">
          <div>*尺寸建议375*724</div>
          <div>*支持png、jpg、jpeg</div>
          <div>*大小不超过1M</div>
          <div>
            <a-button style=" margin: 0;padding: 0" @click="hanldeRest" type="link">重置</a-button>
          </div>
        </div>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, PropType } from "vue";
import uploadImg from "../upload-img.vue";
import deepClone from 'clone'
import {  DecorateInfo } from "../../types/index";
export default defineComponent({
  components: { uploadImg },
  props: {
    baseInfoData: {
      type: Object as PropType<DecorateInfo>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    }
  },
  emits: ['updateValue'],
  setup(props, context) {
    const exchangeRecord = reactive(deepClone(props["baseInfoData"]["exchangeRecord"]));
    const childImgLoad = ref()
    const subUploadImg = (list) => {
      console.log(list)
      exchangeRecord.bg = list
    }
    const hanldeRest = () => {
      childImgLoad.value.clearImg()
    }
          const clearBgImg = () => {
      childImgLoad.value.clearImg()
      console.log('excute')
    }
    watch(exchangeRecord, () => {
      context.emit('updateValue', exchangeRecord)
    })
    return { childImgLoad, exchangeRecord, subUploadImg, hanldeRest, clearBgImg };
  },
});
</script>

<style lang="less" scoped>
// 颜色按钮
input[type="color"] {
  width: 16px;
  height: 16px;
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
// 表单样式之兑换
.exhange-bg {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
//  图片规则样式
.photo-rule {
  color: #999;
  font-size: 12px;
  line-height: 18px;
}

.ml-34 {
  margin-left: 34px;
}
//默认
.desc-label {
  margin-left: 34px;
}
</style>
