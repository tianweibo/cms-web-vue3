<template>
  <div class="fitment-wrap">
    <div class="custom">
      请选择使用:
      <a-radio-group name="radioGroup" v-model:value="baseInfoData.theme" @change="themeChangeEvent">
        <a-radio value="2">自定义主题</a-radio>
        <a-radio value="1">默认</a-radio>
      </a-radio-group>
    </div>
    <div class="card-container" >
      <a-tabs type="card" v-model:activeKey="baseInfoData.currentRule" @change="handleSelectPane">
        <a-tab-pane style="padding: 0" key="1" tab="兑换页">
          <div>
            <exchange-page ref="exPage" @updateValue="exchangePageUpdate" :baseInfoData="baseInfoData" />
          </div>
        </a-tab-pane>
        <a-tab-pane style="padding: 0" key="2" tab="活动规则">
          <div>
            <act-rule @updateValue="actRuleUpdate" :rootData="baseInfo" :baseInfoData="baseInfoData" />
          </div>
        </a-tab-pane>
        <a-tab-pane style="" key="3" tab="兑换记录">
          <div>
            <exchange-record :baseInfoData="baseInfoData" @updateValue="exchangeRecordUpdate" />
          </div>
        </a-tab-pane>
        <a-tab-pane style="" key="4" tab="确认兑换">
          <div>
            <comfirm-exchange :baseInfoData="baseInfoData" @updateValue="exchangeConfirmUpdate" />
          </div>
        </a-tab-pane>
        <a-tab-pane style="" key="5" tab="兑换成功">
          <exchange-succ :baseInfoData="baseInfoData" @updateValue="exchangeSuccUpdate" />
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="footer">
      <a-button type="primary" @click="handleBack">上一步</a-button>
      <a-button v-if="isRun" @click="handleSave">保存并发布活动</a-button>
      <a-button @click="handleSave('save')" type="primary">保存</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, Ref, PropType, UnwrapRef } from "vue";
import exchangePage from "./fitcom/exhange-page.vue";
import actRule from "./fitcom/act-rule.vue";
import exchangeRecord from "./fitcom/exchange-record.vue";
import comfirmExchange from "./fitcom/comfirm-exchange.vue";
import exchangeSucc from "./fitcom/exchange-succ.vue";
import { useRoute } from "vue-router";
import deepClone from "clone";
import { FullData, DecorateInfo } from "../types/index";
export default defineComponent({
  components: {
    exchangePage,
    actRule,
    exchangeRecord,
    comfirmExchange,
    exchangeSucc,
  },
  props: {
    baseInfo: Object as PropType<FullData>,
  },
  emits: ['handleSubmit', 'handleTab', 'selectCurrentRule', 'updateValues', 'themeChange'],
  setup(props, context) {
    const route = useRoute()
    const isRun: Ref<boolean> = ref(true)
    const isEdit: boolean = route.query && route.query.edit === 'edit' ? true : false
    if (route.query && route.query.edit === 'edit' && route.query.exchangeStatus === '4') {
      isRun.value = false
    } else {
      isRun.value = true
    }
    // 拿到默认的数据来克隆一份
    const baseInfoData: UnwrapRef<DecorateInfo> = reactive(deepClone((props["baseInfo"] as FullData)["decorateInfo"]));
    baseInfoData.theme = (baseInfoData && baseInfoData.theme) || "1";
    const currentRule = ref("1");
    const handleBack = () => {
      context.emit("handleTab", currentRule.value, "threshold");
      baseInfoData.currentRule = '1'
    };
    const handleSelectPane = (cur) => {
      baseInfoData.currentRule = cur
    };
    const handleSave = (type) => {
      console.log("handle save 校验提交数据");
      context.emit('handleSubmit', type)
    };
    // 兑换页面
    const exchangePageUpdate = (value) => {
      console.log('父组件更新了吗')
      baseInfoData.exchangePage = value
    }
    // 规则
    const actRuleUpdate = (value) => {
      console.log('父组件更新了吗')
      baseInfoData.actRule = value
    }
    // 兑换记录
    const exchangeRecordUpdate = (value) => {
      baseInfoData.exchangeRecord = value
    }
    // 确认兑换
    const exchangeConfirmUpdate = (value) => {
      baseInfoData.comfirmExchange = value
    }
    // 成功兑换
    const exchangeSuccUpdate = (value) => {
      baseInfoData.exchangeSucc = value
    }
    const exPage = ref()
    const exrule = ref()
    const exrecord = ref()
    const exComfirm = ref()
    const exSucc = ref()
    const themeChangeEvent = (evt) => {
      exPage.value.clearBgImg()
      const type = evt.target.value
      if (type === '1' && baseInfoData.currentRule === '1') {
        exPage.value.clearBgImg()
        
      } else if (type === '1' && baseInfoData.currentRule === '2'){
        exrule.value.clearBgImg()
        
      } else if (type === '1' && baseInfoData.currentRule === '3') {
        exrecord.value.clearBgImg()
       
      } else if (type === '1'  && baseInfoData.currentRule === '4') {
         exComfirm.value.clearBgImg()
       
      } else if (type === '1'  && baseInfoData.currentRule === '5') {
         exSucc.value.clearBgImg()
      }
      baseInfoData.exchangeSucc.bg = []
      baseInfoData.exchangeRecord.bg = []
      baseInfoData.exchangePage.bgInfo = []
      baseInfoData.actRule.bg = []
      baseInfoData.comfirmExchange.bg = []
    }
    watch(
      baseInfoData,
      () => {
        context.emit("updateValues", baseInfoData);
      },
      { deep: true }
    );
    return {
      exPage,
      // 动态更新装修数据
      exchangeSuccUpdate,
      exchangeConfirmUpdate,
      exchangeRecordUpdate,
      actRuleUpdate,
      exchangePageUpdate,
      currentRule,
      themeChangeEvent,
      // 装修样式规则
      handleSelectPane,
      handleBack,
      handleSave,
      // 装修数据
      baseInfoData,
      isRun,
      isEdit
    };
  },
});
</script>
<style lang="less" scoped>
.fitment-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-right: 40px;
  padding-left: 40px;
}

.footer {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

:deep(.ant-tabs-tab) {
  width: 88px !important;
}

:deep(.ant-tabs-content) {
  height: 600px !important;
}

input[type="color"] {
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

// 布局
.card-container {
  margin-top: 24px;
  // overflow: hidden;
  // height: 500px;
  padding: 1px;
  background: #f5f5f5;
}

:deep(.ant-tabs) {
  overflow: none;
}

.card-container>.ant-tabs-card>.ant-tabs-content {
  margin-top: -16px;
}

.card-container>.ant-tabs-card>.ant-tabs-content>.ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}

.card-container>.ant-tabs-card>.ant-tabs-bar {
  border-color: #fff;
}

.card-container>.ant-tabs-card>.ant-tabs-bar .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}

.card-container>.ant-tabs-card>.ant-tabs-bar .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}

// 表单样式之兑换
.exhange-bg {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
</style>
