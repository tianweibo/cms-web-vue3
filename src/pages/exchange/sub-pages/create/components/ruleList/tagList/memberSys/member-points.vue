<template>
  <!-- style="flex-wrap: nowrap;margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #E7EAF4; height:40px" -->
  <a-form :layout="'inline'" ref="formRef" :model="formState" :rules="rules">
    <a-form-item>
      <span>积分数:</span>
    </a-form-item>
      <a-form-item style="width: 104px;" label>
      <a-select v-model:value="formState.type">
        <a-select-option value="ge">大于等于</a-select-option>
        <a-select-option value="gt">大于</a-select-option>
        <a-select-option value="le">小于等于</a-select-option>
        <a-select-option value="lt">小于</a-select-option>
        <a-select-option value="between">介于</a-select-option>
      </a-select>
    </a-form-item>
     <a-form-item label="" name="number">
            <a-input-number
          v-model:value="formState.number"
          :min="0"
          :maxlength="40"
          style="width:7em"
        />
    </a-form-item>
    <template v-if="formState.type==='between'" >
      <a-form-item label="" name="number2">
        ~
        <a-input-number
          v-model:value="formState.number2"
          :min="0"
          :maxlength="40"
          style="width:7em"
        />
    </a-form-item>
    </template>
  
        <a-form-item>分</a-form-item>

  </a-form>
</template>
<script lang="ts">
// import { TagDataType } from '../../../tagTypes'
interface Params {
  key?: string;
  operator?: string ; 
  value?: number [] | number;
  type?: string;
}
interface FormState {
  type?: string | number;
  amount?: number;
  number: number;
  number2: number;
  params?: Params;
  valid: boolean;
  formRef?: Function;
}
 interface TagDataType {
  // 必有
  tagType: string;
  type?: number| string;
  // 可能没有
  amount?: number;
  gapTime?: string | number;
  gapType?: string | number;
  number?: number;
  number2: number;
  params?: Params;
  operator?: string;
  formRef?: Function;
}
import { defineComponent, reactive, UnwrapRef, watch, ref, PropType} from 'vue';
export default defineComponent({
  props: {
    tagData: Object as PropType<TagDataType>,
  },
  emits: ['tagExchange'],
  setup(props, context) {
    const formRef = ref()
    const currentData  = props && props["tagData"]
    const formState: UnwrapRef<FormState> = reactive({
      type: 'ge',
      amount:  0,
      number: 0,
      number2: 0,
      valid: false,
      params: {}
    });
    if (props && props["tagData"]) {
      formState.number = currentData && currentData.number || 0
      formState.number2  = currentData && currentData.number2 || 0
      formState.params  = currentData && currentData.params || {}
      formState.type  = currentData && currentData.type || 'ge'
    }

    const assemble: Params = {
      key: props["tagData"] && props["tagData"].tagType ?  props["tagData"] && props["tagData"].tagType : '',
      operator: 'ge',
      value: formState.number,
      type: 'array'
    }
 
    const rules = {
      number: [
        {
          required: true,
          validator: () => {
              if (formState.number >= 1) {
                return Promise.resolve()
              } else {
                return Promise.reject('请输入大于等于0的积分')
              }
          },
          trigger: 'change'
        }
      ],
      number2: [
        {
          required: true,
          validator: () => {
              if (formState.type === 'between') {
                if (formState.number2 > formState.number) {
                  return Promise.resolve()
                } else {
                  return Promise.reject('输入的积分必须大小与最低积分')
                }
              } else {
                return Promise.resolve()
              }
          },
          trigger: 'change'
        }
      ]
    }
    function validate () {
        return formRef.value
        .validate()
        .then(() => {
          return true
        })
        .catch(() => {
          return false
        });
    }
  
    const getArray = () => {
      return[formState.number, formState.number2]
    }
    watch(formState, () => {
      if (formState.type === 'between') {
        if (formState.number2 > 0) {
          assemble.value  = (getArray() as unknown as number)
        }
      } else {
        // formState.gapType  是天月年
        assemble.value = formState.number
        delete assemble.type
      }
      assemble.operator =( formState.type as string)
      formState.params = assemble
      formState.valid = true
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