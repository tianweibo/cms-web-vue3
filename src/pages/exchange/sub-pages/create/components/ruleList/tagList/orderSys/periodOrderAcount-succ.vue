<template>
<a-form :layout="'inline'" ref="formRef" :model="formState" :rules="rules">
    <a-form-item>
      <span>时间段内累计订单金额(交易成功):</span>
    </a-form-item>
    <a-form-item style="width: 104px;" label>
      <a-select v-model:value="formState.type">
        <a-select-option :value="1">绝对时间</a-select-option>
        <a-select-option :value="2">相对时间</a-select-option>
      </a-select>
    </a-form-item>
    <template v-if="formState.type === 1">
      <a-form-item label name="time">
        <a-range-picker v-model:value="formState.time" />
      </a-form-item>
    </template>
    <template v-if="formState.type === 2">
       <a-form-item label="最近:" name="gapTime">
      <a-input-number
        v-model:value="formState.gapTime"
        :min="0"
        :maxlength="40"
        style="width:6em"
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
    <a-form-item label="  累计订单金额满:" name="amount">
      <a-input-number
        v-model:value="formState.amount"
        :min="0"
        :maxlength="40"
         style="width: 7em;"
         :precision="2"
      />元
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, UnwrapRef, watch, ref, PropType } from 'vue';
import moment, { Moment } from 'moment';
import * as md5 from 'md5'
import { TagDataType } from '../../../tagTypes'
interface ExtType {
  type: string | number;
  value: number | string;
}
interface Params {
  key?: string;
  operator?: string ; 
  value?: number;
  ext?: ExtType;
}
interface FormState {
  gapTime: string | number;
  gapType: string | number;
  startTime?: string;
  endStime?: string;
  time: Moment[] | string[];
  type?: string | number;
  amount:  number;
  params?: Params;
  formRef?: Function;
}
export default defineComponent({
  props: {
    tagData: Object as PropType<TagDataType>,
  },
  emits: ['tagExchange'],
  setup(props, context) {
    console.log(JSON.stringify(props["tagData"]), 'datadatadatadata')
    const currentData = props && props["tagData"]
    const formRef = ref()
    const formState: UnwrapRef<FormState> = reactive({
      // startTime: '',
      // endStime: currentData && currentData.endStime || '',
      gapTime: '',
      gapType: 'day',
      time:[],
      type: 1,
      amount:  0,
      valid: false,
      params: {}
    });
    if (props && props["tagData"]) {
        formState.gapTime = currentData && currentData.gapTime || ''
        formState.gapType = currentData && currentData.gapType || 'day'
        formState.time  = currentData && currentData.time || []
        formState.amount  = currentData && currentData.amount || 0
        formState.params  = currentData && (currentData.params  as Params)|| {}
    }
const getDays = (unit): number | undefined => {
      switch (unit) {
        case "day":
          return 1;
        case "month":
          return 30;
        case "year":
          return 365;
      }
    };
    const assemble = {
       key: props["tagData"] && props["tagData"].tagType,
      operator: 'ge',
      value: formState.amount,
      ext: {
        type: formState.type,
        value: 0
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getDataString = (arr): any => {
      console.log(arr)
      if (arr && arr.length === 2) {
        return [moment(arr[0]).format('YYYY-MM-DD'), moment(arr[1]).format('YYYY-MM-DD')]
      } else {
        return ''
      }
    }
        const rules = {
      amount: [
        {
          required: true,
          validator: () => {
            if (formState.amount > 0 && formState.amount < 100000) {
              return Promise.resolve()
            } else {
              return Promise.reject('金额请输入大于0少于10万的数额，数额最多支持2位小数点')
            }
          },
          trigger: 'change'
        }
     ],
     time: [
        {
          required: true,
          validator: () => {
            if (formState.type === 1) {
              if (formState.time.length === 2) {
                return Promise.resolve()
              } else {
                return Promise.reject('请选择日期')
              }
            } else {
              return Promise.reject('请选择日期')
            }
          },
          trigger: 'change'
        }
     ],
     gapTime: [
        {
          required: true,
          validator: () => {
            if (formState.type === 2) {
              if (formState.gapTime > 0) {
                return Promise.resolve()
              } else {
                return Promise.reject('时间范围请输入大于0的整数')
              }
            } else {
              return Promise.reject('时间范围请输入大于0的整数')
            }
          },
          trigger: 'change'
        }
     ],
    }

    function validate () {
      console.log('valid')
        return formRef.value
        .validate()
        .then(() => {
          return true
        })
        .catch(() => {
          return false
        });
    }

    watch(formState, () => {
      if (formState.type === 1) {
        if (formState.time?.length === 2) {
         (assemble.ext.value as unknown as string) = ((getDataString(formState.time) as Moment[]).join(',') as string)
        }
      } else {
        // formState.gapType  是天月年
        // assemble.ext.value = getDays(formState.gapType) * Number(formState.gapTime)
        (assemble.ext.value as unknown as string) =((getDays(formState.gapType) as number) * Number(formState.gapTime)).toString()
      }
      assemble.key = ''
      assemble.key =(props["tagData"] ? props["tagData"].tagType: '' )+ "_" + md5(JSON.stringify(assemble.ext));
     assemble.ext.type = formState.type
      assemble.value = formState.amount
      formState.params =  (assemble  as Params)
      context.emit('tagExchange', formState)
    })
    formState.formRef = validate
    return {
      formRef,
      formState,
      rules
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