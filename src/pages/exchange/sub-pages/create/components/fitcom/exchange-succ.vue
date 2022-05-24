<template>
  <a-form ref="formRef" >
    <a-form-item ref="name" label="弹窗背景"  style="padding-left: 34px; border-bottom: 1px solid #E7EAF4;">
      <div class="clearfix exhange-bg " >
        <div>
            <upload-img ref="childImgLoad" :imgList="exchangeSucc.bg"   @uploadImgList="subUploadImg" />
        </div>
        <div class="photo-rule">
          <div>*尺寸建议240*310</div>
          <div>*支持png、jpg、jpeg</div>
          <div>*大小不超过1M</div>
          <div>
            <a-button style=" margin: 0;padding: 0" @click="handleReset" type="link">重置</a-button>
          </div>
        </div>
      </div>
    </a-form-item>
    <a-form-item label="查看详情按钮"  style="padding-bottom: 24px;padding-left: 34px; border-bottom: 1px solid #E7EAF4;">
      <div class="picker-wrap">
        <span class="desc-label">背景颜色：</span> 
        <span class="color-wrap"> 
           <color-input   style="width: 16px; height:16px"  v-model="exchangeSucc.detailBtn.bg"></color-input > 
        </span>
        <span  class="desc-label">文字颜色：</span> 
        <span class="color-wrap">
           <color-input  class="color-picker" v-model="exchangeSucc.detailBtn.color"></color-input >
        </span>
      </div>
    </a-form-item>
        <a-form-item label="返回主页按钮"  style="padding-bottom: 24px;padding-left: 34px; border-bottom: 1px solid #E7EAF4;">
      <div class="picker-wrap">
        <span class="desc-label">背景颜色：</span> 
        <span class="color-wrap">
            <color-input  class="color-picker"  v-model="exchangeSucc.backBtn.bg"></color-input >
          </span>
        <span  class="desc-label">文字颜色：</span> 
          <span class="color-wrap">
            <color-input  class="color-picker"   v-model="exchangeSucc.backBtn.color"></color-input >
          </span>
      </div>
    </a-form-item>
        <a-form-item label="通用"  style=" padding-bottom: 180px;padding-left: 34px;">
      <div class="picker-wrap">
        <span class="desc-label">背景颜色：</span> 
        <span class="color-wrap">
          <color-input  class="color-picker"   v v-model="exchangeSucc.common.bg"></color-input >
        </span>
      </div>
    </a-form-item>
    <!-- <a-form-item ref="name" label="通用">
        <div class="clearfix">
          <div>活动规则按钮：</div>
          <div>
            我是颜色一<input
              type="color"
              :value="color1"
              @input="onChange($event.target.value)"
            />
          </div>
          <div>
            我是颜色二<input
              type="color"
              :value="color2"
              @input="onChange($event.target.value)"
            />
          </div>
        </div>
    </a-form-item>-->
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, PropType } from "vue";
import uploadImg from "../upload-img.vue";
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
    console.log(JSON.stringify(props["baseInfoData"]["exchangeSucc"]), 'success')
    const exchangeSucc = reactive(props["baseInfoData"]["exchangeSucc"]);
    const childImgLoad = ref()
    const handleReset = () => {
      childImgLoad.value.clearImg()
      exchangeSucc.bg = []
    }
    const subUploadImg = (list) => {
      console.log(list, 'uploadImguploadImg')
      exchangeSucc.bg = list && list.length > 0 ? list: []
    }
      const clearBgImg = () => {
      childImgLoad.value.clearImg()
      console.log('excute')
    }
    watch(exchangeSucc, () => {
      context.emit('updateValue', exchangeSucc)
      console.log(exchangeSucc, 'exchangeSucc')
    }, { deep: true })
    return {  exchangeSucc, subUploadImg, childImgLoad, handleReset, clearBgImg };
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
  // margin-top: 8px;
  display: flex;
  align-items: center;
}

.color-wrap {
  display: inline-block;
  height: 18px;
  border: 1px solid #000;
}

.color-picker {
  width: 16px;
  height: 16px;
}
</style>
