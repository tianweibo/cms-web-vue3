<template>
  <div class="threshold-warp">
    <div class="particpation-set">
      <div class="set-top">
        <div style="height: 40px">
          <span>参与门槛设置：</span>
          <a-switch v-model:checked="ruleInfo.checkedtop" @change="handlecheckedtop" />
        </div>
        <div class="set-content">
          <rule-model
            :ruleList="ruleInfo.ruleList"
            :isRule="ruleInfo.checkedtop"
            :conditionList="conditionList"
            :isPoints="false"
            @exchangeRuleTitle="exchangeRuleTitle"
            @handleAddRuleBlock="handleAddRuleBlock"
            @setcurrentEdit="setcurrentEdit"
            @selectRuleType="selectRuleType"
            @deleteBlock="deleteBlock"
            @copyBlock="copyBlock"
            @tagExchange="tagExchange"
            @deleteTag="deleteTag"
            @handleCondition="handleCondition"
          ></rule-model>
        </div>
      </div>
      <div class="set-center">
        <div style="height: 40px">
          <span>兑换扣减设置：</span>
          <a-switch v-model:checked="ruleInfo.checkedSet"  @change="handlecheckedSet"/>
        </div>
        <div class="set-exchange-type" v-if="ruleInfo.checkedSet">
          <span>兑换减扣规则：</span>
          <a-radio-group name="radioGroup" v-model:value="ruleInfo.exhangeType">
            <a-radio value="1">减扣积分数</a-radio>
            <a-radio value="2">减扣勋章</a-radio>
          </a-radio-group>
        </div>
        <!-- 总规则 -->
        <div class="set-content">
          <rule-model
            :ruleList="ruleInfo.ruleListSet"
            :isRule="ruleInfo.checkedSet"
            :conditionList="conditionList"
            :isPoints="true"
            @exchangeRuleTitle="exchangeRuleTitleSet"
            @handleAddRuleBlock="handleAddRuleBlockSet"
            @setcurrentEdit="setcurrentEditSet"
            @selectRuleType="selectRuleTypeSet"
            @deleteBlock="deleteBlockSet"
            @copyBlock="copyBlockSet"
            @tagExchange="tagExchangeSet"
            @deleteTag="deleteTagSet"
            @pointsChange="pointsChange"
          ></rule-model>
        </div>
      </div>
      <div class="set-footer" style="margin-top: 16px;">
        <span>不满足所有兑换扣减规则:</span>
        <span style="margin:0 8px;">扣减</span>
        <a-input-number
          id="inputNumber"
          required
          v-model:value="ruleInfo.deduction.num"
          :min="0"
          maxlength="40"
          style="width:6em"
        />
        <span style="margin-left: 8px;">积分</span><span style="color: red;">(*必填)</span>
      </div>
    </div>
    <div class="next-warp">
      <a-button style="margin-left: 10px" @click="goBackPage">上一步</a-button>
      <a-button type="primary" @click="goNextPage">下一步</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, PropType } from "vue";
import ruleModel from "./ruleList/rule-model.vue";
import useThreshold from "./Hooks/useThreshold";
import { getRuleMap } from '../../../../../api/exchange/create'
import deepClone from 'clone'
import tagDataList from './tagData'
import { message } from "ant-design-vue";
import { RulesInfo, FullData, RuleListSetInfo } from '../types/index'

