<template>
  <ul class="r-text-component">
    <li class="clearfix r-text-item" style="height: 60px">
      <span class="theLabel"> 规则按钮： </span>
      <span class="theValue" style="width: 550px">
        <a-row type="flex" justify="space-around" align="top">
              <a-col :span="4">
                  <p class="height-50">文字大小：</p>
              </a-col>
              <a-col :span="4">
                  <p class="height-50">
                    <a-input-number
                      v-model:value="theFontSize"
                      :min="10"
                      :max="60"
                    @change="value => changeValue(value, 'fontSize')"
                    />
                  </p>
              </a-col>
               <a-col :span="4"><p class="height-50">文字颜色：</p></a-col>
                <a-col :span="2">
                  <p class="height-50">
                  <color-picker
                    :value="theColor"
                    @change="v => {changeValue(v, 'color');}"
                  ></color-picker>
                  </p></a-col>
                <a-col :span="2"><p class="height-50">文案：</p></a-col>
                <a-col :span="5"><p class="height-50"><a-input v-model:value="theRegularText" @change="value => changeValue(value, 'regularText')" /></p></a-col>
            </a-row>
      </span>
    </li>
    
    <li class="clearfix" style="height: 110px" v-if="ruleType=='1'">
      <span class="theLabel r-text-item" style="float:left;"> 规则底图： </span>
      <span class="theValue">
        <uploadImg
          :size="'250*250'"
          :space="10"
          :para="'backgroundImage'"
          :picUrl='theBackground'
          :textpos="'common'"
          @imageUrl="imageUrl"
        ></uploadImg>
      </span>
    </li>
    <li class="clearfix" style="height: 160px" v-if="ruleType=='1'">
      <span class="theLabel r-text-item" style="float:left;"> 文案： </span>
      <span class="theValue" style="width: 480px;">
        <quill-editor
          v-model:value="theContent"
          :options="toolbarOptions"
          @change="onEditorChange($event)"
        />
      </span>
    </li>



     <li class="clearfix" style="height: 110px" v-if="ruleType=='2'">
      <span class="theLabel r-text-item" style="float:left;"> 规则底图： </span>
      <span class="theValue">
        <uploadImg
          :size="'250*250'"
          :picUrl='theBackground'
          :space="10"
          :para="'backgroundImage'"
          :textpos="'common'"
          @imageUrl="imageUrl"
        ></uploadImg>
      </span>
    </li>
    <li class="clearfix" style="height: 110px" v-if="ruleType=='2'">
      <span class="theLabel r-text-item" style="float:left;"> 规则图片： </span>
      <span class="theValue">
        <uploadImg
          :picUrl='theSrc'
          :size="'250*250'"
          :space="10"
          :para="'src'"
          :textpos="'common'"
          @imageUrl="imageUrl"
        ></uploadImg>
      </span>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted,watch } from "vue";
import useComponentCommon from "../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  regurContent,
  regularStylePropNames
} from "../../../../../../../src/store/dataType";
const defaultProps = transformToComponentProps(regurContent);
import { quillEditor } from "vue3-quill";
import ColorPicker from "../ColorPicker.vue";
//import "@vueup/vue-quill/dist/vue-quill.snow.css";
import uploadImg from "../UploadImg.vue";
// array that contains style props
export default defineComponent({
  name: "r-btn",
  props: {
    ...defaultProps
  },
  components: {
    quillEditor,
    uploadImg,
    ColorPicker
  },
  emits: ["change","changeRegular"],
  setup(props, context) {
    let theSrc = computed(() => props.src);
    //let theContent=ref('');
    let theBackground = computed(() => {
      let a=props.backgroundImage.match(/\(([^)]*)\)/)
      if(a && a[1]){
        return a[1];
      }else{
        return ''
      }
    })
    let theContent = computed(() => props.richText);
    /* watch(props,(newValue, old) => { //新增
       if(newValue.richText){
         theContent.value= newValue.richText
       }
    }); */
    const { styleProps, handleClick } = useComponentCommon(props, regularStylePropNames);
    
    // 1、底图和规则改变的时候，改变基本信息中的底图和规则
    const imageUrl = (data: { para: string; name: string }) => {
      let obj = {
        key: data.para,
        value: data.name
      };
      context.emit("change", obj);
      context.emit("changeRegular", obj);
    };
    const onEditorChange = ({ quill, html, text }) => {
      let obj = {
        key: "richText",
        value: html
      };
      context.emit("change", obj);
      context.emit("changeRegular", obj);
    };
   
    let theRegularText = computed(() =>props.regularText);
    let ruleType=computed(()=>props.ruleType);
    let theFontSize = computed(() => parseInt(props.fontSize));
    let theColor = computed(() => props.color);
    let toolbarOptions = {
        placeholder: "core",
        modules: {
          toolbar: [
            // custom toolbars options
            // will override the default configuration
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            //["link", "image", "video"],
          ],
          // other moudle options here
        },
        // more options
      };
    const changeValue = (e: any, param: string) => {
      let obj = {
        key: param,
        value: e
      };
      context.emit("change", obj);
    };
    return {
      theBackground,
      theSrc,
      theContent,
      ruleType,
      imageUrl,
      onEditorChange,
      changeValue,
      toolbarOptions,
      theRegularText,
      theFontSize,
      theColor,
      styleProps,
      handleClick,
      value: ref(false)
    };
  }
});
</script>

<style scoped>
@import "./Rcommon.less";
.r-text-component >>> .ql-container{
  height:120px;
  overflow-y: auto;
}
</style>
