<template>
  <a-form ref="formRef">
    <a-form-item
      ref="name"
      label="活动封面"
      style="padding-left: 34px; border-bottom: 1px solid #E7EAF4;"
    >
      <div class="clearfix exhange-bg">
        <div>背景图：</div>
        <div>
          <upload-img ref="childImgLoad" :imgList="exchangeRecord.bg" @uploadImgList="imgupload" />
        </div>
        <div class="photo-rule">
          <div>*尺寸建议240*188</div>
          <div>*支持png、jpg、jpeg</div>
          <div>*大小不超过1M</div>
          <div>
            <a-button style=" margin: 0;padding: 0" @click="handleReset" type="link">重置</a-button>
          </div>
        </div>
      </div>
    </a-form-item>
    <a-form-item
      label="取消按钮"
      style="padding-bottom: 24px;padding-left: 34px; border-bottom: 1px solid #E7EAF4;"
    >
      <div class="picker-wrap">
        <span class="desc-label">背景颜色：</span>
        <span class="color-wrap">
          <color-input class="color-picker" v-model="exchangeRecord.cancelbtn.bg"></color-input>
        </span>

        <span class="desc-label">文字颜色：</span>

        <span class="color-wrap">
          <color-input class="color-picker" v-model="exchangeRecord.cancelbtn.color"></color-input>
        </span>
      </div>
    </a-form-item>
    <a-form-item
      label="确定按钮"
      style="padding-bottom: 24px;padding-left: 34px; border-bottom: 1px solid #E7EAF4;"
    >
      <div class="picker-wrap">
        <span class="desc-label">背景颜色：</span>

        <span class="color-wrap">
          <color-input class="color-picker" v-model="exchangeRecord.confirm.bg"></color-input>
        </span>
        <span class="desc-label">文字颜色：</span>
        <span class="color-wrap">
          <color-input class="color-picker" v-model="exchangeRecord.confirm.color"></color-input>
        </span>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, PropType } from "vue";
import uploadImg from "../upload-img.vue";
import deepClone from 'clone'
import ColorInput from 'vue-color-input'
import {  DecorateInfo } from "../../types/index";
export default defineComponent({
  components: { uploadImg, ColorInput },
  props: {
    baseInfoData: {
      type: Object as PropType<DecorateInfo>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    }
  },
  emits: ['updateValue'],
  setup(props, context) {
    const exchangeRecord = reactive(deepClone(props["baseInfoData"]["comfirmExchange"]));
    const imgupload = (list) => {
      exchangeRecord.bg = list
    }
    const childImgLoad = ref()
    const handleReset = () => {
      childImgLoad.value.clearImg()
    }
          const clearBgImg = () => {
      childImgLoad.value.clearImg()
      console.log('excute')
    }
    watch(exchangeRecord, () => {
      context.emit('updateValue', exchangeRecord)
    })
    return { exchangeRecord, imgupload, childImgLoad, handleReset , clearBgImg };
  },
});
</script>
<style>
.picker-wrap .color-input .box {
  width: 16px;
  height: 16px;
  border-radius: 0;
}
</style>
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

:deep(.box) {
  width: 16px;
  height: 16px;
  border-radius: 0%;
}
//默认
.desc-label {
  margin-left: 34px;
}

.picker-wrap {
  // margin-top: 8px;
  display: flex;
  align-items: center;
}

.color-picker {
  width: 16px;
  height: 16px;
}

.color-wrap {
  display: inline-block;
  height: 18px;
  border: 1px solid #000;
}
</style>
