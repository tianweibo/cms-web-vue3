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
    <li class="clearfix r-text-item" style="height: 160px">
      <span class="theLabel"> 文案： </span>
      <span class="theValue" style="width: 480px">
        <quill-editor
          v-model:value="theContent"
          :options="toolbarOptions"
          @change="onEditorChange($event)"
        />
      </span>
    </li>
    <li class="clearfix r-text-item" style="height: 66px">
      <span class="theLabel"> 背景图片： </span>
      <span class="theValue">
        <uploadImg
          :size="'250*250'"
          :space="10"
          :para="'actImg'"
          :textpos="'common'"
          @imageUrl="imageUrl"
        ></uploadImg>
      </span>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
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
  emits: ["change"],
  setup(props, context) {
    const { styleProps, handleClick } = useComponentCommon(props, regularStylePropNames);
    let theContent = ref("");
    //theContent = computed(() => props.text);
    const imageUrl = (data: { para: string; name: string }) => {
      console.log("xxx");
    };
    const onEditorChange = ({ quill, html, text }) => {
      let obj = {
        key: "richText",
        value: html
      };
      context.emit("change", obj);
    }; // 内容改变事件
    let theRegularText = computed(() =>props.regularText);
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
      theContent,
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

<style lang="less" scoped>
@import "./Rcommon.less";

</style>