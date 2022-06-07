<template>
  <ul class="r-text-component">
    <li class="clearfix r-text-item" style="borderBottom:1px solid #D3D9E6">
      <span class="theLabel">
        是否显示按钮：
      </span>
      <span class="theValue">
        <a-checkbox v-model:checked="theDisplay" @change="value => changeValue(value, 'display')" />
      </span>
    </li>
    <a-row type="flex" justify="center" align="middle">
    <a-col :span="3">
      <p class="height-50">上边距：</p>
    </a-col>
    <a-col :span="5">
      <p class="height-50"><a-input-number
          id="inputNumber"
          v-model:value="theTop"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'top')"
        /></p>
    </a-col>
    <a-col :span="3">
      <p class="height-50">行间距</p>
    </a-col>
    <a-col :span="5">
      <p class="height-50"> <a-input-number
          id="inputNumber"
          v-model:value="theLineHeight"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'lineHeight')"
        /></p>
    </a-col>
  </a-row>
   <a-row type="flex" justify="center" align="middle">
    <a-col :span="3">
      <p class="height-50">按钮高度：</p>
    </a-col>
    <a-col :span="5">
      <p class="height-50"><a-input-number
          id="inputNumber"
          v-model:value="theHeight"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'height')"
        /></p>
    </a-col>
    <a-col :span="3">
      <p class="height-50">按钮宽度</p>
    </a-col>
    <a-col :span="5">
      <p class="height-50"> <a-input-number
          id="inputNumber"
          v-model:value="theWidth"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'width')"
        />
      </p>
    </a-col>
  </a-row>
   <a-row type="flex" justify="center" align="middle">
    <a-col :span="2">
      <p class="height-50">按钮格式：</p>
    </a-col>
    <a-col :span="6">
      <p class="height-50"><a-radio-group v-model:value="theRadio" @change="v => {changeValue(v, 'type');}">
            <a-radio value="0">文字格式</a-radio>
            <a-radio value="1">图片格式</a-radio>
          </a-radio-group></p>
    </a-col>
     <a-col :span="2"></a-col>
     <a-col :span="6"></a-col>
  </a-row>
  <a-row type="flex" justify="center" align="middle">
    <a-col :span="16">
      <div style="border:1px solid #D3D9E6;height:120px;borderRadius:6px" v-if="theRadio=='0'">
           <a-row type="flex" justify="space-around" align="middle">
              <a-col :span="3">
                  <p class="height-50">文字大小：</p>
              </a-col>
              <a-col :span="3">
                  <p class="height-50">
                    <a-input-number
                      v-model:value="theFontSize"
                      :min="10"
                      :max="60"
                    @change="value => changeValue(value, 'fontSize')"
                    />
                  </p>
              </a-col>
               <a-col :span="3"><p class="height-50">文字颜色：</p></a-col>
                <a-col :span="2">
                  <p class="height-50">
                  <color-picker
                    :value="theColor"
                    @change="v => {changeValue(v, 'color');}"
                  ></color-picker>
                  </p></a-col>
                <a-col :span="3"><p class="height-50">背景颜色：</p></a-col>
                <a-col :span="2"><p class="height-50"><color-picker
                    :value="theBackgroundColor"
                    @change="v => {changeValue(v, 'backgroundColor');}"
                  ></color-picker></p></a-col>
            </a-row>
            <a-row type="flex" justify="space-around" align="middle">
              <a-col :span="3">
                  <p class="height-50">文案：</p>
              </a-col>
              <a-col :span="18">
                  <p class="height-50">
                    <a-input v-model:value="theText" @change="value => changeValue(value, 'text')" />
                  </p>
              </a-col>
            </a-row>
      </div>
      <div style="border:1px solid #D3D9E6;height:120px;borderRadius:6px" v-if="theRadio=='1'">
                  <uploadImg
          :size="'250*250'"
          :space="10"
          :para="'backgroundImage'"
          :textpos="'common'"
          :picUrl='theBackground'
          @imageUrl="imageUrl"
        ></uploadImg>
      </div>
    </a-col>
  </a-row>
   <!--  <li class="clearfix r-text-item">
      <span class="theLabel">
        x轴坐标：
      </span>
      <span class="theValue">
        <a-input-number
          id="inputNumber"
          v-model:value="theLeft"
          :min="0"
          :max="500"
          @change="value => changeValue(value, 'left')"
        />
      </span>
    </li> -->
    
   
    <!-- 
    <li class="clearfix r-text-item" v-if="theRadio=='1'">
      <span class="theLabel">
        按钮图片：
      </span>
      <span class="theValue">
        嘻嘻嘻嘻嘻嘻嘻
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        边框圆角：
      </span>
      <span class="theValue">
        <a-slider
          v-model:value="theBorderRadius"
          @change="
            v => {
              changeValue(v, 'borderRadius');
            }
          "
        />
      </span>
    </li>
    <shadow-picker
      :values="theShadow"
      @change="
        v => {
          changeValue(v, 'boxShadow');
        }
      "
    ></shadow-picker> -->
    <!-- <li class="clearfix r-text-item">
      <span class="theLabel">
        边框颜色：
      </span>
      <span class="theValue">
        <color-picker
          :value="theborderColor"
          @change="
            v => {
              changeValue(v, 'borderColor');
            }
          "
        ></color-picker>
      </span>
    </li> -->
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ColorPicker from "./color-picker.vue";
import uploadImg from "./upload-img.vue";
//import ShadowPicker from "../ShadowPicker.vue";
import useComponentCommon from "../../../hocks/use-component-common";
import {
  transformToComponentProps,
  btn,
  //btnStylePropNames
} from "@/store/data-type/common";
const defaultProps = transformToComponentProps(btn);

