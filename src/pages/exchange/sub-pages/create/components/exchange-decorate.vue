<template>
  <div class="card-container">
    <a-row class="tabs-wrap">
      <a-col
        :class="{ 'tab-title': true, active: item.key === activeKey ? true : false }"
        v-for="item in tabs"
        :key="item.key"
        :span="6"
      >
        <span>{{ item.label }}</span>
      </a-col>
    </a-row>
    <keep-alive>
      <div class="panel-wrap">
        <a-row v-if="activeKey === 1" class="tab-panel">
          <a-col :span="24">
            <base-form
              @baseFormNext="baseFormFinish"
              @handleTab="handleTab"
              :baseInfo="exchangeInfo"
              @updateValues="updateBase"
            ></base-form>
          </a-col>
        </a-row>
        <a-row v-if="activeKey === 2" class="tab-panel">
          <a-col :span="24">
            <gift-form @updateValues="updateGift" :baseInfo="exchangeInfo" @handleTab="handleTab"></gift-form>
          </a-col>
        </a-row>
        <a-row v-if="activeKey === 3" class="tab-panel">
          <a-col :span="24">
            <base-threshold
              @updateValues="updateRule"
              :baseInfo="exchangeInfo"
              @handleTab="handleTab"
            ></base-threshold>
          </a-col>
        </a-row>
        <a-row v-if="activeKey === 4" class="tab-panel">
          <a-col :span="24">
            <!-- 装修页面 -->
            <base-fitment
              @updateValues="updateDeco"
              :baseInfo="exchangeInfo"
              @handleTab="handleTab"
              @selectCurrentRule="selectCurrentRule"
              @handleSubmit="handleSubmit"
              @themeChange="themeChangeEvent"
            ></base-fitment>
          </a-col>
        </a-row>
      </div>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, reactive } from "vue";
import baseForm from "./base-form.vue";
import giftForm from "./gift-form.vue";
import baseThreshold from './base-threshold.vue'
import baseFitment from './base-fitment.vue'
import paramsDefault from './Hooks/paramscombination'
import moment from 'moment'
import * as create from '../../../../../api/exchange/create'
import deepClone from 'clone'
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { baseFormInfo, baseGiftInfo, baseRulesInfo, baseDecorateInfo } from '../config/fullData'
import { FullData } from "../types/index";

