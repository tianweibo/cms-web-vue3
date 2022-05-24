<template>
  <div class="content clearfix">
    <div class="content_left fl">
     <!--  <l-text1></l-text1> 
     <l-image1></l-image1>
     <choice-gift></choice-gift> 
      <upload-image></upload-image> --> 
      <div class="thephone"  id="canvas-area" :style="{ backgroundImage: backImgProps.props.backgroundImage }">
        <div
          class="dialogContent"
          v-if="regularProps.id === (currentElement && currentElement.id)"
        >
          <div :style="{ backgroundImage: regularProps.props.backgroundImage }" class="dialogBack">
           
            <l-regular v-bind="regularProps.props" :layerName="regularProps.layerName"></l-regular>
          
          </div>
          <span class="regular-close" @click="closeRegular">x</span>
          
        </div>
        <!-- <img :src="titleProps.props.src" :style="{ width: titleProps.props.width,height: titleProps.props.height,top: titleProps.props.top,left: titleProps.props.left,position:'absolute' }"/> -->
        <div class="dialogContent" v-if="dialogProps.id === (currentElement && currentElement.id)">
          <l-dialog v-bind="dialogProps.props"></l-dialog>
        </div>
        <div :class="isTiger?'tigerContent':''">
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
       
        <div class="thephone_rules" @click="clickRegular"  :style="{ color: regularProps.props.color,fontSize: regularProps.props.fontSize }">{{regularProps.props.regularText}}</div>
      </div>
    </div>
    <div class="content_right fl">
      <a-tabs v-model:activeKey="activeKey" >
        <a-tab-pane key="actMess" tab="活动信息">
          <a-form
            style="margin-top: 40px"
            ref="formRef"
            :model="formActMess"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item ref="name" label="活动名称" name="name">
              <a-input v-model:value="formActMess.name" />
            </a-form-item>
            <a-form-item name="actTime" label="活动时间">
              <a-range-picker
                v-model:value="formActMess.actTime"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
              />
            </a-form-item>
            <a-form-item ref="pic" label="活动图片" name="pic">
              <uploadImg
                :size="'250*250'"
                :space="10"
                :para="'pic'"
                :textpos="'common'"
                :picUrl="formActMess.pic"
                @imageUrl="imageUrl"
              ></uploadImg>
            </a-form-item>
            <a-form-item label="活动规则" name="ruleType">
              <a-radio-group v-model:value="formActMess.ruleType" @change="changeRuleType" style="margin-bottom:10px;margin-top:5px;">
                <a-radio :value=1>文本规则</a-radio>
                <a-radio :value=2>图文规则</a-radio>
              </a-radio-group>

              <ul class="imgRegural" v-if="formActMess.ruleType == 2">
              <li class="clearfix">
                <span class="title">规则底图</span>
                <span class="theBox">
                    <uploadImg
                      :size="'250*250'"
                      :space="10"
                      :para="'ruleBaseMap'"
                      :textpos="'common'"
                      :picUrl="formActMess.ruleBaseMap"
                      @imageUrl="imageUrl"
                    ></uploadImg>
                </span>
              </li>
              <li class="clearfix">
                <span class="title">规则图片</span>
                <span class="theBox">
                     <uploadImg
                        :size="'950*640'"
                        :space="10"
                        :para="'ruleContent'"
                        :textpos="'common'"
                        :picUrl="formActMess.ruleContent"
                        @imageUrl="imageUrl"
                    ></uploadImg> 
                </span>
              </li>
              </ul>
            <ul class="imgRegural clearfix" v-if="formActMess.ruleType == 1">
              <li class="clearfix">
                 <span class="title">规则底图</span>
                 <span class="theBox">
                   <uploadImg
                      :size="'960*640'"
                      :space="10"
                      :para="'ruleBaseMap'"
                      :textpos="'common'"
                      @imageUrl="imageUrl"
                      :picUrl="formActMess.ruleBaseMap"
                    ></uploadImg>
                 </span>
              </li>
              <li class="clearfix" style="height: 160px">
                <span class="title">规则内容</span>
                <a-textarea class="theBox"
                  style='display: inline-block;width:400px;'
                  v-model:value="formActMess.ruleContent"
                  placeholder="Basic usage"
                  :rows="4"
                  @blur="changeRuleContent"
                /> 
              </li>
            </ul>
            </a-form-item>
            
            <a-form-item label="推广方式" name="ifDisplay">
              <a-radio-group v-model:value="formActMess.ifDisplay">
                <a-radio :value=1>公开推广</a-radio>
                <a-radio :value=2>自主推广</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
          <div class="goSteop">
            <a-button type="primary" @click="onSubmit('award','actMess')" >下一步</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="award" tab="奖项设置" force-render>
           <div style="margin-left: 40px">
              奖品数量：<a-radio-group
                :options="awardNumList"
                v-model:value="awardNum"
                @change="awardNumChange"
              />
            </div>
         <awardSet 
            @changeGift='changeGift'
            :awardLevelLists='awardLevelList' 
            @onSubmit='onSubmit'
            :awardLists='awardList'>
          </awardSet>
        </a-tab-pane>
        <a-tab-pane key="regular" tab="抽奖规则">
          <a-form
            style="margin-top: 60px"
            :model="formPriceMess"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="抽奖机会赠送">
              <a-radio-group v-model:value="formPriceMess.isFreeTimesPerDay">
                <a-radio :value=false>不开启</a-radio>
                <a-radio :value=true>每日赠送</a-radio>
              </a-radio-group>
              <span class="formItem" v-if="formPriceMess.isFreeTimesPerDay">
                  每个会员每日赠送
                  <a-input-number
                    v-model:value="formPriceMess.freeTimesPerDay"
                    class="formItemDiv"
                    :min=1
                    :max=99
                  />次抽奖机会
              </span>
            </a-form-item>
            
            <a-form-item label="额外抽奖机会">
              <a-radio-group v-model:value="formPriceMess.isAddTimesScore">
                <a-radio :value=false>不开启</a-radio>
                <a-radio :value=true>消耗积分</a-radio>
              </a-radio-group>
               <span class="formItem" v-if="formPriceMess.isAddTimesScore">
              消耗<a-input-number
                v-model:value="formPriceMess.addTimesScore"
                class="formItemDiv"
                :min=1
                :max=99999
              />积分抽奖一次
            </span>
            </a-form-item>
           
            <a-form-item label="抽奖次数限制">
              <a-radio-group v-model:value="formPriceMess.isPriceLimit" style="margin-bottom:10px;margin-top:5px;">
                <a-radio :value=false>不开启</a-radio>
                <a-radio :value=true>开启</a-radio>
              </a-radio-group>
               <div v-if='formPriceMess.isPriceLimit'>
                  <a-checkbox v-model:checked="formPriceMess.isJoinTimesPerDay">每日抽奖</a-checkbox>
                  <span class="formItem" v-if='formPriceMess.isJoinTimesPerDay'>
                    会员每日抽奖不超过<a-input-number
                    v-model:value="formPriceMess.joinTimesPerDay"
                    class="formItemDiv"
                    :min=1
                    :max='formPriceMess.freeTimesPerDay'
                  />次
                  </span>
               </div>
               <div v-if='formPriceMess.isPriceLimit'>
                  <a-checkbox v-model:checked="formPriceMess.isJoinTimes">活动期间抽奖</a-checkbox>
                  <span class="formItem" v-if='formPriceMess.isJoinTimes'>
                    会员活动期间抽奖次数不超过<a-input-number
                    v-model:value="formPriceMess.joinTimes"
                    class="formItemDiv"
                    :min=1
                    :max=9999
                  />次
                  </span>
               </div>
            </a-form-item>
           
            <a-form-item label="中奖轮播">
              <a-radio-group v-model:value="formPriceMess.isDisplayDays">
                <a-radio :value=false>不开启</a-radio>
                <a-radio :value=true>开启</a-radio>
              </a-radio-group>
              <span class="formItem" v-if="formPriceMess.isDisplayDays">
                展示近<a-input-number
                v-model:value="formPriceMess.displayDays"
                class="formItemDiv"
                :min=1
                :max=999
                />天的中奖信息
              </span>
            </a-form-item>
            
            <a-form-item label="中奖信息优化" style="margin-bottom:10px;margin-top:5px;">
              <a-radio-group v-model:value="formPriceMess.isWinOptimize">
                <a-radio :value=false>不开启</a-radio>
                <a-radio :value=true>开启</a-radio>
              </a-radio-group>
              <span style="font-size:12px;color:#999">轮播顺序为优先播放优化中奖者信息，后播放普通中奖信息(最多添加20项)</span>
              <awardListCon 
                :userList='winOptimize'
                @userListChange="userListChange"
                :awardLevelLists='awardLevelList'
              ></awardListCon>
            </a-form-item>
          </a-form>
           <div class='goSteop'>
             <a-button type="primary" @click="onSubmit('award','regular')" >上一步</a-button>
             <a-button type="primary" @click="onSubmit('decoration','regular')" >下一步</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="decoration" tab="页面装修">
          <a-radio-group v-model:value="theRadio" style="margin:20px 0px 0px 40px;" @change="v=>{changeTheme(v)}">
            <a-radio value="0">自定义主题</a-radio>
            <a-radio value="1">默认</a-radio>
          </a-radio-group>
          <a-checkbox v-model:checked="isTiger" @change="v=>{changeTiger(v)}">是否开启虎年特定皮肤</a-checkbox>
          <a-tabs class="tab-pane" type="card" style="border:1px solid #D3D9E6;margin:20px 40px 20px 40px;" v-model:activeKey="activePanel" @change="changeType" v-if="theRadio=='0'">
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
              v-bind="component.props" @change="changedata" @changeRegular="changeRegular"/>
            </a-tab-pane>
          </a-tabs>
          <div class='goSteop'>
             <a-button type="primary" @click="onSubmit('regular','decoration')" >上一步</a-button>
             <a-button type="primary" @click="onSubmit('saveAndpublish','saveAndpublish')" >保存并发布活动</a-button>
             <a-button type="primary" @click="onSubmit('save','save')" >保存</a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import  { Moment } from 'moment';
