<template>
 <!-- style="flex-wrap: nowrap;margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #E7EAF4; height:40px" -->
  <a-form
    :layout="'inline'"
    :model="formState"
  >
    <a-form-item>
      <span>累计订单金额(付款成功):</span>
    </a-form-item>
    <a-form-item style="width: 104px;" label>
      <a-select v-model:value="formState.type">
        <a-select-option :value="0">所以历史时间内</a-select-option>
        <a-select-option :value="1">绝对时间</a-select-option>
        <a-select-option :value="2">相对时间</a-select-option>
      </a-select>
    </a-form-item>
    <template v-if="formState.type === 1">
      <a-form-item label>
        <a-range-picker v-model:value="formState.time" />
      </a-form-item>
    </template>
    <template v-if="formState.type === 2">
       <a-form-item label="最近:">
      <a-input-number
        v-model:value="formState.gapTime"
        :min="0"
        :maxlength="40"
        style="width: 7em;"
      />
    </a-form-item>
      <a-form-item label=""  style="margin-right: 32px;">
       <a-select v-model:value="formState.gapType">
        <a-select-option value="day">天</a-select-option>
        <a-select-option value="month">月</a-select-option>
        <a-select-option value="year">年</a-select-option>
      </a-select>
      内 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </a-form-item>
    </template>
  </a-form>
</template>
<script lang="ts">
interface FormState {
  gapTime?: string | number;
  gapType: string | number;
  startTime?: string;
  endStime?: string;
  time?: any[];
  type?: string | number;
}
import { defineComponent, reactive, UnwrapRef, watch } from 'vue';
export default defineComponent({
  props: {
    tagData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  emits: ['tagExchange'],
  setup(props, context) {
    console.log(JSON.stringify(props["tagData"]), 'data')
    const currentData: any = props && props["tagData"]
    const formState: UnwrapRef<FormState> = reactive({
      startTime: currentData && currentData.startTime || '',
      endStime: currentData && currentData.endStime || '',
      gapTime: currentData && currentData.gapTime || '',
      gapType: currentData && currentData.gapType || 'day',
      time:  currentData && currentData.time || [],
      type: currentData && currentData.type || 0,
    });
    watch(formState, (newval, oldval) => {
      console.log(newval, oldval, 'formStateformState')
      context.emit('tagExchange', formState)
    })
    return {
      formState,
    }
  }
})
</script>

<style lang="less" scoped>
:deep(.ant-form-item-control-input-content) {
  // flex-wrap: nowrap;
  white-space: nowrap;
}
</style>