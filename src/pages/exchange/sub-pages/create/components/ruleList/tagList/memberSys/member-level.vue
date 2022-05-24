<template>
  <a-form :layout="'inline'" ref="formRef" :model="formState" :rules="rules">
     <a-form-item label="会员等级:" name="value">
     <a-checkbox-group v-model:value="formState.value" name="grade" :options="list" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts"> 
import { TagDataType } from '../../../tagTypes'
interface Params {
  key?: string;
  operator?: string ; 
  value?: (string | number) [];
  type?: string;
}
interface FormState {
  value: (string | number)[];
  params: Params;
  formRef?: Function;
}
import { defineComponent, reactive, watch, ref, PropType } from 'vue';
export default defineComponent({
  props: {
    tagData: Object as PropType<TagDataType>,
  },
  emits: ['tagExchange'],
  setup(props, context) {
    const list: string[] = [
      'V1 会员',
      'V2 会员',
      'V3 会员',
      'V4 会员',
      'V5 会员',
      'V6 会员',
    ]
    const formRef = ref()
    const currentData = JSON.parse(JSON.stringify(props["tagData"]));
    const formState: FormState = reactive({
      value:  [],
      params: {}
    });
    if (props && props["tagData"]) {
      formState.value = currentData && currentData.value || []
    }
    const rules = {
      value: [
        {
          required: true,
          validator: () => {
            if (formState.value.length > 0 ) {
              return Promise.resolve()
            } else {
              return Promise.reject('请选择会员等级')
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
    const assemble  = {
      key: props["tagData"] && props["tagData"].tagType ?  props["tagData"] && props["tagData"].tagType : '',
      operator: 'anyIn',
      value: formState.value,
      type: 'array'
    }
    watch(formState, () => {
      if(formState.value.length > 0) {
        const arr: number[] = formState.value.map(item => {
          return Number((item as string).slice(1,2))
        })
        assemble.value = arr 
        formState.params = assemble
      }
      context.emit('tagExchange', formState)
    })
    formState.formRef = validate
    return {
      formRef,
      formState,
      list,
      rules
    }
  }
})
</script>
<style lang="less" scoped>
:deep(.ant-form-item-control-input-content) {
  white-space: nowrap;
}
</style>