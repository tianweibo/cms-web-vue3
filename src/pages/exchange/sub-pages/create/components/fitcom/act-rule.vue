<template>
  <a-form ref="formRef" :model="actInfo">
    <a-form-item
      ref="name"
      label="规则底图:"
      style="width: 100%;padding-left: 34px; border-bottom: 1px solid #E7EAF4;"
    >
      <div class="clearfix exhange-bg">
        <div>
          <upload-img ref="childImgLoad" :imgList="actInfo.bg" @uploadImgList="subUploadImg" />
        </div>
        <div class="photo-rule">
          <div>*尺寸建议284*400</div>
          <div>*支持png、jpg、jpeg</div>
          <div>*大小不超过1M</div>
          <div>
            <a-button style=" margin: 0;padding: 0" @click="handleReset" type="link">重置</a-button>
          </div>
        </div>
      </div>
    </a-form-item>
    <template v-if="rootData.baseForm.activeRules === '1'">
      <a-form-item label="兑换记录按钮" style="padding-bottom: 24px;padding-left: 34px; ">
        <div>
          <editor-two :content="actInfo.textObj.richTxt" @contentChange="richChange" />
        </div>
      </a-form-item>
      <a-form-item label="文字颜色" style="padding-left: 34px;">
        <div class="picker-wrap">
          <span class="color-warp">
            <color-input v-model="actInfo.textObj.color"></color-input>
          </span>
        </div>
      </a-form-item>
    </template>
    <template v-if="rootData.baseForm.activeRules === '2'">
      <a-form-item
        ref="name"
        label="规则图片:"
        style="width: 100%;padding-left: 34px; border-bottom: 1px solid #E7EAF4;"
      >
        <div class="clearfix exhange-bg">
          <div>
            <upload-img
              ref="childImgLoadtxt"
              :imgList="actInfo.imageObj.txtBg"
              @uploadImgList="ruleUploadImg"
            />
          </div>
          <div class="photo-rule">
            <div>*尺寸建议284*400</div>
            <div>*支持png、jpg、jpeg</div>
            <div>*大小不超过1M</div>
            <div>
              <a-button style=" margin: 0;padding: 0" @click="handleResetTxt" type="link">重置</a-button>
            </div>
          </div>
        </div>
      </a-form-item>
    </template>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, PropType } from "vue";
import uploadImg from "../upload-img.vue";
import editorTwo from '../editor-two.vue'
import deepClone from 'clone'
import ColorInput from 'vue-color-input'
import { FullData, DecorateInfo } from "../../types/index";
export default defineComponent({
  components: {
    uploadImg,
    editorTwo,
    ColorInput
  },
  props: {
    rootData: {
      type: Object as PropType<FullData>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    baseInfoData: {
      type: Object as PropType<DecorateInfo>,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    }
  },
  emits: ['updateValue'],
  setup(props, context) {
    console.log(props["rootData"], "rootDatarootData");
    console.log(props, JSON.stringify(props["baseInfoData"]["actRule"]), 'contextcontext')
    const actInfo = reactive(deepClone(props["baseInfoData"]["actRule"]))
    // eslint-disable-next-line vue/no-setup-props-destructure
    actInfo.type = props["rootData"]["baseForm"]["activeRules"]
    if (props["baseInfoData"]["actRule"]) {
      actInfo.bg = deepClone(props["baseInfoData"]["actRule"].bg)
      actInfo.type = deepClone(props["rootData"]["baseForm"]["activeRules"])
    }
    const childImgLoad = ref()
    const childImgLoadtxt = ref()
    // 监听底图改变
    // 监听规则图片改变
    // 监听文本改变
    const richChange = (state) => {
      console.log(state.content, 'state')
      actInfo.textObj.richTxt = state.content
    }
    if (props["rootData"]["baseForm"]["ruleText"]) {
      actInfo.textObj.richTxt = `<p>${props["rootData"]["baseForm"]["ruleText"]}</p>`
    }
    const subUploadImg = (list) => {
      console.log(list, 'uploadImguploadImg1')
      actInfo.bg = list
      console.log(actInfo, 'uploadImguploadImg1')
    }
    const ruleUploadImg = (list) => {
      console.log(list, 'uploadImguploadImg2')
      actInfo.imageObj.txtBg = list
    }
    // 重置
    const handleResetTxt = () => {
      childImgLoadtxt.value.clearImg()
    }
    const handleReset = () => {
      childImgLoad.value.clearImg()
    }
    const clearBgImg = () => {
      childImgLoad.value.clearImg()
      console.log('excute')
    }
    watch(actInfo, () => {
      console.log(actInfo, 'actInfoactInfoactInfo')
      context.emit('updateValue', actInfo)
    }, { deep: true })
    // watch(() => props["baseInfoData"]["actRule"], () => {
    //   if (props["baseInfoData"]["actRule"]) {
    //     actInfo.bg = deepClone(props["baseInfoData"]["actRule"].bg)
    //     actInfo.type = deepClone(props["rootData"]["baseForm"]["activeRules"])
    //   }
    // })
    return { childImgLoadtxt, childImgLoad, actInfo, richChange, subUploadImg, ruleUploadImg, handleResetTxt, handleReset, clearBgImg };
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
// .picker-popup {
//   position: relative;
// }
.picker-wrap {
  margin-top: 8px;
}

:deep(.box) {
  width: 16px;
  height: 16px;
  border-radius: 0%;
}

.color-input :deep(.picker-popup) {
  position: absolute;
  z-index: 9999;
  margin-left: 80px !important;
}

.color-warp {
  display: inline-block;
  height: 18px;
  border: 1px solid #000;
}
</style>
