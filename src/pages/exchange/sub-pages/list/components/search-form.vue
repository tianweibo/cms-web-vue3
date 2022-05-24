<template>
  <div class="search-wrap">
    <a-form
      :model="formState"
      name="exhangeSearch"
      layout="inline"
      autocomplete="off"
      ref="form"
    >
      <a-form-item label="活动名称" name="name">
        <a-input
          v-model:value="formState.name"
          :maxlength="15"
          placeholder="请输入活动名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="礼品名称" name="giftName">
        <a-input
          v-model:value="formState.giftName"
          :maxlength="15"
          placeholder="请输入礼品名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="活动状态" name="activeType">
        <a-select
          v-model:value="formState.exchangeStatus"
          style="width: 120px"
          :options="activeList"
          @change="exchangeStatusChangeEvent"
        ></a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="default" @click="resetFormEvent">重置</a-button>
        <a-button type="primary" @click="searchEvent" html-type="submit">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { FormState } from "../types/index";
import { defineComponent, reactive, UnwrapRef } from "vue";
import { activeList, activeStates } from '../config/formConfig'
export default defineComponent({
  components: {},
  emits: ['resetFormEvent', 'searchEvent', 'exchangeStatusChangeEvent'],
  setup(props, { emit }) {
    const formState: UnwrapRef<FormState> = reactive({
      name: "",
      giftName: "",
      exchangeStatus: "全部状态",
    });
    // 处理数据
    const dealFormState = (formstate: FormState): FormState=> {
      const values: FormState = {
        name: "",
        giftName: "",
        exchangeStatus: "",
      }
      Object.assign(values, formState)
      values.exchangeStatus = activeStates[formstate.exchangeStatus] || ''
      return values
    }
    // 事件层
    const exchangeStatusChangeEvent = () => {
      const params = dealFormState(formState)
      emit('exchangeStatusChangeEvent', params)
    }

    const resetFormEvent = () => {
      formState.exchangeStatus = '全部状态'
      formState.giftName = ''
      formState.name = ''
      const params = dealFormState(formState)
      emit('resetFormEvent', params)
    }
    const searchEvent = () => {
      const params = dealFormState(formState)
      emit('searchEvent', params)
    }
    return {
      activeList,
      formState,
      exchangeStatusChangeEvent,
      resetFormEvent,
      searchEvent
    };
  },
});
</script>

<style lang="less" scoped>
.search-wrap {
  margin: 15px 0;
  margin-top: 0;
}

.ant-modal-body {
  padding: 24px;
}
</style>
