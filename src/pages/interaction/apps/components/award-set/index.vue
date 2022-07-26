<template>
    <div class="award-set">
            <div class="award-set_list">
              <a-collapse v-model:activeKey="activeKeyCollapse">
                <a-collapse-panel v-for="(item, index) in awardList" :key="index">
                  <template v-slot:header>
                    <img :src="item.pic" class="award-set_img" />
                    <span class="title_item"  v-if='item.default=="0"' style="color:#333;font-weight:700">{{awardLevelList[+item.level].label}}</span>|
                    <span  class="title_item" v-if='item.default=="1"'>默认奖项</span>
                    <span class="title_item">{{ item.name }}</span>
                    <span class="title_item" style="float:right;margin:4px 30px 0px 30px;">奖项库存:{{ item.giftAmount }}</span>
                    <span class="title_item" style="float:right;margin-top:4px;">中奖概率:{{ item.rate }}%</span>
                  </template>
                  <ul class="clearfix">
                    <div  v-if='item.default=="1"'>默认奖项</div>
                    <div  v-if='item.default=="1"'>(当其他奖项无库存时，会默认赠送该奖项，推荐设置为<span>赠送积分</span>或<span>谢谢参与</span>)</div>
                    <li class="award-set_uploadContent fl">
                      <uploadImg
                        :size="'80*80'"
                        :space="0.2"
                        :para="index.toString()"
                        :textpos="'bottom'"
                        :picUrl='item.pic'
                        @imageUrl="imageUrl"
                      ></uploadImg>
                    </li>
                    <li class="award-set_data fl">
                      <div class="dataItem fl clearfix">
                        <span class="fl">奖项等级</span>
                        <a-select
                          class="fl dataItem_input"
                          v-model:value="item.level"
                          :options="awardLevelList"
                          @change='changeGift'
                        >
                        </a-select>
                      </div>
                      <div class="dataItem fl clearfix">
                        <span class="fl">奖项库存</span>
                        <a-input v-if='item.default=="0" && item.type==2'
                          class="fl dataItem_input"
                          v-model:value="item.giftAmount"
                          placeholder="Basic usage"
                          :max="item.giftAvailableAmount"
                           @change='changeGift'
                        />
                        <a-input v-if='item.default=="0" && item.type==1'
                          class="fl dataItem_input"
                          v-model:value="item.giftAmount"
                          :max="item.giftAvailableAmount"
                          placeholder="Basic usage"
                           @change='changeGift'
                        />
                        <span class="fl" v-if='item.type==2'>(商品可用库存为{{item.giftAvailableAmount}})</span>
                         <span v-if='item.default=="1"'
                          class="fl" style="margin-left:5px;width:160px;"
                         >不限制</span>
                      </div>
                      <div class="dataItem fl clearfix">
                        <span class="fl">奖项名称</span>
                        <a-input
                          class="fl dataItem_input"
                          v-model:value="item.name"
                           @change='changeGift'
                          placeholder="Basic usage"
                        />
                      </div>
                      <div class="dataItem fl clearfix" style="position: relative">
                        <span class="fl"  v-if='item.default=="0"'>中奖概率</span>
                        <span class="fl"  v-if='item.default=="1"'>剩余概率</span>
                        <a-input-number  v-if='item.default=="0"'
                          class="fl dataItem_input"
                          v-model:value="item.rate"
                          placeholder="小数点后保留三位"
                          :min='0'
                          :max='99.999'
                          @blur="changeRate(item,awardList)"
                        />
                        <span class="fl" v-if='item.default=="1"' style="margin-left:5px;">{{item.rate}}</span>
                        <span class="tagHao">%</span>
                      </div>
                      <div class="dataItem fl clearfix" style="width: 400px">
                        <span class="fl">奖项类型</span>
                        <a-radio-group
                          class="fl dataItem_input"
                          style="margin-top: 10px"
                          :options="awardTypeList"
                          v-model:value="item.type"
                           @change='changeGift'
                          :disabled='item.default=="1"'
                        />
                      </div>
                      <div class="dataItem fl clearfix" v-if='item.type==2'>
                        <span class="fl">奖项礼品</span>
                        <a-button class="fl dataItem_input" type="primary" @click="clickChoiceGift(index)">选择礼品</a-button>
                      </div>
                      <div class="dataItem fl clearfix" v-if='item.type==1'>
                        <span class="fl">奖励积分</span>
                        <a-input
                          class="fl dataItem_input" 
                          v-model:value="item.score"
                           @change='changeGift'
                        />
                      </div>
                    </li>
                  </ul>
                </a-collapse-panel>
              </a-collapse>
              <div class='goSteop'>
                <a-button type="primary" @click="onSubmitMth('actMess','award')" >上一步</a-button>
                <a-button type="primary" @click="onSubmitMth('regular','award')" >下一步</a-button>
              </div>
            </div>
            <choiceGift
              v-if="dialogTableVisible==true"
              @closeDialog="closeDialog"
              @handChoice="getGift"
            >
            </choiceGift>
          </div>