// array that contains style props
export default defineComponent({
  name: "r-btn",
  props: {
    ...defaultProps
  },
  components: {
    ColorPicker,
    uploadImg
   // ShadowPicker
  },
  emits: ["change"],
  setup(props, context) {
    //const { styleProps, handleClick } = useComponentCommon(props, btnStylePropNames);
    const changeValue = (e: any, param: string) => {
      let obj = {
        key: param,
        value: e
      };
      context.emit("change", obj);
    };
    let theShadow = computed(() => props.boxShadow);
    let theDisplay = computed(() => {
      if (props.display == "block") {
        return true;
      } else {
        return false;
      }
    });
    let theBackground = computed(() => {
      let a=props.backgroundImage.match(/\(([^)]*)\)/)
      if(a && a[1]){
        return a[1];
      }else{
        return ''
      }
    })
    let theRadio=computed(() => props.type)
    let theTop = computed(() => parseInt(props.top));
    let theLeft = computed(() => parseInt(props.left));
    let theColor = computed(() => props.color);
    let theBackgroundColor = computed(() => props.backgroundColor);
    let theborderColor = computed(() => props.borderColor);
    let theBorderRadius = computed(() => parseInt(props.borderRadius));
    let theWidth = computed(() => parseInt(props.width));
    let theLineHeight = computed(() => parseInt(props.lineHeight));
    let theHeight = computed(() => parseInt(props.height));
    let theFontSize = computed(() => parseInt(props.fontSize));
    let theText = computed(() => props.text);
    const imageUrl = (data: { para: string; name: string }) => {
      let obj = {
        key: data.para,
        value: data.name
      };
      context.emit("change", obj);
    };
    return {
      theRadio,
      imageUrl,
      checked: ref(false),
      theTop,
      theLeft,
      theWidth,
      theDisplay,
      theHeight,
      theborderColor,
      theShadow,
      theLineHeight,
      theFontSize,
      theColor,
      theBackgroundColor,
      theBorderRadius,
      theText,
      theBackground,
      //styleProps,
      //handleClick,
      changeValue,
      value: ref(false)
    };
  }
});
</script>

<style scoped>
@import "../common/r-common.less";
.height-50{
 height:50px;
 line-height: 50px;
}
</style>