import './index.less'
import {
  defineComponent,
  onMounted,
  computed,
  reactive,
  ref,
  UnwrapRef,
} from "vue";
import { GlobalDataProps, ComponentData } from "../../../../store/dataType";
import uploadImg from "./components/UploadImg.vue";
import awardListCon from "./components/AwardList.vue";
import awardSet from "./components/awardSet/index.vue";
import DragContent from "./components/DragContent.vue";
import LText from "./components/editComponent/LText.vue";
import LImage from "./components/editComponent/LImage.vue";
import LBackimg from "./components/editComponent/LBackimg.vue";
import LBtn from "./components/editComponent/LBtn.vue";
//import LTime from "./components/editComponent/LTime.vue";
import RText from "./components/editComponent/RText.vue";
import RBtn from "./components/editComponent/RBtn.vue";
//import RTime from "./components/editComponent/RTime.vue";
import RCarousel from "./components/editComponent/RCarousel.vue";
import LCarousel from "./components/editComponent/LCarousel.vue";
import RImg from "./components/editComponent/RImg.vue";
import RRegular from "./components/editComponent/RRegular.vue";
import LRegular from "./components/editComponent/LRegular.vue";
import LDialog from "./components/editComponent/LDialog.vue";
import RDialog from "./components/editComponent/RDialog.vue";
//import RRotetable from "./components/editComponent/RRotetable(del).vue";
import RBackimg from "./components/editComponent/RBackimg.vue";
import { pickBy } from "lodash-es";
import { useStore } from "vuex";
import { addBigWheels,detailBigWheels,editBigWheels} from "./service";
import {  message } from "ant-design-vue";
 import { useRoute } from "vue-router"