</template>
<script lang="ts">
import { message } from 'ant-design-vue';
import { defineComponent, onMounted, ref, computed,PropType,watch} from 'vue';
import uploadImg from "../../components/decorate/common/upload-img.vue";
import choiceGift from "./award-choice.vue"
import {
  AwardLevelObject,
  AwardObject,
} from "./data-type";
export default defineComponent({
  emits: ["changeGift","onSubmit"],
  components:{
    uploadImg,choiceGift
  },
  props:{
    awardLists:Array as PropType<AwardObject[]>,
    awardLevelLists:Array as PropType<AwardLevelObject[]>,
  },
  setup(props, context) {
    const awardTypeList = [
      { label: "积分", value: 1 },
      { label: "礼品", value: 2 }
    ];
    let awardLevelList = computed(()=>
       props.awardLevelLists
    )
    let awardList = ref<Array<AwardObject>>([]);
    /* awardList.value=computed(()=>
       props.awardLists
    )  */
     watch(props,(newValue) => {
       if(newValue.awardLists){
         awardList.value=newValue.awardLists;
       }
     }); 
     const activeKeyCollapse = ref(["1"]);
     let theIndex=ref(0);
    let dialogTableVisible=ref(false)
    
    const changeGift=()=>{
       context.emit("changeGift", awardList.value);
    }
    const onSubmitMth=(val: string,val1: string)=>{
      context.emit("onSubmit", val,val1);
    }
    const clickChoiceGift=(index: number)=>{
      dialogTableVisible.value=true;
      theIndex.value=index
    }
    const closeDialog=()=>{
       dialogTableVisible.value=false
    }
    const getGift=(val: any)=>{
      awardList.value[theIndex.value].giftAvailableAmount=val.available
      awardList.value[theIndex.value].giftId=val.id;
      awardList.value[theIndex.value].pic=val.pictureUrl
    }
    const imageUrl = (data: { para: string; name: string }) => {
      let index=parseInt(data.para);
      awardList.value[index].pic=data.name
      changeGift()
    };
    const changeRate=(item: any,arr: any)=>{
      let gl=0;
      let len=arr.length;
      let rate=0;
      for(let i=0;i<arr.length-1;i++){
        gl+=arr[i].rate
      }
      if(gl>100){
        message.warn('中奖总概率不能大于1');
        return
      } 
      rate=+(parseFloat((100-gl).toString()).toFixed(3));
      awardList.value[len-1].rate=rate;
      changeGift()
    }
    
    onMounted(() => {
      //addServiceFun()
    });
    return {
      changeRate,
      imageUrl,
      onSubmitMth,
      awardTypeList,
      awardLevelList,
     //awardNum,
     dialogTableVisible,
     closeDialog,
     getGift,
     awardList,
     clickChoiceGift,
     activeKeyCollapse,
     changeGift
    };
  },
});
</script>
<style scoped>
.award-set {
    margin: 10px 40px 60px 40px;
}
.award-set_list {
    height: 610px;
    overflow-y: scroll;
}
.award-set_img {
      width: 32px;
      height: 32px;
}
.title_item {
      margin-right: 10px;
}
.imgRegural {
      margin-bottom: 20px;
      margin-left: 180px;
}
.imgRegural li {
        float: left;
}
.imgRegural li  .title {
          display: block;
          text-align: center;
}
.award-set_uploadContent {
    width: 120px;
}
.award-set_data {
    width: 620px;
    height: 200px;
}
.award-set_data .dataItem {
    height: 45px;
    margin-right: 15px;
    line-height: 45px;
}
.award-set_data .dataItem .dataItem_input {
    width: 160px;
    margin: 8px 4px;
}
.award-set_data .dataItem  .tagHao {
    position: absolute;
    top: 2px;
    right: -15px;
}
 .goSteop {
      text-align: center;
      margin-top:20px;
    }
    
</style>
