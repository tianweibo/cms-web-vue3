<template>
  <a-form
    layout="inline"
    :model="hdFormState"
    @finish="handleFinish"
    class="form-style"
    :pagination="pagination"
  >
    <a-form-item label="互动时间" width="200">
      <a-range-picker v-model:value="hdFormState.time" />
    </a-form-item>
    <a-form-item label="会员ID" width="200">
      <a-input v-model:value="hdFormState.ouid" placeholder="请输入会员ID" />
    </a-form-item>
    <a-form-item>
      <a-button type="default" @click="resetForm">重置</a-button>
      <a-button type="primary" html-type="submit">查询</a-button>
    </a-form-item>
    <a-form-item v-if="recordObj &&recordObj.isRecord">
      <span>共 {{totalCount}} 条记录 </span>
    </a-form-item>
    <a-form-item v-if="recordObj &&recordObj.isRecord">
       <a-button @click="handleExport" type="primary">导出记录</a-button>
    </a-form-item>
  </a-form>

  <a-table :data-source="data" class="mt-10" rowKey="id" :columns="columns">
        <template #award="{ record }">
        <span>
          {{record.rewardContent}}
        </span>
      </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { hdLogs, exportApi } from "@/api/interaction/listService";
import { HdLogsParams } from "../../types";
import useHdList from "./useHdList";
import  moment  from 'moment'
import storage from "@/utils/storage";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "HdLogs",
  props: {
    recordObj: {
      type: Object
    }
  },
  setup(props) {
    const columns = [
      {
        title: "会员ID",
        dataIndex: "ouid",
        key: "ouid",
      },
      {
        title: "互动时间",
        dataIndex: "createAt",
        key: "createAt",
      },
      {
        title: "活动名称",
        dataIndex: "actName",
        key: "actName",
      },
      {
        title: "奖励",
        dataIndex: "award",
        key: "award",
        slots: { customRender: "award" },
      }
    ]
    const hdFormState = reactive<Partial<HdLogsParams>>({
      time: "",
      ouid: "",
      actId: ""
    });
    const pagination = reactive({
      current: 1,
      size: 10,
      total: 0
    });
    console.log(props.recordObj, 'recordObj')
    if (props && props.recordObj &&props.recordObj.isRecord) {
      hdFormState.actId = JSON.parse(JSON.stringify(props.recordObj.data.id))
    }
    console.log(hdFormState, 'hdFormState')
    const { data, totalCount } = useHdList(hdFormState);

    const getHdLogs = async () => {
      console.log('change')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await hdLogs({ouid: hdFormState.ouid, beginAt: hdFormState &&hdFormState.time && moment(hdFormState.time[0]).format('YYYY-MM-DD HH:mm:ss') || '',endAt: hdFormState &&hdFormState.time &&  moment(hdFormState.time[1]).format('YYYY-MM-DD HH:mm:ss'), });
      data.value = res.content.data;
      totalCount.value = res.content.totalCount;
    };

    const handleFinish = () => {
      getHdLogs();
    };
    const resetForm = () => {
      hdFormState.time = ""
      hdFormState.ouid = ""
      getHdLogs();
    }
    const handleExport = async () => {
      const params = {
        job: 'HD_LOG',
        type: 0,
        source: 1,
        name: JSON.parse(JSON.stringify(props.recordObj && props.recordObj.data.name)) || '',
        merchantNum: Number(storage.get('merchantNum'))  || 1100001,
        executeParams: {
          actId: hdFormState.actId,
          ouid: hdFormState.ouid,
          beginAt: hdFormState &&hdFormState.time && moment(hdFormState.time[0]).format('YYYY-MM-DD HH:mm:ss') || '',endAt: hdFormState &&hdFormState.time &&  moment(hdFormState.time[1]).format('YYYY-MM-DD HH:mm:ss')
        }
      }
      try {
        const res = await exportApi(params)
        if (res.retcode === 0) {
          message.success('导出任务已经创建，具体导出进度可在商家中心-数据任务中查看')
        }
      } catch (err: any) {
        message.success(err && err.errmsg || '导出任务异常！')
      }
    }

    return {
      totalCount,
      handleFinish,
      resetForm,
      hdFormState,
      data,
      pagination,
      handleExport,
      columns
    };
  }
});
</script>
<style lang="less" scoped>
.form-style {
  padding: 20px;
  background: #fff;
  border-radius: 5px;
}
</style>
