<template>
  <div class="content clearfix">
   <!--  <choiceGift 
      @closeDialog="closeDialog"
      @handChoice="getGift"></choiceGift>  -->
      <super-form :formList='formList' ref="theSuperForm"></super-form>
   <!--  <choice-gift1 
      @closeDialog="closeDialog"
      @handChoice="getGift">
   </choice-gift1>  -->

  <upload-image 
    :size="50"
    :space="10"
    :para="src"
    :textpos="'common'"
    @imageUrl="imageUrl"
    :picUrl='xxxx'>
  </upload-image>
  
   <l-image1></l-image1>
   
    <div
      class="content-left fl"
      id="canvas-area"
      :style="{ backgroundImage: backImgProps.props.backgroundImage }"
    >
      <DragContent
        @setActive="setActive"
        @update-position="updatePosition"
        v-for="component in lComponents"
        :key="component.id"
        :id="component.id"
        :isExpand="component.isExpand"
        :isHidden="component.isHidden"
        :isDrag="component.isDrag"
        :props="component.props"
        :active="component.id === (currentElement && currentElement.id)"
      >
        <component
          :is="component.canvasName"
          v-bind="component.props"
          :layerName="component.layerName"
        />
      </DragContent>
    </div>
    <div class="content-right fl">
      页面装修
      <a-tabs
        class="tab-pane"
        type="card"
        style="margin:20px 40px 20px 40px;border:1px solid #D3D9E6;"
        v-model:activeKey="activePanel"
        @change="changeType"
      >
        <a-tab-pane
          style="overflow-y:auto;"
          v-for="component in rComponents"
          :key="component.id"
          :forceRender="true"
          :tab="component.layerName"
          :id="component.id"
        >
          <component
            :is="component.formName"
            :layerName="component.layerName"
            v-bind="component.props"
            @change="changedata"
          />
        </a-tab-pane>
      </a-tabs>
      <div class="content-right_btn">
        <a-button type="primary" @click="onSubmit()">查看数据</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import "./index.less";
