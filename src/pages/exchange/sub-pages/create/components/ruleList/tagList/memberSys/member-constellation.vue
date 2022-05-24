<template>
  <a-form :layout="'inline'" ref="formRef" :model="formState" :rules="rules">
    <a-form-item label="星座" name="value">
      <a-checkbox-group v-model:value="formState.value" name="grade" :options="list" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { TagDataType } from '../../../tagTypes'
interface Params {
  key?: string;
  operator?: string ; 
  value?: string [];
}
interface FormState {
  operator: string;
  value: string [];
  params?: Params;
  formRef?: Function;
}
import { defineComponent, reactive, watch, ref, PropType } from 'vue';
export default defineComponent({
  props: {
    tagData: Object as PropType<TagDataType>,
  },
  emits: ['tagExchange'],
  setup(props, context) {
   const formRef = ref()
   const list: string[] = [
      "白羊座",
      "金牛座",
      "双子座",
      "巨蟹座",
      "狮子座",
      "处女座",
      "天秤座",
      "天蝎座",
      "射手座",
      "摩羯座",
      "水瓶座",
      "双鱼座"
    ];
    const currentData = props && props["tagData"]
    const formState: FormState = reactive({
      operator: 'anyIn',
      value: [],
      params: { }
    });
    if (props && props["tagData"]) {
        formState.operator = currentData && currentData.operator || 'anyIn'
        formState.value = currentData && currentData.value || []
    }
    const assemble = {
        key: props["tagData"] && props["tagData"].tagType ?  props["tagData"] && props["tagData"].tagType : '',
        operator: 'anyIn',
        value: formState.value,
    }
    const rules = {
      value: [
        {
          required: true,
          validator: () => {
            if (formState.value.length > 0 ) {
              return Promise.resolve()
            } else {
              return Promise.reject('请选择对应的星座')
            }
          },
          trigger: 'change'
        }
     ]
    }
    function validte () {
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
    // 上传相应的组件及相应的tag中计算表达式
    watch(formState, () => {
      assemble.value = formState.value
      formState.params = assemble
      context.emit('tagExchange', formState)
    })
    formState.formRef = validte
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
  // flex-wrap: nowrap;
  white-space: nowrap;
}
</style>