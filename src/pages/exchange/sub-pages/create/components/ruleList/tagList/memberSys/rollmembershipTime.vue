<template>
  <!-- style="flex-wrap: nowrap;margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #E7EAF4; height:40px" -->
  <a-form :layout="'inline'" :model="formState">
    <a-form-item>
      <span>入会时间:</span>
    </a-form-item>
    <a-form-item label>
      <a-range-picker v-model:value="formState.time" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
interface FormState {
  time?: any[];
  params: any;
}
import { defineComponent, reactive, UnwrapRef, watch } from "vue";
export default defineComponent({
  props: {
    tagData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  emits: ["tagExchange"],
  setup(props, context) {
    console.log(JSON.stringify(props["tagData"]), "data");
    const currentData: any = props && props["tagData"];
    const formState: UnwrapRef<FormState> = reactive({
      time: (currentData && currentData.time) || [],
      params: {}
    });
    watch(formState, (newval, oldval) => {
      console.log(newval, oldval, "formStateformState");
      formState.params = {
        key: props["tagData"].tagType,
        operator: 'anyIn',
        value: formState.time
      }
      context.emit("tagExchange", formState);
    });
    return {
      formState,
    };
  },
});
</script>

<style lang="less">
:deep(.ant-form-item-control-input-content) {
  // flex-wrap: nowrap;
  white-space: nowrap;
}
</style>
