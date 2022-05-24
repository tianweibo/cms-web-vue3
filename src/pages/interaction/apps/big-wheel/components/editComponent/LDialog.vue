<template>
  <div class="dialog" v-if="dialogProps.id === (currentElement && currentElement.id)">
    <div class="my-record"></div>
    <span class="dialog-close" @click="closeDialog">x</span>
    <div class="title1 marginTop-60" v-if="format == 2 || format == 1" :style="textStyle">恭喜您！</div>
    <div class="title1" v-if="format == 2 || format == 1" :style="textStyle">抽中了一等奖</div>
     <div class="title1 marginTop-60" v-if="format == 0" :style="textStyle">很遗憾~</div>
    <div class="title1" v-if="format == 0" :style="textStyle">您未中奖</div>
   
    <div class="dialog-imgC">
      <img  :src="src" />
    </div>
     <div class="title2" v-if="format == 2 || format == 1" :style="text1Style">{{ text1 }}</div>
    <div v-if="format == 2 && theType==0" class="dialog-btn" :style="btnStyleText">
      {{ btnText }}
    </div>
     <div v-if="format == 2 && theType==1" class="dialog-btnImg" :style="btnStyleImg">
      
    </div>
    <div v-if="format == 1" class="" :style="textStyleBtnText">
      {{ btnText }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import {
  ComponentData,
  GlobalDataProps,
  transformToComponentProps,
  dialogContent1,
  dialogContent2,
  dialogContent3
} from "../../../../../../../src/store/dataType";
const defaultProps = transformToComponentProps(dialogContent1);

export default defineComponent({
  name: "l-btn",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    ...defaultProps
  },
  setup(props) {
    const store = useStore<GlobalDataProps>();
    const dialogProps = computed(() => store.getters.getDialogProps);
    const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement);
    const btnStyleText = computed(() => {
      let a = {
        background: props.background,
        color: props.color,
        fontSize: props.fontSize,
        width: props.width,
        height: props.height,
        lineHeight: props.height
      };
      return a;
    });
    const btnStyleImg= computed(() => {
      let a = {
        backgroundImage: props.backgroundImage,
        width: props.width,
        height: props.height,
        backgroundSize: '100%',
      };
      return a;
    });
    const theType= computed(() => {
       return props.type
      }
    );
    const textStyle = computed(() => {
      let a = {
        color: props.textColor,
        fontSize: props.textFontsize,
        textAlign:'center'
      };
      return a;
    });
    const textStyleBtnText= computed(() => {
      let a = {
        color: props.textColor,
        fontSize: '14px',
        textAlign:'center',
        marginTop:'10px'
      };
      return a;
    });
    
    const text1Style = computed(() => {
      let a = {
        color: props.text1Color,
        fontSize: props.text1Fontsize,
        textAlign:'center'
      };
      return a;
    });
    const closeDialog = () => {
      store.commit("setActive", "");
    };
    return {
      dialogProps,
      currentElement,
      btnStyleText,
      btnStyleImg,
      theType,
      textStyle,
      textStyleBtnText,
      text1Style,
      closeDialog
    };
  }
});
</script>

<style scoped>
.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 270px;
  height: 342px;
  margin-top: -170px;
  margin-left: -135px;
  text-align: center;
  background: url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/3e0eb0bbe0e257003b35b9f475214b99.png) no-repeat center;
  background-size: 100%;

  border-radius: 10px;
}
.my-record{
  background: url(http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/e22659f07de6c3d3edc0e4b09f38a31d.png) no-repeat center;
  background-size: 100%;
  width:200px;
  height:90px;
  position: absolute;
  top:-55px;
  left:50%;
  margin-left:-100px;
}
.marginTop-60{
  margin-top: 40px;
}
.title1{
  font-weight: 700;
}
.title2{
  height:40px;
  line-height: 40px;
}
.dialog-close {
  position: absolute;
  top: 380px;
  right: 120px;
  cursor: pointer;
  width:20px;
  height:20px;
  line-height: 15px;
  text-align: center;
  color: #fff;
  border:1px solid #fff;
  border-radius: 15px;
}



.dialog-btn {
  max-width: 100px;
  max-height: 60px;
  margin: 20px auto;
  border: 1px solid grey;
  border-radius: 6px;
  box-shadow: rgb(119 119 119) 5px 5px 2px;
}
.dialog-btnImg{
   margin: 15px auto;
  background-repeat: no-repeat;
}
.dialog-imgC {
  width: 80px;
  height: 80px;
  margin:0 auto;
}
.dialog-imgC img{
  margin:20px auto;
  max-height: 100%;
  max-width: 100%;
  display: block;
}
</style>