import {
  AwardLevelObject,
  AwardDetailObject,
  AwardObject,
  UserObject,
  FormPriceMess,
  FormActMess
} from "./dataType";

export default defineComponent({
  components: {
    uploadImg,
    awardListCon,
    DragContent,
    LText,
    LImage,
    LBackimg,
    LBtn,
    //LTime,
    RText,
    RBtn,
    RImg,
    RRegular,
    //RRotetable,
    RBackimg,
    LRegular,
    LDialog,
    RDialog,
    //RTime,
    RCarousel,
    LCarousel,
    awardSet
  },
 
  setup() {
    let toolbarOptions = [
      ["bold", "italic", "underline"], // toggled buttons
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"] // remove formatting button
    ];
    const formRef = ref();
    let isTiger=ref(true)
    const awardNumList = [
      { label: "4", value: 4 },
      { label: "6", value: 6 },
      { label: "8", value: 8 }
    ];
    let awardNum=ref(4);
    let activeKey = ref("actMess");
    let theRadio = ref("0");
     const route = useRoute(); // 第一步
    let awardConfig=ref<Array<AwardObject>>([]);
    let awardList=ref<Array<AwardDetailObject>>([]);
    let awardLevelList=ref<Array<AwardLevelObject>>([]);
    const store = useStore<GlobalDataProps>();
    let regularData = ref('');
    let winOptimize=ref<Array<UserObject>>([]);
    const dialogArr = computed(() => store.getters.getDialogPropsArr);
    const backImgProps = computed(() => store.getters.getBackImgProps);
    const titleProps = computed(() => store.getters.getTitleProps);
    const regularProps = computed(() => store.getters.getRegularProps);
    const dialogProps = computed(() => store.getters.getDialogProps);
    const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement);
    const rComponents = computed(() => store.getters.getRcomponents);
    const lComponents = computed(() => store.getters.getLcomponents);
    let formPriceMess: UnwrapRef<FormPriceMess> = reactive({
      freeTimesPerDay:1,//每日赠送抽奖机会
      isFreeTimesPerDay:false,
      addTimesScore:1,  //额外抽奖机会使用积分
      isAddTimesScore:false,  
      isPriceLimit:false,
      joinTimesPerDay:1,// 每日抽奖次数限制
      isJoinTimesPerDay:false,
      joinTimes:1,// 活动期间抽奖次数限制
      isJoinTimes:false,
      displayDays:1, //轮播最近多少天的中奖纪录
      isDisplayDays:false, 
      isWinOptimize:false,
    });
    const formActMess: UnwrapRef<FormActMess> = reactive({
      name: "",
      actTime:ref<Moment[]>([]),
      pic: "",
      ruleType: 1,
      ruleContent: "",
      ifDisplay: 1,
      ruleBaseMap: ""
    });
    let activePanel = ref("xxxx");
    let theId = ref("");
    const rules = {
      name: [
        { required: true, message: "请输入活动名称", trigger: "blur" },
        { min: 3, max: 20, message: "长度范围在3到20", trigger: "blur" }
      ],
      actTime:[{ required: true, message: "活动起止时间不能为空"}]
     /*  ruleType: [{ required: true, message: "请选择活动规则", trigger: "change" }],
      ifDisplay: [{ required: true, message: "请选择推广方式", trigger: "change" }] */
    };
   const checked=ref(false);
   const setActive = (id: string) => {
      activeKey.value = "decoration";
      activePanel.value = id;
      theId.value = id;
      store.commit("setActive", id);
  };
   const userListChange=(val: any)=>{
      winOptimize.value=val
   };
    const dataEcho=()=>{ // 数据回显的处理
    };
    const setAwardList = (num: number) => {
      awardList.value=[];
      let awardLabels=["特等奖","一等奖","二等奖","三等奖","四等奖","五等奖","六等奖","七等奖"];
      for(let i=0;i<num;i++){
        let obj={
          name: "", //奖项名称
          giftAmount: 0, //库存
          rate: 0, //中奖概率
          pic:"http://enbrands-2.oss-cn-shanghai.aliyuncs.com/user/87d442b0942f7b0e2fe2f02e01d3fef9.png", //奖品图片
          level: 0, //奖品等级
          type: 1, //奖品类型  1积分  2礼品
          default:'0',
          score:0,
          giftId:0,
          giftAvailableAmount: 0,
          giftRemainAmount: 0,
          rewardId: 0
        }
        obj.level=i;
        if(i==num-1){
          obj.default='1'
        }
        awardList.value.push(obj);
        let obj1={
          label:awardLabels[i],
          value:i
        }
        awardLevelList.value.push(obj1)
        console.log(awardList,'awardLevelList')
      }
    };
    const setAwardLevelList=(num: number)=>{
      awardLevelList.value=[];
      let awardLabels=["特等奖","一等奖","二等奖","三等奖","四等奖","五等奖","六等奖","七等奖"];
      for(let i=0;i<num;i++){
        let obj1={
          label:awardLabels[i],
          value:i
        }
        awardLevelList.value.push(obj1)
      }
    };
    const awardNumChange = (e: any) => {
      setAwardList(e.target.value);
      setAwardLevelList(e.target.value)
    };
    const detailData=(obj: any)=>{  // 获取大转盘的详情
        detailBigWheels(obj).then((res: any)=>{
          if(res.retcode==0){
            //获取数据 res.content.base    detail
            let theBaseMess=res.content.base;
            formActMess.name=theBaseMess.name;
            formActMess.pic=theBaseMess.pic;
            formActMess.ruleType=theBaseMess.ruleType;
            console.log(formActMess.ruleType,'formActMess.ruleTypeformActMess.ruleType')
            formActMess.ruleBaseMap=theBaseMess.ruleBaseMap;
            formActMess.ruleContent=theBaseMess.ruleContent;
            formActMess.ifDisplay=theBaseMess.ifDisplay;
            formActMess.actTime=[theBaseMess.beginAt,theBaseMess.endAt];
            store.state.bigWheel.components=theBaseMess.instConfigInfo;//页面装修数据
            isTiger.value=false;
            regularData.value=store.getters.getRegularProps.id;
            store.state.bigWheel.components.forEach((item: any)=>{
              if(item.layerName=='虎头'){
                isTiger.value=true;
              }
            })
            // 奖项设置
            let theRuleMess=res.content.detail.rule;
            awardList.value=res.content.detail.awardConfig;
            awardConfig.value=res.content.detail.awardConfig;
            formPriceMess.addTimesScore=theRuleMess.addTimesScore;
            if(formPriceMess.addTimesScore!=0){
              formPriceMess.isAddTimesScore=true
            }
            formPriceMess.freeTimesPerDay=theRuleMess.freeTimesPerDay;
            if(formPriceMess.freeTimesPerDay!=0){
              formPriceMess.isFreeTimesPerDay=true
            }

            formPriceMess.joinTimesPerDay=theRuleMess.joinTimesPerDay;
            formPriceMess.joinTimes=theRuleMess.joinTimes;
            if(formPriceMess.joinTimesPerDay!=0 || formPriceMess.joinTimes!=0){
              formPriceMess.isPriceLimit=true;
            }
            if(formPriceMess.joinTimesPerDay!=0){
              formPriceMess.isJoinTimesPerDay=true
            }
            if(formPriceMess.joinTimes!=0){
              formPriceMess.isJoinTimes=true;
            }
            // 中奖轮播
            let winning=res.content.detail.winCarousel;
            formPriceMess.displayDays=winning.displayDays
            formPriceMess.isDisplayDays=winning.displayDays!=0
            // 中奖信息优化
            formPriceMess.isWinOptimize=winning.winOptimize.length!=0;
            winOptimize.value=winning.winOptimize
            setAwardLevelList(awardList.value.length);
            awardNum.value=awardList.value.length;
          }
        })
    };
    const changeGift=(val: any)=>{
      awardConfig.value=val
    }
    const dealData=(val: number)=>{
       let params: any={}
          params={
            base:{
              status:val,  //1:保存 2:暂停 3:保存并发布活动 4:结束
              scenceId:1,
              instConfigInfo:store.state.bigWheel.components, //装修的数据
              name:formActMess.name,
              pic:formActMess.pic,
              beginAt:formActMess.actTime[0],
              endAt:formActMess.actTime[1],
              ruleType:formActMess.ruleType,
              ruleBaseMap:formActMess.ruleBaseMap,
              ruleContent:formActMess.ruleContent,
              ifDisplay:formActMess.ifDisplay
            },
            detail:{
              rule:{
                addTimesScore:formPriceMess.addTimesScore,
                freeTimesPerDay:formPriceMess.freeTimesPerDay,
                joinTimesPerDay:formPriceMess.joinTimesPerDay,
                joinTimes:formPriceMess.joinTimes
              },
              winCarousel:{
                displayDays:formPriceMess.displayDays,
                winOptimize:winOptimize.value   //nick  mobile  level  待调试
              },
              awardConfig:awardConfig.value   //name pic level giftAmount default rate type giftId score
            }
          }
          if(route.query.id){
            params.actId=+route.query.id
            editBigWheels(params).then((res: any) => {
              if(res.retcode==0){
                message.success('活动编辑成功')
              }
            });
          }else{
             addBigWheels(params).then((res: any) => {
                if(res.retcode==0){
                  message.success('活动创建成功')
                }
              });
          }
          
    };
   
    type DealAwardFun=() => {
      status: boolean;
      msg: string;
    };
    const dealAward: DealAwardFun=()=>{
      let rate=0;
      for(let i=0;i<awardConfig.value.length;i++){ //name pic level giftAmount default rate type giftId score
        let len=i+1;
       
         rate+=awardConfig.value[i].rate;
        if(awardConfig.value[i].name==''){
          
          return {
            status:false,
            msg:`数据${len}中的奖品名称不能为空`
          }
        }
        if(awardConfig.value[i].pic==''){
          return {
            status:false,
            msg:`数据${len}中的奖品图片不能为空`
          }
        }
        if(awardConfig.value[i].giftId==0 && awardConfig.value[i].type==2){
          return {
            status:false,
            msg:`数据${len}中的请选择礼品`
          }
        }
        if(awardConfig.value[i].score==0 && awardConfig.value[i].type==1){
          return {
            status:false,
            msg:`数据${len}中奖励积分不能为0`
          }
        }
        if(rate>100){
          return {
            status:false,
            msg:`所有数据${len}中的概率之和不能大于1`
          }
        }
      }
      return {
        status:true,
        msg:''
      }
    }
    const dealRegular=()=>{
      if(!formPriceMess.isFreeTimesPerDay){ //每日赠送抽奖机会
            formPriceMess.freeTimesPerDay=0;
          }
          if(!formPriceMess.isAddTimesScore){  //额外抽奖机会使用积分
            formPriceMess.addTimesScore=0;
          }
          if(!formPriceMess.isPriceLimit){   // 抽奖次数限制
            formPriceMess.joinTimesPerDay=0;
            formPriceMess.joinTimes=0;
            formPriceMess.isJoinTimesPerDay=false;
            formPriceMess.isJoinTimes=false;
          }
          if(!formPriceMess.isJoinTimesPerDay){ // 每日抽奖次数限制
            formPriceMess.joinTimesPerDay=0;
          }
          if(!formPriceMess.isJoinTimes){      //活动期间抽奖次数限制
            formPriceMess.joinTimes=0;
          }
          if(!formPriceMess.isDisplayDays){    //中奖轮播
            formPriceMess.displayDays=0
          }
          if(!formPriceMess.isWinOptimize){   //中奖信息优化
              //优化数组
              winOptimize.value=[]
          }
    }

    const onSubmit = (goWhere: string,dealWho: string) => {
      //1 下一步 以及tab切换的校验
      //2  表格数据的传递以及回显
      //3  规则数据的回显考虑
      //4  奖项设置逻辑的开发
      switch(dealWho){
        case 'actMess':
          formRef.value.validate().then(() => {
             activeKey.value = goWhere;//  endAt  beginAt
          }).catch((error: ValidateErrorEntity<FormActMess>) => {
            console.log("error", error);
          }); 
        break;
        case 'award':
          //校验奖项设置的必填
          if(dealAward().status){
            activeKey.value = goWhere;
          }else{
            message.error(`${dealAward().msg}`)
          }
        break;
        case 'regular':
          dealRegular()
          activeKey.value = goWhere;
        break;
        case 'decoration':
          activeKey.value = goWhere;
        break;
        case 'save':
          dealData(1)
        break;
        case 'saveAndpublish':
          //status=3;
          dealData(3)
        break;
      }
      
    };
    
    const resetForm = () => {
      formRef.value.resetFields();
    };
    const changeType = (e: any) => {
      store.commit("setActive", e);
      theId.value = e;
    };
    
    
    
    const clickRegular = () => {
      activeKey.value = "decoration";
      
      store.commit("setActive", regularProps.value.id);
      activePanel.value = regularProps.value.id;
    };
    const changeTiger=(v: any)=>{
      store.commit('setComponents',v.target.checked)
    }
    const changeTheme=(v: any)=>{
      let obj={
        isTiger:isTiger,
        theme:v.target.value
      }
      store.commit('setComponentsDefault',obj)
    }
    const closeRegular = () => {
      store.commit("setActive", "");
      activePanel.value = "";
    };
    
    const changedata = (obj: any) => {
      let theid = null;
      if (obj.id) {
        theid = obj.id;
      } else {
        theid = theId.value;
      }
      if(obj.key=="src"){
        store.commit("updateComponent", { key: [obj.key], value: [obj.value], id: theid });
      }else if(obj.key=="backgroundImage"){
        let backImg=''
        if(obj.value){
           backImg= `url(${obj.value})`
        }
        store.commit("updateComponent", { key: [obj.key], value: [backImg], id: theid });
      }else if (
        obj.key == "text1Color" ||
        obj.key == "textColor" ||
        obj.key == "color" ||
        obj.key == "boxShadow" ||
        obj.key == "border" ||
        obj.key == "backgroundColor" ||
        obj.key == "background"
      ) {
        store.commit("updateComponent", { key: [obj.key], value: [obj.value], id: theid });
      } else if (obj.key == "text1"||obj.key == "text" || obj.key == "btnText" || obj.key=='regularText') {
        store.commit("updateComponent", {
          key: [obj.key],
          value: [obj.value.target.value],
          id: theid
        });
      } else if (obj.key == "richText") {
        store.commit("updateComponent", { key: ["richText"], value: [obj.value], id: theid });
      } else if (obj.key == "display") {
        let zhi = "none";
        if (obj.value.target.checked) {
          zhi = "block";
          //store.commit("setActive", theId.value);
        } else {
          store.commit("setActiveRandom", theid);
        }
        store.commit("updateComponent", { key: [obj.key], value: [zhi], id: theid });
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
        store.commit("updateComponent", { key: keyArr, value: valueArr, id: theid });
      } else {
        store.commit("updateComponent", { key: [obj.key], value: [`${obj.value}px`], id: theid });
      }
    };
    

    const changeRegular=(obj: any)=>{
      debugger
        if(obj.key=='backgroundImage'){
          formActMess.ruleBaseMap=obj.value
        }
        if(obj.key=='richText' || obj.key=='src'){
          formActMess.ruleContent=obj.value
        }
    }; 
    // 1、获取规则的ID
    // 2、类型改变时，更清空store中的底图和规则，ruleType
    // 3，底图和规则改变时，修改store 中的底图和规则
    const changeRuleType=(e: any)=>{   // w没有调用changedata
      let keysArr=['backgroundImage','richText','src','ruleType'];
      let valuesArr=['','','',e.target.value];
      store.commit("updateComponent", { key: keysArr, value: valuesArr, id:regularData.value });
      console.log(store,'store')
      formActMess.ruleBaseMap='';
      formActMess.ruleContent='';
    }
    const changeRuleContent=(e: any)=>{
       let obj={
           id:regularData.value,
           key:'richText',
           value:e.target.value
        }
        changedata(obj)
    }
    const imageUrl = (data: { para: string; name: string }) => {
       if(data.para=='ruleBaseMap'){
         let obj={
           id:regularData.value,
           key:'backgroundImage',
           value:data.name
         }
         changedata(obj)
       }
       if( data.para=='ruleContent'){
         let obj={
           id:regularData.value,
           key:'src',
           value:data.name
         }
         changedata(obj)
       }
      formActMess[data.para] = data.name;
    };
    const handleChange = (e: any) => {
      store.commit("updateComponent", e);
    };
    const updatePosition = (data: { left: number; top: number; id: string }) => {
      const { id } = data;
      const updatedData = pickBy<number>(data, (v, k) => k !== "id");
      const keysArr = Object.keys(updatedData);
      const valuesArr = Object.values(updatedData).map((v) => v + "px");
      store.commit("updateComponent", { key: keysArr, value: valuesArr, id });
    };
    onMounted(() => {
      regularData.value=store.getters.getRegularProps.id;
      if(route.query.id){
        let obj={id:route.query.id};
        detailData(obj) 
      }else{
        setAwardList(4);
        setAwardLevelList(4);
        
      }
      
    });
    return {
      toolbarOptions,
      setAwardList,
      setAwardLevelList,
      awardNumList,
      awardLevelList,
      awardNum,
      checked,
      awardList,
      route,
      awardConfig,
      theRadio,
      winOptimize,//轮播的数组
      isTiger,
      activeKey,
      formRef,
      changedata,
      changeRegular,
      clickRegular,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      formActMess,
      rules,
      backImgProps,
      titleProps,
      dialogArr,
      regularProps,
      dialogProps,
      closeRegular,
      lComponents,
      rComponents,
      activePanel,
      theId,
      formPriceMess,
      imageUrl,
      handleChange,
      onSubmit,
      userListChange,
      dataEcho,
      resetForm,
      updatePosition,
      setActive,
      currentElement,
      changeType,
      changeRuleType,
      changeRuleContent,
      changeTiger,
      changeTheme,
      changeGift,
      dealData,
      detailData,
      awardNumChange
    };
  }
});

</script>
<style lang="less" scoped>

</style>
