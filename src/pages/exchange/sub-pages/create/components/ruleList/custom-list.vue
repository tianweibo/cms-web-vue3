<template>
  <!-- 新增新规则 -->
  <div>
    <a-tooltip
      :overlayStyle="{ 'min-width': '640px', 'min-height': '400px' }"
      color="#fff"
      placement="top"
      trigger="click"
      :autoAdjustOverflow="true"
    >
      <template #title>
        <div class="rules-wrap">
          <!--  left-->
          <div class="left-content">
            <div>
              <a-tree
                :tree-data="conditionList.genData"
                :showIcon="false"
                :boolean="false"
                :checkable="false"
                trigger="hover"
                @select="handleSelectTreeNode"
                :style="{
                  'min-height': '400px',
                  'min-width': '190px',
                  'overflow-y': 'scroll',
                  'overflow-x': 'hidden',
                  'text-overflow': 'ellipsis',
                }"
              >
                <template #title="{ title, id }">
                  <span
                    @mouseenter="mouseenterShow({  id })"
                    :style="{ 'text-overflow': 'ellipsis' }"
                    v-if="title.indexOf(searchValue) > -1"
                    class="tree-title"
                  >
                    <a-tooltip
                      placement="top"
                      :title="title.substr(0, title.indexOf(searchValue))"
                      :auto-adjust-overflow="false"
                      >{{ title.substr(0, title.indexOf(searchValue)) }}</a-tooltip
                    >
                    <a-tooltip
                      placement="top"
                      :title="searchValue"
                      :auto-adjust-overflow="false"
                      style="color: #f50"
                      >{{ searchValue }}</a-tooltip
                    >
                    <a-tooltip
                      placement="top"
                      :title="
                        title.substr(title.indexOf(searchValue) + searchValue.length)
                      "
                      :auto-adjust-overflow="false"
                      style="color: #f50"
                    >
                      {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                    </a-tooltip>
                  </span>
                  <span v-else @mouseenter="mouseenterShow({ id })">
                    <a-tooltip
                      placement="top"
                      :title="title"
                      :auto-adjust-overflow="false"
                      style="color: #f50"
                      >{{ title }}</a-tooltip
                    >
                  </span>
                </template>
              </a-tree>
            </div>
          </div>
          <!-- right -->
          <div class="right-content">
            <h2>{{ res && res.title }}</h2>
            <p>{{ res && res.p1 }}</p>
            <p>{{ res && res.p2 }}</p>
          </div>
        </div>
      </template>
      <slot name="button"></slot>
    </a-tooltip>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { descriptions  } from "./ruleDescriptions";
interface GENDATA {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataList: any[];
}
export default defineComponent({
  emits: ["selectRuleType"],
  props: {
    conditionList:  Object as PropType<GENDATA>,
  },
  setup(props, context) {
    const searchValue = ref<string>("");
    const handleSelectTreeNode = (node) => {
      if(['与订单相关条件', '与会员相关条件'].includes(node[0])|| node.length === 0) return
      context.emit("selectRuleType", node[0]);
    };
    const res = ref({
      metaCode: '',
    });
    const mouseenterShow = ({ id }) => {
      if (!id) return
      res.value = descriptions.filter((item) => item["metaCode"] === id)[0];
      console.log(res.value[id]);
      res.value = res.value[id]
    };
    return {
      searchValue,
      handleSelectTreeNode,
      res,
      mouseenterShow,
    };
  },
});
</script>
<style lang="less" scoped>
:deep(.ant-tree) {
  width: 200px;
  height: 300px;
}
:deep(.ant-tree .ant-tree-title) {
  height: 24px;
  line-height: 24px;
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
</style>