export default defineComponent({
  components: {
    baseForm,
    giftForm,
    baseThreshold,
    baseFitment
  },
  props: {
    fullData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ["baseFormNext", "handleTab", "selectCurrentRule",  'updateBaseForm', 'updateGiftForm', 'updateRulesInfo', 'updateDecoret', 'themeChange'],
  setup(props, context) {
    const router = useRouter()
    const route = useRoute()
    const tabs = reactive([
      {
        key: 1,
        label: "基础信息",
      },
      {
        key: 2,
        label: "礼品信息",
      },
      {
        key: 3,
        label: "门槛规则",
      },
      {
        key: 4,
        label: "页面装修",
      },
    ]);
    const activeKey = ref(1);
    // 总数据结构，提供回显之类的操作
    const exchangeInfo: Ref<FullData> = ref({
      baseForm: baseFormInfo,
      giftInfo: baseGiftInfo,
      rulesinfo: baseRulesInfo,
      decorateInfo: baseDecorateInfo
    });
    if (props && props['fullData'] && route.query && route.query.edit) {
      exchangeInfo.value = deepClone(props['fullData'])
    }
    const handleTab = (formState, flag) => {
      // threshold
      if (flag === 'baseForm') {
        activeKey.value = 1;
      } else if (flag === "gift") {
        activeKey.value = 2;
      } else if (flag === 'threshold') {
        activeKey.value = 3;
      } else {
        activeKey.value = 4;
      }
    };
    // 基础信息设置……
    const baseFormFinish = (value) => {
      console.log(value);
    };
    // 选择哪种规则
    const selectCurrentRule = (value) => {
      context.emit('selectCurrentRule', value, exchangeInfo.value)
    }
    const updateBase = (baseInfo) => {
      exchangeInfo.value.baseForm = baseInfo
      if (exchangeInfo.value.decorateInfo.actRule.textObj.richTxt.length < baseInfo.ruleText.length) {
        exchangeInfo.value.decorateInfo.actRule.textObj.richTxt = baseInfo.ruleText
      }
      if (baseInfo.ruleImg.length > 0) {
        exchangeInfo.value.decorateInfo.actRule.bg = baseInfo.ruleImg
      }
      // updateBaseForm
      context.emit('updateBaseForm', baseInfo)
    }
    const updateGift = (giftInfo) => {
      exchangeInfo.value.giftInfo = giftInfo
      context.emit('updateGiftForm', giftInfo)
    }
    const updateRule = (rulesinfo) => {
      exchangeInfo.value.rulesinfo = rulesinfo
      context.emit('updateRulesInfo', rulesinfo)
    }
    const updateDeco = (decorateInfo) => {
      exchangeInfo.value.decorateInfo = decorateInfo
      context.emit('updateDecoret', decorateInfo)
    }
    const themeChangeEvent = (value) => {
      console.log('themeChangebaseDecorateInfo', baseDecorateInfo)
      if( value === '1') {
        context.emit('updateDecoret', baseDecorateInfo)
      } else {
        context.emit('updateDecoret', exchangeInfo.value.decorateInfo)
      }
    }
    // watch(exchangeInfo, () => {
    //   context.emit('updateAllData', exchangeInfo.value)
    // }, { deep: true })
    const handleSubmit = (type) => {
      console.log('提交数据开始了', type)
      const condition = paramsDefault().ruleConditionParams(exchangeInfo.value)
      const eventParams = paramsDefault().ruleEventParams(exchangeInfo.value)
      const maxScore = paramsDefault().maxScore(exchangeInfo.value)
      const minScore = paramsDefault().minScore(exchangeInfo.value)
      const getStatus = (type) => {
        if (route.params && route.query.exchangeStatus === '4') {
          return 1
        } else {
          return type === 'save' ? 0 : 1
        }
      }
      const status = getStatus(type)
      exchangeInfo.value.baseForm.actPic.map(item => {
        return { url: item && item['url'] }
      })
      console.log(exchangeInfo.value, 'exchangeInfo.value.')
      const timeSplit = (value) => {
        const date: string[] = []
        if (value.length === 0) {
          return []
        }
        value.forEach(item => {
          date.push(moment(item).format('HH:mm'));
        })
        return date
      }
      const param: any= {
        actId: route.query.edit === 'edit' ? route.query.actId : 0,
        actPic: JSON.stringify(exchangeInfo.value.baseForm.actPic),
        ruleCondition: condition && condition.ALL.length !== 0 ? JSON.stringify(condition) : '',
        ruleJson: JSON.stringify(exchangeInfo.value),
        ruleEvent: eventParams,
        instConfigInfo: JSON.stringify(exchangeInfo.value.decorateInfo),
        // 基础表单
        maxScore,
        minScore,
        status,
        description: '',
        name: exchangeInfo.value.baseForm.name,
        beginTime: moment(exchangeInfo.value.baseForm.date[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(exchangeInfo.value.baseForm.date[1]).format('YYYY-MM-DD HH:mm:ss'),
        label: exchangeInfo.value.baseForm.tag.tags.join(','),
        display: exchangeInfo.value.baseForm.display,
        actType: exchangeInfo.value.baseForm.actType,
        // 礼品信息
        giftId: exchangeInfo.value.giftInfo.id,
        giftPic: exchangeInfo.value.giftInfo.pictureUrl,
        giftAmount: exchangeInfo.value.giftInfo.giftAmount,
        exchangeControl: exchangeInfo.value.giftInfo.exchangeControl,
        everydayNum: exchangeInfo.value.giftInfo.sub.everydayNum,
        everydayTime: timeSplit(exchangeInfo.value.giftInfo.sub.everydayTime).join(','),
        inherit: exchangeInfo.value.giftInfo.sub.inherit,
      }
      console.log(param)
      create.addExchangeAct(param).then(res => {
        if (res.retcode === 0) {
          message.success('创建活动成功')
          router.push({
            name: 'ExchangeList'
          })
        }
      })
    }

    // onMounted(async () => {
    //   // await backFillDataEvent()
    //   // console.log('onMounted, 子组件onMounted---->')
    // })
    return {
      exchangeInfo,
      activeKey,
      tabs,
      handleTab,
      // 基础信息设置
      baseFormFinish,
      // 设置currentRule
      selectCurrentRule,
      // 更新value数据
      updateBase,
      updateGift,
      updateRule,
      updateDeco,
      handleSubmit,
      themeChangeEvent
    };
  },
});
</script>
<style lang="less" scoped>
.card-container {
  // background: #f5f5f5;
  // padding: 24px;
  width: 100%;
  // height: calc(100% - 64px - 22px -30px); 52 + 64 = 66 + 50 - 26 + 8
  height: calc(100vh - 134px);
  background-color: #fff;

  .tabs-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .tab-title {
      flex-grow: 1;
      height: 50px;

      /* 中性色/#333 */
      color: #333;
      font-size: 14px;
      line-height: 50px;

      /* identical to box height, or 143% */
      text-align: center;
      background: #e7eaf4;
    }

    .active {
      color: #4a5aed;
      background-color: #fff;
    }
  }

  .tab-panel {
    padding-top: 40px;
    background: #fff;
  }
}

:deep(.ant-tabs-tab-active) {
  border: none;
}
//
:deep(.card-container) > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

:deep(.ant-tabs-content) {
  height: 120px;
  margin-top: -16px;
}

//
:deep(.card-container)
  > .ant-tabs-card
  > .ant-tabs-content
  > .ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}

// .card-container > .ant-tabs-card >
:deep(.ant-tabs-bar) {
  border-color: #fff;
}

//
:deep(.card-container) > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  background: transparent;
  // border: none;
  // margin-right: 0;
  border-color: transparent;
}

//
:deep(.card-container) > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  background: #fff;
  border: none;
  border-color: #fff;
}

:deep(.ant-tabs-tab) {
  // width: 210px;
  width: calc(100% / 2);
  background: #e7eaf4;
}

:deep(.ant-tabs-top-content) {
  background: #fff;
}
</style>
