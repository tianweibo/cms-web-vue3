<template>
  <span @click="handleBackEvent" class="back"><LeftOutlined />返回</span>
  <div class="decorate-wrap">
    <exchange-preview :fullData="fullData"></exchange-preview>
    <exchange-decorate
      :fullData="editInfo"
      @selectCurrentRule="selectCurrentRuleEvent"
      @updateBaseForm="updateBaseForm"
      @updateGiftForm="updateGiftForm"
      @updateRulesInfo="updateRulesInfo"
      @updateDecoret="updateDecoret"
    ></exchange-decorate>
  </div>
</template>
<script lang="ts">
import { LeftOutlined } from "@ant-design/icons-vue";
import exchangeDecorate from "./components/exchange-decorate.vue";
import exchangePreview from "./components/exchange-preview.vue";
import { defineComponent, ref, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useSort from "./hooks/useSort";
import deepClone from "clone";
import { FullData, BaseForm, GiftForm, RulesInfo, DecorateInfo } from "./types/index";
import { baseFormInfo, baseGiftInfo, baseRulesInfo, baseDecorateInfo } from "./config/fullData";
export default defineComponent({
  components: {
    LeftOutlined,
    exchangeDecorate,
    exchangePreview
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const baseForm: BaseForm = baseFormInfo;
    const giftInfo: GiftForm = baseGiftInfo;
    const rulesinfo: RulesInfo = baseRulesInfo;
    const decorateInfo: DecorateInfo = baseDecorateInfo;
    const editInfo: Ref<FullData> = ref({
      baseForm,
      giftInfo,
      rulesinfo,
      decorateInfo
    });
    const fullData: Ref<FullData> = ref({
      baseForm: baseFormInfo,
      giftInfo: baseGiftInfo,
      rulesinfo: baseRulesInfo,
      decorateInfo: baseDecorateInfo
    });
    const editExchangeEvent = async () => {
      const { content } = route.params;
      const data = JSON.parse(content as string);
      const decoreInfo = deepClone(JSON.parse(data.ruleJson));
      const ruleListSet = useSort(deepClone(data.ruleEvent));
      ruleListSet.forEach(item => {
        if (item.ruleOrder === 0) {
          decoreInfo.rulesinfo.deduction.id = item.id;
        } else {
          console.log(item.ruleOrder);
          decoreInfo.rulesinfo.ruleListSet[item.ruleOrder - 1].id = item.id;
        }
      });
      editInfo.value = decoreInfo;
      fullData.value.decorateInfo = editInfo.value.decorateInfo;
      fullData.value.decorateInfo.currentRule = "1";
    };
    const copyExchangeEvent = async () => {
      const { content } = route.params;
      const data = JSON.parse((content as string))
        const decoreInfo = deepClone(JSON.parse(data.ruleJson));
        const ruleListSet = useSort((deepClone(data.ruleEvent)))
        ruleListSet.forEach((item) => {
          if (item.ruleOrder === 0) {
            decoreInfo.rulesinfo.deduction.id = item.id
          } else {
            console.log(item.ruleOrder)
            decoreInfo.rulesinfo.ruleListSet[item.ruleOrder - 1].id = item.id;
          }
        });
        editInfo.value = decoreInfo;
        editInfo.value.baseForm = baseFormInfo
        editInfo.value.giftInfo = baseGiftInfo
        fullData.value.decorateInfo = editInfo.value.decorateInfo;
        fullData.value.decorateInfo.currentRule = "1"
    }
    const handleBackEvent = () => {
      router.push({
        path: "list"
      });
    };
    // 设置当前联动的规则tab数据
    const selectCurrentRuleEvent = type => {
      fullData.value.decorateInfo.currentRule = type;
    };
    const init = async () => {
      const { edit } = route.query;
      // 编辑
      if (edit === "edit") {
        await editExchangeEvent();
        // 复制
      } else if (edit === "copy") {
        await copyExchangeEvent();
      }
    };
    // const updataAlldataEvent = (value) => {
    //   // console.log(value, 'updataAlldat')
    //   // fullData.value.baseForm = value.baseForm;
    //   // fullData.value.giftInfo = value.giftInfo;
    //   // fullData.value.rulesinfo = value.rulesinfo;
    //   // fullData.value.decorateInfo = value.decorateInfo;
    // };
    const updateBaseForm = value => {
      fullData.value.baseForm = value;
    };
    const updateGiftForm = value => {
      fullData.value.giftInfo = value;
    };
    const updateRulesInfo = value => {
      fullData.value.rulesinfo = value;
    };
    const updateDecoret = value => {
      fullData.value.decorateInfo = value;
    };

    init();
    return {
      editInfo,
      fullData,
      // updataAlldataEvent,
      handleBackEvent,
      selectCurrentRuleEvent,
      updateBaseForm,
      updateGiftForm,
      updateRulesInfo,
      updateDecoret
    };
  },
});
</script>
<style lang="less" scoped>
.back {
  cursor: pointer;
}

.decorate-wrap {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 134px);
}
</style>
