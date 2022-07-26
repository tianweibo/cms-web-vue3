<template>
  <div>
    <choice-gift1 @handChoice="handChoice" @closeDialog='closeDialog'></choice-gift1>
    <super-form :formList='formList' ref="theSuperForm" @changeForm='changeForm'></super-form> 
    <a-button type="primary" @click="saveData()">submit</a-button>
    <a-button type='primary' @click="dealObjToJson">ToJson</a-button>
    <a-button type='primary' @click="dealJsonToObj">ToObj</a-button>
    <side-bar></side-bar>
    
    <app-main></app-main>
    <use-tab></use-tab>
    
  </div>
</template>

<script lang="ts">
//import buriedpointH5 from '@enbrandsfe/buried_point';
import { defineComponent, reactive, ref ,onMounted} from "vue";
import {actMess} from "./formData"
import {  message } from "ant-design-vue";
import {SideBar,AppMain,BreadCrumb} from "@/components/layouts1/index"
export default defineComponent({
  name: "home",
  components: {
    SideBar,  AppMain
  },
  setup(_: any, ctx: any) {
    const formList=ref(actMess);
    const theSuperForm=ref()
    const changeForm=(val)=>{    // 值改变了
      if(val.infosIndex==0){
        let obj1 ={
          infosIndex: 6,
          param: "value",
          tableIndex: 0,
          value: '我被改变了'
        }
        theSuperForm.value.changeData(obj1) // 数据联动
      }
    };
    const dealObjToJson=()=>{  // 修改数据为适配组件的JSON数据
      const val1={
                name:'twb',
                actTime:['2021-09-11','2021-09-22'],
                pic:'',
                ruleType:1,
                ruleBaseMap:'w',
                ruleContent:'ww',
                ifDisplay:1
            }
            theSuperForm.value.setDataFormList(0,val1);
    }
    const dealJsonToObj=()=>{
      let temp=theSuperForm.value.getDataFormat(0);
      console.log(temp,'toObj')
    }
    const saveData=()=>{
      let a={flag:false,mess:''};
      a=theSuperForm.value.submitForm();
      if(!a.flag){
        message.warning(`${a.mess}`)
      }else{
          dealJsonToObj()
          console.log('go')
      }
    }
    const closeDialog=()=>{
      console.log('我被关闭了')
    }
    const handChoice=(val)=>{
      console.log(val)
    }
    onMounted(()=>{
     /*  buriedpointH5.fed({
      event_name: '事件页面-埋点',
      event_code: 'sjymMaidian',
      event_label: 'all_general',
      event_trigger_mode: 'open',
      url : '/app',
    });*/
    })
    return { 
      theSuperForm,
      formList,
      saveData,
      changeForm,
      closeDialog,
      handChoice,
      dealObjToJson,
      dealJsonToObj
    };
  }
});
</script>
<style lang="less" scoped>


</style>
<style lang="less">

</style>
