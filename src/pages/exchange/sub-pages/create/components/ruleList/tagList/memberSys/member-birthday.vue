/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <!-- style="flex-wrap: nowrap;margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #E7EAF4; height:40px" -->
 <a-form :layout="'inline'" ref="formRef" :model="formState" :rules="rules">
    <a-form-item style="width: 150px" label="会员生日:">
      <a-select v-model:value="formState.type">
        <a-select-option :value="1">会员生日当天</a-select-option>
        <a-select-option :value="2"
          >会员生日前一周(指生日前6天再加生日当天)</a-select-option
        >
        <a-select-option :value="3">会员生日当月(指当月1号-31日)</a-select-option>
        <a-select-option :value="4">会员生日前N天</a-select-option>
      </a-select>
      <span class="desc ml-5" v-if="formState.type == 2">指生日前6天再加生日当天</span>
      <span class="desc ml-5" v-if="formState.type == 3">指当月1号-31日</span>
    </a-form-item>
    <a-form-item v-if="formState.type == 4" name="number" label="" style="margin-left: 60px;">
        <a-input-number
          v-model:value="formState.number"
          :min="0"
          :maxlength="40"
          style="width:7em"

        />天
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { TagDataType } from '../../../tagTypes'
interface Params {
  key: string;
  operator: string | undefined; 
  value: number;
}
interface FormState {
  type: string | number;
  number: number;
  params: Params;
  formRef?: Function;
}

import { defineComponent, reactive, UnwrapRef, watch, ref, PropType } from "vue";
export default defineComponent({
  props: {
    tagData: Object as PropType<TagDataType>,
  },
  emits: ["tagExchange"],
  setup(props, context) {
    const formRef = ref()
    const currentData = props && props["tagData"];
    const formState: UnwrapRef<FormState> = reactive({
      type: ((currentData && currentData.type) as string) || 1,
      number: ((currentData && (currentData as TagDataType).number) as number)|| 0,
      params: {
        key: '',
        operator: '',
        value: 0
      },
      formRef: () => {
        console.log('')
      }
    });
    // 操作符当日 {"key":"birthday","operator":"BD","value":0} 
    // 生日前一周 {"key":"birthday","operator":"beforeWeek","value":0} 
    // 会员当月 {"key":"birthday","operator":"curMon","value":0} 
    // 近多少天
    const getCurrentOperator = () => {
      if (formState.type === 1) {
        return "BD"
      }
      if (formState.type === 2) {
        return "beforeWeek"
      }
      if (formState.type === 3) {
        return "curMon"
      }
    }
    const rules = {
      number: [
        {
          required: true,
          validator: () => {
            if (formState.type  === 4 ) {
              if (formState.number > 0) {
                return Promise.resolve()
              } else {
                return Promise.reject('请填写会员日子')
              }
            } else {
              return Promise.reject('请填写会员日子')
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
    const assemble: Params = {
      key:  props["tagData"] && props["tagData"].tagType ?  props["tagData"] && props["tagData"].tagType : '',
      operator: 'ge',
      value: formState.number,
    }
    watch(formState, () => {
      // init()
      if (formState.type === 4) {
        assemble.key =  props["tagData"] && props["tagData"].tagType ?  props["tagData"] && props["tagData"].tagType : '',
        assemble.operator = 'ge'
        assemble.value = formState.number
      } else {
        assemble.value = 0
        assemble.key =  props["tagData"] && props["tagData"].tagType ?  props["tagData"] && props["tagData"].tagType : '',
        assemble.operator = getCurrentOperator()
      }
      formState.params = assemble
      context.emit("tagExchange", formState);
    });
    formState.formRef = validate
    return {
      formState,
      rules,
      formRef
    };
  },
});
</script>

<style lang="less" scoped>
:deep(.ant-form-item-control-input-content) {
  // flex-wrap: nowrap;
  white-space: nowrap;
}

.desc {
  /* identical to box height, or 150% */


  /* 中性色/#999 */

  color: #999;
  font-weight: 400;
  font-size: 12px;
  /* font-family: 'Noto Sans SC'; */
  font-style: normal;
  line-height: 18px;
}
</style>
