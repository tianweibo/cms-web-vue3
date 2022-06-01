<template>
  <div class="content clearfix">
      <div class="content-left fl"  id="canvas-area" :style="{ backgroundImage: backImgProps.props.backgroundImage }">
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
          <a-tabs class="tab-pane" type="card" style="border:1px solid #D3D9E6;margin:20px 40px 20px 40px;" v-model:activeKey="activePanel" @change="changeType">
            <a-tab-pane 
              style="overflowY:auto;"
              v-for="component in rComponents"
              :key="component.id"
              :forceRender="true"
              :tab="component.layerName"
              :id="component.id"
            >
              <component 
                :is="component.formName" 
                :layerName='component.layerName' 
              v-bind="component.props" @change="changedata" />
            </a-tab-pane>
          </a-tabs>
          <div class='content-right_btn'>
              <a-button type="primary" @click="onSubmit()" >查看数据</a-button>
          </div>
    </div>
  </div>
</template>
<script lang="ts">
import './index.less'
import {
  defineComponent,
  computed,
  ref,
} from "vue";
import {ComponentData,GlobalDataProps} from "@/store/dataType/common";
import uploadImg from "../components/decorate/common/UploadImg.vue";
import DragContent from "../components/decorate/DragContent.vue";
import LText from "../components/decorate/common/LText.vue";
import LImage from "../components/decorate/common/LImage.vue";
import LBackimg from "../components/decorate/common/LBackimg.vue";
import LBtn from "../components/decorate/common/LBtn.vue";
import RText from "../components/decorate/common/RText.vue";
import RBtn from "../components/decorate/common/RBtn.vue";
import RImg from "../components/decorate/common/RImg.vue";
import RBackimg from "../components/decorate/common/RBackimg.vue";
import { pickBy } from "lodash-es";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    uploadImg,
    DragContent,
    LText,
    RText,
    LImage,
    RImg,
    LBackimg,
    RBackimg,
    LBtn,
    RBtn,
  },
 
  setup() {
    const store = useStore<GlobalDataProps>();
    const backImgProps = computed(() => store.getters['demo/getBackImgProps']);
    const currentElement = computed<ComponentData | null>(() => store.getters['demo/getCurrentElement']);
    const rComponents = computed(() => store.getters['demo/getRcomponents']);
    const lComponents = computed(() => store.getters['demo/getLcomponents']);
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
    const changedata = (obj: any) => {
      let theid: any = null;
      if (obj.id) {
        theid = obj.id;
      } else {
        theid = theId.value;
      }
      if(obj.key=="src"){
        store.commit("demo/updateComponent", { key: [obj.key], value: [obj.value], id: theid });
      }else if(obj.key=="backgroundImage"){
        let backImg=''
        if(obj.value){
           backImg= `url(${obj.value})`
        }
        store.commit("demo/updateComponent", { key: [obj.key], value: [backImg], id: theid });
      }else if (
        obj.key == "text1Color" ||
        obj.key == "textColor" ||
        obj.key == "color" ||
        obj.key == "boxShadow" ||
        obj.key == "border" ||
        obj.key == "backgroundColor" ||
        obj.key == "background"
      ) {
        store.commit("demo/updateComponent", { key: [obj.key], value: [obj.value], id: theid });
      } else if (obj.key == "text1"||obj.key == "text" || obj.key == "btnText" || obj.key=='regularText') {
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
      }else if(obj.key=='type'){
        let keyArr=[obj.key];
        let valueArr=[obj.value.target.value];
        if(obj.value.target.value=='0'){
          keyArr.push('backgroundImage','text');
          valueArr.push('','按钮');
        }else if(obj.value.target.value=='1'){
          keyArr.push('text');
          valueArr.push('');
        }
        store.commit("demo/updateComponent", { key: keyArr, value: valueArr, id: theid });
      } else {
        store.commit("demo/updateComponent", { key: [obj.key], value: [`${obj.value}px`], id: theid });
      }
    };
    const onSubmit=()=>{
        console.log(store.state.demo.components)
    }
    const updatePosition = (data: { left: number; top: number; id: string }) => {
      const { id } = data;
      const updatedData = pickBy<number>(data, (v, k) => k !== "id");
      const keysArr = Object.keys(updatedData);
      const valuesArr = Object.values(updatedData).map((v) => v + "px");
      store.commit("demo/updateComponent", { key: keysArr, value: valuesArr, id });
    };
    return {
      changedata,
      onSubmit,
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
<style lang="less" scoped>

</style>