interface GENDATA {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataList: any[];
}
export default defineComponent({
  name: 'threshold',
  components: {
    ruleModel,
  },
  props: {
    baseInfo: Object as PropType<FullData>,
  },
  emits: ['updateValues', 'handleTab'],
  setup(props, context) {
    // 设置要添加的条件--------------------
    const conditionList: GENDATA = reactive({
      genData: [],
      dataList: []
    })
    // 怎么来操作，1 数据是两个数组 的形式i
    // 获取规则map
    getRuleMap().then(res => {
      if (res.retcode === 0) {
        // console.log(res.content.data, ' data')
        const mapData = res.content.data || []
        const { genData, dataList } = useThreshold(mapData);
        console.log(genData, dataList, 'dataListdataList')
        conditionList.genData = genData
        conditionList.dataList = dataList.filter(item => {
          return item.key !== 'exchangeLimitDay' && item.key !== 'exchangeLimit' && item.key !== 'memberLabel'
        })
      }
    })
    // 这里来回显规则
    const baseInfo = reactive(deepClone(props['baseInfo']));
    const ruleInfo: RulesInfo = reactive(deepClone(baseInfo.rulesinfo));
    const handlecheckedtop = (value) => {
      console.log(value, 'handlecheckedtop')
      if (!value) {
        ruleInfo.ruleList =[]
      }
    }
    const handlecheckedSet = (value) => {
      console.log(value, 'handlecheckedtop')
      if (!value) {
        ruleInfo.ruleListSet =[]
      }
    }
    const ruleList: RulesInfo["ruleList"] = reactive([]);
    const currentBlockIndex = ref(0);
    // 设置当前哪个块的index
    const setcurrentEdit = ({ index }) => {
      currentBlockIndex.value = index;
    };
    // 店家添加的规则
    const selectRuleType = (nodeType) => {
      // 节点判断流程先判断是否是数组然后判断节点数量
      if (
        ruleInfo.ruleList[currentBlockIndex.value] && Array.isArray(ruleInfo.ruleList[currentBlockIndex.value].children)
      ) {
        ruleInfo.ruleList[currentBlockIndex.value] &&
          ruleInfo.ruleList[currentBlockIndex.value].children.push(deepClone(tagDataList[nodeType]));
      } else {
        ruleInfo.ruleList[currentBlockIndex.value].children = [];
        ruleInfo.ruleList[currentBlockIndex.value].children.push(deepClone(tagDataList[nodeType]));
      }
    };
    // 添加块级别的
    let i = 0
    const handleAddRuleBlock = () => {
      ruleInfo.ruleList.push({
        name: '未命名',
        _uid: i++,
        key: '',
        id: '',
        activeKey: '',
        ruleType: 'and',
        validateType: 'and',
        children: []
      })
    };
    const deleteBlock = (current) => {
      ruleInfo.ruleList.splice(current.index, 1);
    };
    // 复制一个当前的规则
    const copyBlock = (current) => {
      const copy = JSON.parse(JSON.stringify(ruleInfo.ruleList[current.index]));
      ruleInfo.ruleList.push(copy);
    };
    const exchangeRuleTitle = (value, current) => {
      ruleInfo.ruleList[current.index].name = value;
    };
    const tagExchange = (value, current, child, childIndex) => {
      Object.assign(ruleInfo.ruleList[current.index].children[childIndex], value)
    }
    const deleteTag = (current, child, childIndex) => {
      ruleInfo.ruleList[current.index].children.splice(childIndex, 1)
    }
    const handleCondition = (type, current) => {
      console.log('检测4级缺失', type, JSON.stringify(current))
      ruleInfo.ruleList[current.index].validateType = type
    }
    // -------------------------------------------------------------------------------
    // exchangeList
    const checkedSet = ref<boolean>(false);
    const exhangeType = ref('1')
    const deduction = ref({ num: 0, id: 0 });
    const ruleListSet: RuleListSetInfo[] = reactive([]);
    const currentBlockIndexSet = ref(0);
    // 设置当前哪个块的index
    const setcurrentEditSet = ({ index }) => {
      // console.log("recive", item, "index", index);
      currentBlockIndexSet.value = index;
    };
    // 点击添加的规则
    const selectRuleTypeSet = (nodeType) => {
      console.log("recive nodeType", nodeType);
      // 节点判断流程先判断是否是数组然后判断节点数量
      if (
        ruleInfo.ruleListSet[currentBlockIndexSet.value] && Array.isArray(ruleInfo.ruleListSet[currentBlockIndexSet.value].children)
      ) {
        ruleInfo.ruleListSet[currentBlockIndexSet.value] &&
          ruleInfo.ruleListSet[currentBlockIndexSet.value].children.push(
            deepClone(tagDataList[nodeType])
          );
      } else {
        ruleInfo.ruleListSet[currentBlockIndexSet.value].children = [];
        ruleInfo.ruleListSet[currentBlockIndexSet.value].children.push(deepClone(tagDataList[nodeType]));
      }
    };
    // 添加块级别的
    let uid = 0
    const handleAddRuleBlockSet = () => {
      // console.log("添加块级别 的, 接收到了");
      ruleInfo.ruleListSet.push({
        name: "未命名",
        activeKey: "1",
        _uid: uid++,
        ruleOrder: 1,
        key: '',
        id: '',
        points: 100,
        validateType: 'and',
        children: [],
      });
    };
    const deleteBlockSet = (current) => {
      // console.log("recive deleteBlock", current);
      ruleInfo.ruleListSet.splice(current.index, 1);
    };
    // 复制一个当前的规则
    const copyBlockSet = (current) => {
      const copy = deepClone(ruleInfo.ruleListSet[current.index]);
      ruleInfo.ruleListSet.push(copy);
    };
    const exchangeRuleTitleSet = (value, current) => {
      ruleInfo.ruleListSet[current.index].name = value;
    };
    const tagExchangeSet = (value, current, child, childIndex) => {
      Object.assign(ruleInfo.ruleListSet[current.index].children[childIndex], value)
    }
    const deleteTagSet = (current, child, childIndex) => {
      ruleInfo.ruleListSet[current.index].children.splice(childIndex, 1)
    }
    const pointsChange = (value, current) => {
      ruleInfo.ruleListSet[current.index].points = value
    }
    const goBackPage = () => {
      context.emit("handleTab", ruleList, "gift");
    }
    // 校验门槛
    const validateTh = async (): Promise<boolean> => {
      console.log(ruleInfo.ruleList)
      let currnetValidate = true
      // 首先门槛看有没有规则，没有规则直接返回false，如果有规则则对子规则进行校验
      // 如果没有子规则则校验通过
      if (ruleInfo && ruleInfo.ruleList && ruleInfo.ruleList.length !== 0 ) {
        for (let i = 0, l = ruleInfo.ruleList.length, list = ruleInfo.ruleList; i < l; i++) {
          console.log(list[i])
          if(list[i].children.length === 0) {
              message.error(`请完善第${i+1}条的${list[i].name}的门槛规则`)
              return false
          }
          for (let ic = 0, len = list[i] && list[i].children &&list[i].children.length || 0, children = list[i] && list[i].children ; ic < len; ic++ ) {
            const isValidate = await children[ic].formRef()
            if (!isValidate) {
              currnetValidate = false
            }
          }
        }
      } 
      if (!currnetValidate) {
        return false
      }
      return true
    }
    // 校验积分
    const validatePoints = async (): Promise<boolean> => {
      // 校验最低积分
      if (ruleInfo.ruleListSet && ruleInfo.ruleListSet.length === 0 && ruleInfo.deduction.num === 0) {
        message.error('必须添加一条扣减积分规则 或者 不满足所有兑换扣减规则')
        return false
      }
      // 校验积分填写
      for (let i = 0, l = ruleInfo.ruleListSet.length, listSet = ruleInfo.ruleListSet; i < l; i++) {
        if (listSet[i].points <= 0) {
          message.error(`第${i}${listSet[i].name}的扣减积分不能为0`)
          return false
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (let j = 0; j < (listSet[i] as any).length; j++) {
          if (!listSet[i][j].valid) {
            message.error(`请完善第${i}的${listSet[i].name}的第${j}条规则`)
            return false
          }
        }
      }
      // 校验积分里面的规则没有没有
      let currnetValidate = true
      // 首先门槛看有没有规则，没有规则直接返回false，如果有规则则对子规则进行校验
      // 如果没有子规则则校验通过
      if (ruleInfo && ruleInfo.ruleListSet && ruleInfo.ruleListSet.length !== 0 ) {
        for (let i = 0, l = ruleInfo.ruleListSet.length, list = ruleInfo.ruleListSet; i < l; i++) {
          if(list[i].children.length === 0) {
              message.error(`请完善第${i+1}的${list[i].name}的积分/勋章规则`)
              return false
          }
          for (let ic = 0, len = list[i] && list[i].children &&list[i].children.length || 0, children = list[i] && list[i].children ; ic < len; ic++ ) {
            const isValidate = await children[ic].formRef()
            if (!isValidate) {
              currnetValidate = false
            }
          }
        }
      } 
      if (!currnetValidate) {
        return false
      }
      return true
    }
    const goNextPage = async () => {
      const validatePoint = await validatePoints()
      if (!validatePoint) {
        return
      }
      const validateT = await validateTh()
      if (!validateT) {
        return 
      }
      console.log('验证通过了')
      context.emit("handleTab", ruleList, "decorate");
    }
    watch(ruleInfo, () => {
      console.log(ruleInfo, 'watch ruleInfo')
      context.emit('updateValues', ruleInfo)
    }, { deep: true })
    // setList
    // 添加子规则
    // 搜索和tree
    return {
      // 父级传来的总数据
      ruleInfo,
      // 条件规则
      conditionList,
      // 去下一页
      goNextPage,
      // 返回
      goBackPage,
      // 事件
      // 门槛规则
      // checkedtop,
      handlecheckedSet,
      handlecheckedtop,
      ruleList,
      copyBlock,
      deleteBlock,
      selectRuleType,
      handleAddRuleBlock,
      exchangeRuleTitle,
      setcurrentEdit,
      tagExchange,
      deleteTag,
      handleCondition,
      // 兑换选择
      deduction,
      checkedSet,
      exhangeType,
      ruleListSet,
      copyBlockSet,
      deleteBlockSet,
      selectRuleTypeSet,
      handleAddRuleBlockSet,
      exchangeRuleTitleSet,
      setcurrentEditSet,
      tagExchangeSet,
      deleteTagSet,
      pointsChange
    };
  },
});
</script>
<style lang="less" scoped>
.threshold-warp {
  padding-left: 40px;
}

:deep(.ant-tree) {
  width: 200px;
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  text-overflow: ellipsis;
}

:deep(.ant-tree-switcher) {
  display: none;
}

:deep(.ant-tree-child-tree) {
  padding: 0;
}

.tree-title {
  display: inline-block;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

.rules-wrap {
  display: flex;
  width: 100%;
  min-height: 400px;
  color: #333;
  background-color: #fff;
}

.left-content {
  border-right: 1px solid #dbdefb;
}

.right-content {
  padding: 10px;
  padding-left: 20px;
}

.next-warp {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}
</style>
