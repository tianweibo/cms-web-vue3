<template>
  <!-- 规则盒子 -->
  <div class="rule-wrap">
    <div class="divide"></div>
    <!-- 规则的名称  子规则   复制  删除全部 -->
    <!-- 单个规则 的删除 -->
    <a-collapse
      v-model:activeKey="activeKey"
      :bordered="false"
      style="background-color: #fff; border: none"
    >
      <template #expandIcon="{ isActive }">
        <div>
          <span v-if="!isActive">
            <PlusSquareOutlined  style="color: #97a6ba" />
          </span>
          <span v-else>
            <MinusSquareOutlined  style="color: #97a6ba" />
          </span>
        </div>
      </template>
      <a-collapse-panel key="1" customStyle="background: #fff;">
        <template #header>
          <div class="header-wrap">
            <div class="header-left">
              <span v-if="rulesName === '' && isEdit !== true">未命名</span>
              <span v-else-if="rulesName.length >= 0 && isEdit !== true">
                {{
                  rulesName
                }}
              </span>
              <span>
                <a-input
                  @blur="handleBulr"
                  @focus="
                    (e) => {
                      e.stopPropagation();
                    } "
                    @click="
                    (e) => {
                      e.stopPropagation();
                    }
                  "
                  style="width: 120px"
                  v-show="isEdit"
                  v-model:value="rulesName"
                  maxLenth="40"
                  placeholder="Basic usage"
                  @change="currentTitleChange"
                />
                <span class="name-edit">
                  <EditOutlined @click="handleEidt" style="color: #97a6ba" />
                </span>
              </span>
            </div>
            <div class="header-right">
              <!-- <PlusCircleOutlined />
              -->
              <custom-list :conditionList="conditionList" @selectRuleType="selectRuleType">
                <template #button>
                <!-- 设置当前的index 与childIndex -->
                  <span
                    @click="handleAddSub"
                    style="display: inline-block; width: 17px; height: 18px"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="8.5" cy="9" r="8.5" fill="#4A5AED" />
                      <line x1="4" y1="8.9" x2="13" y2="8.9" stroke="white" stroke-width="1.2" />
                      <line x1="8.6" y1="4.5" x2="8.6" y2="13.5" stroke="white" stroke-width="1.2" />
                    </svg>
                  </span>
                </template>
              </custom-list>
              <span class="sub-condition">子条件</span>
              <span class="sub-copy" @click="handleCopy">
                <CopyOutlined style="color: #97a6ba" />
              </span>
              <span class="sub-delete" @click="handleDelete">
                <DeleteOutlined style="color: #97a6ba" />
              </span>
            </div>
          </div>
        </template>
        <div class="content-title">
        <div>
         <span>门槛规则：</span>
             <a-radio-group v-model:value="ruleType" @change="handleCondition">
              <a-radio value="and">满足全部条件</a-radio>
              <a-radio value="or">满足任一条件</a-radio>
          </a-radio-group>
        </div>
         <div v-if="isPoints">
         <span >减扣积分数：</span>
            <a-input-number @change="pointsChange" id="inputNumber" v-model:value="points" :min="0"  />
         </div>
        </div>
        <rule-Line :ruleLineInfo="{ btnText: '', show: false, validateType: current && current.item &&current.item.children&& current.item.children.length >= 2 ? ruleType : '' }" :ruleList="current && current.item && current.item.children">
            <template  #item="current">
             <tag-list  @deleteTag="deleteTag" @tagExchange="tagExchange" :currentTag="current.item" :childIndex="current.index"></tag-list> 
            </template>
        </rule-Line>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script lang="ts">
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, PropType } from "vue";
import ruleLine from './rule-line.vue'
import customList from "./custom-list.vue";
import tagList from './tagList/index.vue'
import { RulesInfo } from '../../types/index'
interface GENDATA {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataList: any[];
}
export default defineComponent({
  components: {
    PlusSquareOutlined,
    MinusSquareOutlined,
    EditOutlined,
    CopyOutlined,
    DeleteOutlined,
    ruleLine,
    customList,
    tagList
  },
  props: {
    ruleList: Array as PropType<RulesInfo['ruleList']>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current: Object as PropType<any>,
    conditionList: Object as PropType<GENDATA>,
    isPoints:  Boolean as PropType<boolean>,
  },
  emits:['selectRuleType', 'setcurrentEdit', 'deleteBlock', 'copyBlock', 'exchangeRuleTitle', 'tagExchange', 'deleteTag', 'handleCondition', 'pointsChange'],
  setup(props, context) {
    console.log(JSON.stringify(props.current), '我是item-------->')
    const activeKey = ref(["1"]);
    const rulesName = ref<string>("");
    rulesName.value = props && props.current && props.current.item && props.current.item.name || ''
    console.log(rulesName.value, 'propsprops')
    const ruleType = ref('')
    ruleType.value = props && props.current && props.current.item && props.current.item.validateType || ''
    const isEdit = ref(false);
    const handleEidt = (e) => {
      e.stopPropagation();
      console.log("handleEidt");
      isEdit.value = !isEdit.value;
      // editRuleName 
    };
    // 修改当前名称标题
    const currentTitleChange = () => {
      context.emit('exchangeRuleTitle', rulesName.value, props.current)
    } 
    const handleAddSub = (e) => {
      e.stopPropagation();
      console.log(e);
      context.emit('setcurrentEdit', props.current)
      console.log('setEdit')
    };
    const handleBulr = () => {
      isEdit.value = false;
    };
    const selectRuleType = (nodeType) => {
      console.log(nodeType, 'selectRuleType recive')
      context.emit('selectRuleType', nodeType)
    }
    const handleCopy = (e) => {
       e.stopPropagation();
      console.log('handleCopy')
      // deleteblock
      context.emit('copyBlock', props.current)
    }
    const handleDelete = (e) => {
      e.stopPropagation();
      console.log('copyBlock', props.current)
      context.emit('deleteBlock', props.current)
    }
    // 节点的值
    const tagExchange = (obj, currentTag, childIndex) => {
      console.log('检测二级缺失', obj, currentTag, childIndex)
      context.emit('tagExchange', obj, props.current, currentTag, childIndex)
    }
    const deleteTag = (currentTag, childIndex) => {
       context.emit('deleteTag', props.current, currentTag, childIndex)
    }
    // handleCondition
    const handleCondition = (e) => {
      console.log(e, 'handleConditionhandleCondition')
      const validateType = e.target.value
      context.emit('handleCondition', validateType, props.current)
    }
    const points = ref(0)
    points.value = props && props.current && props.current.item && props.current.item.points || 0
    
       // handleCondition
    const pointsChange = (value) => {
      console.log(value,  props.current, 'handleConditionhandleCondition')
      context.emit('pointsChange', value,  props.current)
    }
    return {
      points,
      pointsChange,
      handleCondition,
      // 删除当前的tag
      deleteTag,
      tagExchange,
      // 修改了当前title的名称
      currentTitleChange,
      // 删除节点
      handleDelete,
      // 复制节点
      handleCopy,
      // 选择节点
      selectRuleType,
      activeKey,
      rulesName,
      ruleType,
      isEdit,
      handleEidt,
      handleBulr,
      handleAddSub,
    };
  },
});
</script>
<style lang="less" scoped>
.rule-wrap {
  box-sizing: border-box;
  // max-width: 700px;
  margin-right: 20px;
  margin-bottom: 12px;
  border: 1px solid #e7eaf4;
  border-radius: 8px;
}

:deep(.ant-collapse-item) {
  border: none;
}

:deep(.ant-collapse-item-active) {
  border: none;
}

:deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}

:deep(.ant-collapse) {
  border-radius: 8px;
}

.header-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.header-right {
  display: flex;
  align-items: center;
  color: #4a5aed;
}
.header-right .sub-add {
  display: inline-block;
  width: 17px;
  height: 18px;
}
.header-right .sub-condition {
  margin-left: 4px;
}
.header-right .sub-copy {
  margin-left: 14px;
}
.header-right .sub-delete {
  margin-left: 18px;
}
.header-left {
  color: #333;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
.header-left .name-edit {
   margin-left: 10px;
}
</style>
