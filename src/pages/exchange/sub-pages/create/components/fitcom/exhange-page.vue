<template>
  <a-form ref="formRef" :model="exchangeState">
    <a-form-item
      ref="name"
      label="活动封面"
      style="padding-left: 34px; border-bottom: 1px solid #E7EAF4;"
    >
      <div class="clearfix exhange-bg">
        <div>背景图：</div>
        <div>
          <upload-img ref="childImgLoad" :imgList="exchangePage.bgInfo" @uploadImgList="uploadImg" />
        </div>
        <div class="photo-rule">
          <div>*尺寸建议375*724</div>
          <div>*支持png、jpg、jpeg</div>
          <div>*大小不超过1M</div>
          <div>
            <a-button @click="handleRest" style=" margin: 0;padding: 0" type="link">重置</a-button>
          </div>
        </div>
      </div>
    </a-form-item>
    <a-form-item
      label="活动规则按钮"
      style="padding-bottom: 24px;padding-left: 34px; border-bottom: 1px solid #E7EAF4;"
    >
      <div class="picker-wrap">
        <span class="desc-label">背景颜色：</span>
        <span class="color-warp">
          <color-input class="color-picker" v-model="exchangePage.actRuleBtn.bg"></color-input>
        </span>
        <span class="desc-label">文字颜色：</span>
        <span class="color-warp">
          <color-input class="color-picker" v-model="exchangePage.actRuleBtn.color"></color-input>
        </span>
      </div>
    </a-form-item>
    <a-form-item
      label="兑换记录按钮"
      style="padding-bottom: 24px;padding-left: 34px; border-bottom: 1px solid #E7EAF4;"
    >
      <div class="picker-wrap">
        <span class="desc-label">背景颜色：</span>
        <span class="color-warp">
          <color-input class="color-picker" v-model="exchangePage.recordBtn.bg"></color-input>
        </span>
        <span class="desc-label">文字颜色：</span>
        <span class="color-warp">
          <color-input class="color-picker" v-model="exchangePage.recordBtn.color"></color-input>
        </span>
      </div>
    </a-form-item>
    <a-form-item label="立即兑换按钮" style=" padding-bottom: 180px;padding-left: 34px;">
      <div class="picker-wrap">
        <span class="desc-label">背景颜色：</span>
        <span class="color-warp">
          <color-input class="color-picker" v-model="exchangePage.exhangeBtn.bg"></color-input>
        </span>
        <span class="desc-label">文字颜色：</span>
        <span class="color-warp">
          <color-input class="color-picker" v-model="exchangePage.exhangeBtn.color"></color-input>
        </span>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
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
    console.log(JSON.stringify(props["baseInfoData"]), 'dddddddddddddd存储超长错_>')
    const exchangePage = ref(deepClone(props["baseInfoData"]['exchangePage']))
    const color1 = ref('#000');
    const onChange = () => {
      console.log('color唱歌')
    }
    const exchangeState = ref({})
    const uploadImg = (list) => {
      exchangePage.value.bgInfo = list && list.length > 0 ? list : []
    }
    const childImgLoad = ref();
    const handleRest = () => {
      childImgLoad.value.clearImg()
    }
    watch(exchangePage, () => {
      context.emit('updateValue', exchangePage)
    }, { deep: true })
    const clearBgImg = () => {
      childImgLoad.value.clearImg()
      console.log('excute')
    }
    return { color1, onChange, exchangeState, uploadImg, exchangePage, handleRest, childImgLoad, clearBgImg };
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
//默认
.desc-label {
  margin-left: 34px;
}


:deep(.box) {
  width: 16px;
  height: 16px;
  border-radius: 0%;
}

.picker-wrap {
  display: flex;
  margin-top: 8px;
  align-items: center;
}

.color-picker {
  width: 16px;
  height: 16px;
}

.color-warp {
  display: inline-block;
  height: 18px;
  border: 1px solid #000;
}
</style>
