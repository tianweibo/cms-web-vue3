<template>
  <a-table :align="'center'" :columns="columns" :pagination="paginationParams" :data-source="list" rowKey="actId">
    <template #name="{ record }">
      <span v-if="record.display == 1" class="set-top open">公开</span>
      <span v-else class="set-top private">自主</span>
      <span v-if="record.top == 1" class="set-top top">顶置</span>
      {{ record.name }}
    </template>
    <template #validateTime="{ record }">
      <span>{{ record.beginTime }}~{{ record.endTime }}</span>
    </template>
    <template #gitRM="{ record }">
      {{ record && record.giftInventory }} /
      {{ record && record.giftAmount }}
    </template>
    <template #exchangeStatus="{ record }">
      <a-badge :color="actStatus[record.exchangeStatus]" />
      {{ actStates[record.exchangeStatus] }}
    </template>
    <template #operator="{ column, record }">
    <div style="white-space: nowrap; width: 9em;">
      <span @click="handleEditEvent(column, record, 'edit')">
        <a-button :disabled="record.exchangeStatus === 6" type="link" style="font-weight: 400;">编辑</a-button>
      </span>
      <span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()" style="font-weight: 400;">
            操作
            <down-outlined />
          </a>
          <template #overlay>
            <a-menu
              @click="
                (e) => {
                  handleOperatorEvent(e, column, record);
                }
              "
            >
              <!-- 1 查看活动记录 -->
              <a-menu-item v-if="record.exchangeStatus === 1 ? true : false" :key="10">发布</a-menu-item>
              <a-menu-item
                v-if="
                  record.exchangeStatus === 2 || record.exchangeStatus === 1
                    ? false
                    : true
                "
                :key="1"
              >查看活动记录</a-menu-item>
              <!--2  复制活动链接 -->
              <a-menu-item :key="2">复制活动链接</a-menu-item>
              <a-menu-item :key="11">查看数据统计</a-menu-item>
              <!--3  复制活动链接 -->
              <a-menu-item :key="3">复制活动</a-menu-item>
              <!--4  复制活动链接 -->
              <a-menu-item v-if="record.exchangeStatus === 6 ? false : true" :key="4">修改库存</a-menu-item>
              <a-menu-item
                v-if="
                  record.exchangeStatus === 5 || record.exchangeStatus === 4
                    ? true
                    : false
                "
                :key="9"
              >暂停活动</a-menu-item>
              <a-menu-item
                v-if="
                  record.exchangeStatus === 6 ||
                    record.exchangeStatus === 4 ||
                    record.exchangeStatus === 2 ||
                    record.exchangeStatus === 1 ||
                    record.exchangeStatus === 5
                    ? false
                    : true
                "
                :key="5"
              >启动活动</a-menu-item>
              <a-menu-item
                v-if="
                  record.exchangeStatus === 6 || record.exchangeStatus === 1
                    ? false
                    : true
                "
                :key="6"
              >结束活动</a-menu-item>
              <a-menu-item :key="7">
                {{
                  record.top == 1 ? "取消置顶" : "置顶"
                }}
              </a-menu-item>
              <a-menu-item :key="8">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </span>
    </div>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue"
import { ExchangeActInfo, PaginationParams, MenuInfo } from '../types/index'
import { actStatus, actStates } from '../config/tableConfig'
import { DownOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: 'ExchangeTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    paginationParams: {
      type: Object as PropType<PaginationParams>,
      default: () => {
        return {}
      }
    },
    list: {
      type: Array as PropType<ExchangeActInfo[]>,
      default: () => []
    }
  },
  components: {
    DownOutlined
  },
  emits: ['handleOperatorEvent', 'handleEditEvent'],
  setup(props, { emit }) {
    const handleOperatorEvent = ({ key }: MenuInfo, column, record) => {
      emit('handleOperatorEvent', key, column, record)
    }
    const handleEditEvent = (column, record, flag) => {
      emit('handleEditEvent',  column, record, flag)
    }
    return {
      actStatus,
      actStates,
      handleOperatorEvent,
      handleEditEvent
    }
  }
})
</script>
<style lang="less" scoped>
.open {
  display: inline-block;
  margin-right: 3px;
  padding: 0 4px;
  color: #fff;
  background: #ff9901;
  border-radius: 2px;
}

.private {
  display: inline-block;
  margin-right: 3px;
  padding: 0 4px;
  color: #fff;
  background: #09f;
  border-radius: 2px;
}

.top {
  display: inline-block;
  margin-right: 3px;
  padding: 0 4px;
  color: #fff;
  background: #1bd550;
  border-radius: 2px;
}
</style>