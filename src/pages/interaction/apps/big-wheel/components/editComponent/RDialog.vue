<template>
  <div class='r-text-component'>
    <a-row type="flex" justify="center" align="top" style="borderBottom:1px solid #D3D9E6;height:100px;">
    <a-col :span="4" >
      <p class="height-100 title">
        效果预览:
      </p>
    </a-col>
    <a-col :span="18">
      <div class="height-100">
        <a-radio-group name="radioGroup" v-model:value="theRadio" @change="changeRadio">
          <a-radio value="2">实物奖弹框</a-radio>
          <a-radio value="1">积分奖弹框</a-radio>
          <a-radio value="0">未中奖弹框</a-radio>
        </a-radio-group>
        <div class="tip-content">*此处的弹框中展示的奖品只是预览效果，并不是实际设定的奖品！</div>
      </div>
    </a-col>
  </a-row>
  <!-- <a-row type="flex" justify="center" align="top" style="borderBottom:1px solid #D3D9E6;height:100px;">
    <a-col :span="4" >
      <p class="height-100 title">
        弹框背景:
      </p>
    </a-col>
    <a-col :span="18">
      <div class="height-100">
        <div class="tip-content">*此处的弹框中展示的奖品只是预览效果，并不是实际设定的奖品！</div>
      </div>
    </a-col>
  </a-row> -->
  <a-row type="flex" justify="center" align="top" style="borderBottom:1px solid #D3D9E6;height:100px;">
    <a-col :span="4" >
      <p class="height-100 title">
        弹框标题:
      </p>
    </a-col>
    <a-col :span="18">
      <div class="height-40">
        <span style="margin-right:100px;">字号： <a-input-number
          v-model:value="textFontsize"
          :min="10"
          :max="40"
          @change="value => changeValue(value, 'textFontsize')"
        /></span>
        颜色： <color-picker
          :value="textColor"
          @change="
            v => {
              changeValue(v, 'textColor');
            }
          "
        ></color-picker>
      </div>
      <div class="height-40">
        <span>文案： <a-input style="width:380px" v-model:value="titText" @change="value => changeValue(value, 'text')" /></span>
      </div>
    </a-col>
  </a-row>
   <a-row type="flex" v-if="theRadio == '2'" justify="center" align="top" style="borderBottom:1px solid #D3D9E6;">
    <a-col :span="4" >
      <p class="height-150 title">
        领取按钮:
      </p>
    </a-col>
    <a-col :span="18">
      <div class="height-150">
        <span style="margin-right:100px;">按钮宽度： <a-input-number
          v-model:value="theWidth"
          :min="60"
          :max="150"
          @change="value => changeValue(value, 'width')"
        /></span>
        按钮高度： <a-input-number
          v-model:value="theHeight"
          :min="20"
          :max="40"
          @change="value => changeValue(value, 'height')"
        />
        <div style="margin:10px 0px 10px 0px">
          按钮样式 <a-radio-group v-model:value="theTypeRadio" @change="v => {changeValue(v, 'type');}">
            <a-radio :value=0>文字格式</a-radio>
            <a-radio :value=1>图片格式</a-radio>
          </a-radio-group>
        </div>
        <div style="border:1px solid #D3D9E6;height:100px;padding:0px 10px;borderRadius:6px;margin-top:10px;" v-if="theTypeRadio==0">
          <a-row type="flex" justify="space-around" align="top">
            <a-col :span="8">
              <div class="height-60">
              按钮字号：<a-input-number
                  v-model:value="theFontSize"
                :min="10"
                :max="60"
                  @change="value => changeValue(value, 'fontSize')"
              />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="height-60">
              字体颜色：<color-picker
                      :value="theColor"
                      @change="v => {changeValue(v, 'color');}"
        ></color-picker>
        </div>
            </a-col>
            <a-col :span="8">
              <div class="height-60">
              按钮背景颜色： <color-picker
          :value="theBackground"
          @change="
            v => {
              changeValue(v, 'background');
            }
          "
        ></color-picker>
        </div>
            </a-col>
          </a-row>
          <a-row type="flex" justify="space-around" align="top">
            <a-col :span="24">
            文案：<a-input style="width:380px" v-model:value="btnText" @change="value => changeValue(value, 'btnText')" />
            </a-col>
          </a-row>
        </div>
        <div style="border:1px solid #D3D9E6;height:100px;padding:0px 10px;borderRadius:6px;margin-top:10px;" v-if="theTypeRadio==1">
           <uploadImg
          :size="'250*250'"
          :space="10"
          :para="'backgroundImage'"
          :textpos="'common'"
          @imageUrl="imageUrl"
        ></uploadImg>
        </div>
      </div>
    </a-col>
  </a-row>
  <a-row type="flex" justify="center" align="top" v-if="theRadio != '0'">
    <a-col :span="4" >
      <p class="height-100 title">
        奖品信息:
      </p>
    </a-col>
    <a-col :span="18">
      <div class="height-40">
        <span style="margin-right:100px;">字号： <a-input-number
          id="inputNumber"
          v-model:value="text1Fontsize"
          :min="10"
          :max="60"
          @change="value => changeValue(value, 'text1Fontsize')"
        /></span>
        颜色： <color-picker
          :value="text1Color"
          @change="
            v => {
              changeValue(v, 'text1Color');
            }
          "
        ></color-picker>
      </div>
       <div class="height-40">
        <span>文案： <a-input style="width:380px" v-model:value="titText1" @change="value => changeValue(value, 'text1')" /></span>
      </div>
    </a-col>
  </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ColorPicker from "../ColorPicker.vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  GlobalDataProps,
  transformToComponentProps,
  timeContent,
  textStylePropNames
} from "../../../../../../../src/store/dataType";
import { useStore } from "vuex";
import uploadImg from "../UploadImg.vue";
const defaultProps = transformToComponentProps(timeContent);
export default defineComponent({
  name: "l-image",
  props: {
    ...defaultProps
  },
  components: {
    ColorPicker,uploadImg
  },
  emits: ["change"],
  setup(props, context) {
    const store = useStore<GlobalDataProps>();
    const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
    const dialogArr = store.getters.getDialogPropsArr;
    let theRadio = ref("2");
    const imageUrl = (data: { para: string; name: string }) => {
      let obj = {
        key: data.para,
        value: data.name
      };
      context.emit("change", obj);
    };
    const changeValue = (e: any, param: string) => {
      let obj = {
        key: param,
        value: e,
        id: dialogArr[+theRadio.value].id
      };
      context.emit("change", obj);
    };
    let textFontsize = ref("");
    let theTypeRadio=ref(0)
    let textColor = ref("");
    let text1Fontsize = ref("");
    let text1Color = ref("");
    let theFontSize = ref("");
    let theBackground = ref("");
    let theWidth = ref("");
    let theHeight = ref("");
    let theColor = ref("");
    let btnText = ref("");
    let titText1=ref("");
    let titText=ref("");
    const changeRadio = (e: any) => {
      store.commit("setActive", dialogArr[+e.target.value].id);
      store.commit("setTheindex", +e.target.value);
      btnText.value = dialogArr[+e.target.value].props.btnText;
      theColor.value = dialogArr[+e.target.value].props.color;

      theHeight.value = dialogArr[+e.target.value].props.height;
      titText.value = dialogArr[+e.target.value].props.text;
      titText1.value = dialogArr[+e.target.value].props.text1;
      theWidth.value = dialogArr[+e.target.value].props.width;
      theBackground.value = dialogArr[+e.target.value].props.background;
      theFontSize.value = dialogArr[+e.target.value].props.fontSize;
      text1Color.value = dialogArr[+e.target.value].props.text1Color;
      text1Fontsize.value = dialogArr[+e.target.value].props.text1Fontsize;
      textColor.value = dialogArr[+e.target.value].props.textColor;
      textFontsize.value = dialogArr[+e.target.value].props.textFontsize;
    };
    onMounted(() => {
      btnText.value = dialogArr[+theRadio.value].props.btnText;
      theColor.value = dialogArr[+theRadio.value].props.color;
      theHeight.value = dialogArr[+theRadio.value].props.height;
      theWidth.value = dialogArr[+theRadio.value].props.width;
      theTypeRadio.value=dialogArr[+theRadio.value].props.type;
      titText.value = dialogArr[+theRadio.value].props.text;
      titText1.value = dialogArr[+theRadio.value].props.text1;
      theBackground.value = dialogArr[+theRadio.value].props.background;
      theFontSize.value = dialogArr[+theRadio.value].props.fontSize;
      text1Color.value = dialogArr[+theRadio.value].props.text1Color;
      text1Fontsize.value = dialogArr[+theRadio.value].props.text1Fontsize;
      textColor.value = dialogArr[+theRadio.value].props.textColor;
      textFontsize.value = dialogArr[+theRadio.value].props.textFontsize;
    });
    return {
      theHeight,
      theTypeRadio,
      theWidth,
      titText1,
      titText,
      theBackground,
      theFontSize,
      text1Color,
      text1Fontsize,
      textColor,
      textFontsize,
      imageUrl,
      dialogArr,
      theColor,
      btnText,
      theRadio,
      styleProps,
      changeRadio,
      handleClick,
      changeValue,
      checked: ref(false),
      value: ref(false)
    };
  }
});
</script>

<style scoped>
@import "./Rcommon.less";
.height-100{
  height: 70px;
  margin-top:10px;
}
.height-40{
  height: 40px;
  margin-top:10px;
}
.height-150{
  height: 160px;
  margin-top:10px;
}
.tip-content{
  height:50px;
  line-height: 50px;
}
.height-60{
  height:60px;
  line-height: 60px;
}
.title{
  font-weight: 700;
  color:#000
}
</style>
