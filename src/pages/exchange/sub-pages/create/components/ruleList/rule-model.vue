<template>
  <div>
    <rule-line
      :ruleLineInfo="{ btnText: '添加规则', show: isRule, validateType: ruleList && ruleList.length >= 2 ? 'and' : '' } "
      :ruleList="ruleList"
      @handleAddRulesContent="handleAddRulesContentEvent"
    >
      <template #item="current">
        <rule-content
          :current="current"
          :conditionList="conditionList"
          :isPoints="isPoints"
          @setcurrentEdit="setcurrentEditEvent"
          @selectRuleType="supSelectRuleTypeEvent"
          @deleteBlock="supDeleteBlockEvent"
          @copyBlock="supCopyBlockEvent"
          @exchangeRuleTitle="supExchangeRuleTitleEvent"
          @tagExchange="supTagExchangeEvent"
          @deleteTag="supDeleteTagEvent"
          @handleCondition="suphandleConditionEvent"
          @pointsChange="suppointsChangeEvent"
        />
      </template>
    </rule-line>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, PropType } from "vue";
import ruleLine from "./rule-line.vue";
import ruleContent from "./rule-content.vue";
import { RulesInfo } from '../../types/index'
interface GENDATA {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataList: any[];
}

export default defineComponent({
  components: {
    ruleLine,
    ruleContent,
  },
  props: {
    ruleList: Array as PropType<RulesInfo['ruleList']>,
    isRule:Boolean,
    conditionList: Object as PropType<GENDATA>,
    isPoints:  Boolean as PropType<boolean>,
  },
  emits: ["handleAddRuleBlock", "setcurrentEdit", "selectRuleType", "deleteBlock", 'copyBlock', 'exchangeRuleTitle', 'tagExchange', 'deleteTag', 'handleCondition', 'pointsChange'],
  setup(props, context) {
    watch((props['conditionList'] as GENDATA), (val, oldv) => {
      console.log(val, oldv, 'watchwatch')
    })
    const handleAddRulesContentEvent = (cur) => {
      console.log(cur);
      context.emit("handleAddRuleBlock");
    };
    const setcurrentEditEvent = ({ item, index }) => {
      context.emit("setcurrentEdit", { item, index });
    };
    const supSelectRuleTypeEvent = (nodeType) => {
      context.emit("selectRuleType", nodeType);
    };
    const supDeleteBlockEvent = (current) => {
      context.emit("deleteBlock", current);
    };
    const supCopyBlockEvent = (current) => {
      console.log('supCopyBlock')
      context.emit("copyBlock", current);
    }
    const supExchangeRuleTitleEvent = (value, current) => {
      context.emit('exchangeRuleTitle', value, current)
    }
    const supTagExchangeEvent = (obj, current, child, childIndex) => {
      console.log('检测三级缺失', obj, current,child, childIndex)
      context.emit('tagExchange', obj, current, child, childIndex)
      return 
    }
    const supDeleteTagEvent = (current, child, childIndex) => {
      console.log('检测三级缺失', current, childIndex)
      context.emit('deleteTag', current, child, childIndex)
      return
    }
    const suphandleConditionEvent = (type, current ) => {
      console.log(type, current, 'currentcurrentcurrent')
      context.emit('handleCondition', type, current)
    }
    const suppointsChangeEvent = (value, current) => {
      console.log('检测三级缺失',value, current)
      context.emit('pointsChange', value, current)
      return
    }
    return {
      // 删除子节点
      supDeleteTagEvent,
      supTagExchangeEvent,
      supExchangeRuleTitleEvent,
      supCopyBlockEvent,
      supDeleteBlockEvent,
      supSelectRuleTypeEvent,
      setcurrentEditEvent,
      handleAddRulesContentEvent,
      suphandleConditionEvent,
      suppointsChangeEvent,
    };
  },
});
</script>
<style lang="less"></style>