import { defineComponent, computed, ref } from "vue";
import { ComponentData, GlobalDataProps } from "@/store/data-type/common";
import uploadImg from "../components/decorate/common/upload-img.vue";
import choiceGift from "../components/ChoiceGift.vue";
import DragContent from "../components/decorate/drag-content.vue";
import LText from "../components/decorate/common/l-text.vue";
import LImage from "../components/decorate/common/l-image.vue";
import LBackimg from "../components/decorate/common/l-backimg.vue";
import LBtn from "../components/decorate/common/l-btn.vue";
import RText from "../components/decorate/common/r-text.vue";
import RBtn from "../components/decorate/common/r-btn.vue";
import RImg from "../components/decorate/common/r-img.vue";
import RBackimg from "../components/decorate/common/r-backimg.vue";
import { pickBy } from "lodash-es";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    uploadImg,
    choiceGift,
    DragContent,
    LText,
    RText,
    LImage,
    RImg,
    LBackimg,
    RBackimg,
    LBtn,
    RBtn
  },
  emits: ["change"],
  setup(props,context) {
    const store = useStore<GlobalDataProps>();
    const backImgProps = computed(() => store.getters["demo/getBackImgProps"]);
    const currentElement = computed<ComponentData | null>(
      () => store.getters["demo/getCurrentElement"]
    );
    const rComponents = computed(() => store.getters["demo/getRcomponents"]);
    const lComponents = computed(() => store.getters["demo/getLcomponents"]);
    let activePanel = ref("xxxx");
    let theId = ref("");
    const setActive = (id: string) => {
      activePanel.value = id;
      theId.value = id;
      store.commit("demo/setActive", id);
    };
    const changeType = (e: any) => {
      store.commit("demo/setActive", e);
      theId.value = e;
    };
    const getGift=(val: any)=>{
      console.log('getGift')
    };
    const closeDialog=()=>{
      console.log('close')
    };
    const imageUrl = (data: { para: string; name: string }) => {
      let obj = {
        key: data.para,
        value: data.name
      };
      context.emit("change", obj);
    };
    const changedata = (obj: any) => {
      let theid: any = null;
      if (obj.id) {
        theid = obj.id;
      } else {
        theid = theId.value;
      }
      if (obj.key == "src") {
        store.commit("demo/updateComponent", { key: [obj.key], value: [obj.value], id: theid });
      } else if (obj.key == "backgroundImage") {
        let backImg = "";
        if (obj.value) {
          backImg = `url(${obj.value})`;
        }
        store.commit("demo/updateComponent", { key: [obj.key], value: [backImg], id: theid });
      } else if (
        obj.key == "text1Color" ||
        obj.key == "textColor" ||
        obj.key == "color" ||
        obj.key == "boxShadow" ||
        obj.key == "border" ||
        obj.key == "backgroundColor" ||
        obj.key == "background"
      ) {
        store.commit("demo/updateComponent", { key: [obj.key], value: [obj.value], id: theid });
      } else if (
        obj.key == "text1" ||
        obj.key == "text" ||
        obj.key == "btnText" ||
        obj.key == "regularText"
      ) {
        store.commit("demo/updateComponent", {
          key: [obj.key],
          value: [obj.value.target.value],
          id: theid
        });
      } else if (obj.key == "richText") {
        store.commit("demo/updateComponent", { key: ["richText"], value: [obj.value], id: theid });
      } else if (obj.key == "display") {
        let zhi = "none";
        if (obj.value.target.checked) {
          zhi = "block";
          //store.commit("setActive", theId.value);
        } else {
          store.commit("demo/setActiveRandom", theid);
        }
        store.commit("demo/updateComponent", { key: [obj.key], value: [zhi], id: theid });
      } else if (obj.key == "type") {
        let keyArr = [obj.key];
        let valueArr = [obj.value.target.value];
        if (obj.value.target.value == "0") {
          keyArr.push("backgroundImage", "text");
          valueArr.push("", "按钮");
        } else if (obj.value.target.value == "1") {
          keyArr.push("text");
          valueArr.push("");
        }
        store.commit("demo/updateComponent", { key: keyArr, value: valueArr, id: theid });
      } else {
        store.commit("demo/updateComponent", {
          key: [obj.key],
          value: [`${obj.value}px`],
          id: theid
        });
      }
    };
    const onSubmit = () => {
      console.log(store.state.demo.components);
    };
    const updatePosition = (data: { left: number; top: number; id: string }) => {
      const { id } = data;
      const updatedData = pickBy<number>(data, (v, k) => k !== "id");
      const keysArr = Object.keys(updatedData);
      const valuesArr = Object.values(updatedData).map(v => v + "px");
      store.commit("demo/updateComponent", { key: keysArr, value: valuesArr, id });
    };
    const formList=ref({
          "aliasName": "Apache安装",
          "formSource": "product",
          "tables": [
            {
              "tableName": "apache安装配置",
              "tableUuid": "4344d74b-51c4-45f4-b1c8-aa103d24ed49",
              "ascOrder": 0,
              "isColumn": 0,
              "infos": [
                {
                  "paraKey": "actMess",
                  "paraName": "活动名称",
                  "msg":"活动名称的范围是3-20",
                  "placeholder":'请输入活动名称',
                  "paraUnit": null,
                  "formType": "the-input",
                  "regularText": "/^.{3,20}$/",
                  "sourceJson": null,
                  "isRequired": 1,
                  "isExist": true,
                  "value": ''
                },
                {
                  "paraKey": "actTime",
                  "paraName": "活动时间",
                  "placeholder":'请输入参数',
                  "msg":"请输入活动的起止时间",
                  "paraUnit": null,
                  "formType": "range-picker",
                  "regularText": "",
                  "sourceJson": null,
                  "isRequired": 1,
                  "isExist": true,
                  "value": null
                },
                {
                  "paraKey": "pic",
                  "paraName": "活动图片",
                  "placeholder":'请输入参数',
                  "msg":null,
                  "paraUnit": "MB",
                  "formType": "the-upload",
                  "regularText": "",
                  "sourceJson":null,
                  "isRequired": 0,
                  "isExist": true,
                  "value": null
                },
                {
                  "paraKey": "ruleType",
                  "paraName": "活动规则",
                  "msg":null,
                  "placeholder":'请输入参数',
                  "paraUnit": "MB",
                  "formType": "the-radio",
                  "regularText": "",
                  "sourceJson": [{value:1,label:'文本规则'},{value:2,label:'图文规则'}],
                  "isRequired": 0,
                  "isExist": true,
                  "value": 2,
                }, {
                  "paraKey": "ruleBaseMap",
                  "paraName": "规则底图",
                  "msg":null,
                  "placeholder":'请输入参数',
                  "paraUnit": "MB",
                  "formType": "the-upload",
                  "regularText": "",
                  "sourceJson":null,
                  "isRequired": 0,
                  "isExist": true,
                  "value": null,
                },
                {
                  "paraKey": "ruleContent",
                  "paraName": "规则图片",
                  "placeholder":'请输入参数',
                  "msg":null,
                  "paraUnit": "MB",
                  "formType": "the-upload",
                  "regularText": "",
                  "sourceJson":null,
                  "isRequired": 0,
                  "isExist": false,
                  "value": null,
                },
                {
                  "paraKey": "ruleContent",
                  "paraName": "规则内容",
                  "placeholder":'请输入参数',
                  "msg":'规则内容不能为空',
                  "paraUnit": "MB",
                  "formType": "the-textarea",
                  "regularText": "",
                  "sourceJson":null,
                  "isRequired": 1,
                  "isExist": true,
                  "value": 1
                },
                {
                  "paraKey": "ifDisplay",
                  "paraName": "推广方式",
                  "msg":null,
                  "placeholder":'请输入参数',
                  "paraUnit": "MB",
                  "formType": "the-select",
                  "regularText": "",
                  "sourceJson":[{value:1,label:'公开推广'},{value:2,label:'自主推广'}],
                  "isRequired": 0,
                  "isExist": true,
                  "value": 1,
                }
              ]
            }
          ]
        })
    return {
      imageUrl,
      formList,
      changedata,
      onSubmit,
      getGift,
      closeDialog,
      backImgProps,
      lComponents,
      rComponents,
      activePanel,
      theId,
      updatePosition,
      setActive,
      currentElement,
      changeType
    };
  }
});
</script>
<style lang="less" scoped></style>
