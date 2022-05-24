<template>
  <div class="condition-box">
    <div class="condition-relation">
      <div class="condition-relation__line"></div>
      <div  class="condition-relation__text" v-if="ruleLineInfo && ruleLineInfo.validateType === 'and' || ruleLineInfo && ruleLineInfo.validateType === 'or'">
         <span v-if="ruleLineInfo && ruleLineInfo.validateType === 'and'"
          class="and-icon">且</span >
            <span v-if="ruleLineInfo && ruleLineInfo.validateType === 'or'"
          class="and-icon">或</span >
      </div>
    </div>
    <div class="condition-content">
      <div v-for="(item, index) in ruleList && ruleList" :key="index">
        <slot name="item" v-bind="{item, index}" />
      </div>
    </div>
  </div>
  <a-button v-if="ruleLineInfo && ruleLineInfo.show" @click="handleAdd">{{
    ruleLineInfo && ruleLineInfo.btnText ? ruleLineInfo.btnText : "添加规则"
  }}</a-button>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { RulesInfo } from '../../types/index'
interface RuleLineInfoType {
  btnText: string;
  show: boolean;
  validateType: string;
  ruleType?: string;
}
export default defineComponent({
  components: {},
  props: {
    ruleLineInfo: Object as PropType<RuleLineInfoType>,
    ruleList: Array as PropType<RulesInfo['ruleList']>,
  },
  emits: ['handleAddRulesContent'],
  setup(props, context) {
    console.log(props.ruleList, "ruleList");
    console.log(props.ruleLineInfo, "ruleLineInfo");
    const checked = ref<boolean>(false);
    const visible = ref<boolean>(false);

    const cancel = () => {
      visible.value = false;
    };
    const handleVisibleChange = (bool: boolean) => {
      console.log(bool, "visible");
    };
    const handleAdd = (add) => {
      context.emit("handleAddRulesContent", "cur");
      console.log(add, "add");
    };
  
    return {
      handleAdd,
      checked,
      visible,
      cancel,
      handleVisibleChange,
    };
  },
});
</script>
<style lang="less" scoped>
.condition-box {
  display: flex;
  margin-top: 12px;
  padding: 20px 0;
}

.condition-relation {
  position: relative;
  flex: none;
  width: 20px;
}

.condition-relation__line {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  margin-left: -1px;
  background: #dbdefb;
}

.condition-relation__text {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  line-height: 20px;
  text-align: center;
  background: #dbdefb;
  border-radius: 4px;
  cursor: pointer;
}

.condition-content {
  flex: auto;
  margin-left: 12px;
}

.custom-line {
  height: 100%;
  border-left: 2px solid #f0f0f0;
}

.and-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  color: #4a5aed;
  line-height: 20px;
  background: #dbdefb;
  border-radius: 5px;
}

.link {
  position: absolute;
  top: -7px;
  left: 0;
  display: inline-block;
  height: 20px;
  border-left: 2px solid #f0f0f0;
}
</style>
