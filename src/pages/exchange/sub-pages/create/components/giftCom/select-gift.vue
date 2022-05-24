<template>
  <div class="search-wrap">
    <a-form
      :model="formState"
      name="exhangeSearch"
      layout="inline"
      autocomplete="off"
      ref="form"
    >
      <a-form-item label="礼品类型" name="typeName">
        <a-select
          v-model:value="formState.typeName"
          style="width: 180px"
          :options="giftTypeList"
          allowClear
          @change="selectGiftchange"
        ></a-select>
      </a-form-item>
      <a-form-item label="礼品名称" name="name">
        <a-input
          v-model:value="formState.name"
          :maxlength="15"
          placeholder="请输入礼品名称"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="default" @click="resetForm">重置</a-button>
        <a-button type="primary" @click="handleSearch" html-type="submit">查询</a-button>
        <a-button type="primary" @click="resetForm" html-type="submit">同步礼品</a-button>
      </a-form-item>
    </a-form>
  </div>
  <div class="table-wrap">
    <a-table :columns="columns" :pagination="pagination" :data-source="data">
      <template #pictureUrl="{ record }">
        <img
          style=" width: 100px;height: 60px; object-fit: cover"
          :src="record && record.pictureUrl"
          alt="图片"
        />
      </template>
      <template #validateTimeSet="{ record }">
      <span v-if="record.effectiveType === 1">
      永久有效
      </span>
        <span v-else
          >{{ record && record.effectiveBegin }}至{{
            record && record.effectiveEnd
          }}</span
        >
      </template>
      <template #operator="{ column, record }">
        <span >
          <a-button @click="handleSelectGift(column, record)"  v-if="record.effectiveType === 1" :disabled="record.available === 0"
            >选择</a-button
          >
          <a-button @click="handleSelectGift(column, record)" v-else :disabled="!record.isSelect ||record.showStatus !== 3 ||  record.available === 0"
            >选择</a-button
          >
        </span>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import moment from "moment";
import { defineComponent, reactive, ref, Ref, onMounted } from "vue";
import { getGiftList, getGiftTypeList } from "../../../../../../api/exchange/create";
interface FormState {
  name: string;
  typeName: string;
  status?: number;
}
export default defineComponent({
  inheritAttrs: false,
  components: {},
  emits: ["selectGift"],
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return 
      }
    }
  },
  setup(props, context) {
    const formState: FormState = reactive({
      name: "",
      typeName: "全部礼品类型"
    });
    const columns = [
      {
        title: "图片预览",
        name: "图片预览",
        dataIndex: "pictureUrl",
        key: "pictureUrl",
        slots: { customRender: "pictureUrl" },
      },
      {
        title: "礼品名称	",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "礼品类型		",
        dataIndex: "typeName",
        key: "typeName",
      },
      {
        title: "有效期",
        dataIndex: "validateTimeSet",
        key: "id",
        slots: { customRender: "validateTimeSet" },
      },
      {
        title: "可用库存",
        // width: 140,
        dataIndex: "available",
        key: "available",
      },
      {
        title: "操作",
        dataIndex: "operator",
        key: "operator",
        slots: { customRender: "operator" },
      },
    ];
    const form: Ref = ref();
    const handleSelectGift = (e, row): void => {
      console.log(row);
      context.emit("selectGift", row);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tableData: any = reactive([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = ref([]);
    interface ParamsGift {
      pageSize: number;
      pageNo: number;
      status: number;
    }
    const params: ParamsGift = reactive({
      pageSize: 10,
      pageNo: 1,
      status: 3
    });
    // 获取礼品列表
    // 进行分页
    const pageChange = (page: number, pageSize: number): void => {
      console.log(page, pageSize);
      params.pageNo = page;
      params.pageSize = pageSize;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getList(params);
    };
    const SizeChange = (current: number, pageSize: number): void => {
      console.log(current, pageSize);
      params.pageNo = current;
      params.pageSize = pageSize;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getList(params);
    };
    const pagination = ref({
      total: 0,
      pageSize: 10, //每页中显示10条数据
      showSizeChanger: false,
      showTotal: (total) => `共有 ${total} 条数据`,
      onChange: pageChange,
      onShowSizeChange: SizeChange,
    });

    function getList(paramsData) {
      // eslint-disable-next-line
      getGiftList(paramsData).then((res) => {
        if (res && res.retcode === 0) {
          data.value = tableData = res.content.data.map(item => {
           let isSelect = true
           if ( moment(item.effectiveEnd).diff(props['baseInfo']['baseForm']['date'][1]) >= 0 && item.effectiveType !== 1) {
             isSelect = true
           } else {
             isSelect = false
           }
            return {
              available: item.available,
              createAt: item.createAt,
              effectiveBegin: item.effectiveBegin,
              effectiveEnd: item.effectiveEnd,
              effectiveType: item.effectiveType,
              id: item.id,
              invId: item.invId,
              name: item.name,
              pictureUrl: item.pictureUrl,
              showStatus: item.showStatus,
              status: item.status,
              total: item.total,
              typeCode: item.typeCode,
              typeId: item.typeId,
              typeName: item.typeName,
              isSelect
            }
          });
          pagination.value.total = res.content.totalCount;
        }
      });
    }
    const giftTypeList = ref();
    // 获取礼品类型列表
    const getTypeList = () => {
      getGiftTypeList({
        pageSize: 10,
        pageNo: 1,
        name: "",
      }).then((res) => {
        if (res && res.retcode === 0) {
          giftTypeList.value = [
            ...JSON.parse(JSON.stringify(res.content.data)).map((item) => {
              return {
                cdkeyMode: item.cdkeyMode,
                createAt: item.createAt,
                id: item.id,
                issueMode: item.issueMode,
                name: item.name,
                sys: item.sys,
                typeCode: item.typeCode,
                value: item.name,
              };
            }),
            {
              cdkeyMode: "",
              createAt: "",
              id: "",
              issueMode: "",
              name: "",
              sys: "",
              typeCode: "",
              value: "全部礼品类型",
            },
          ];
        }
      });
    };
    const selectGiftchange = (value) => {
      const current = giftTypeList.value.filter((item) => item.value === value)[0];
      const curP =
        current && current.id ? Object.assign({ typeId: current.id }, params) : params;
      getList(curP);
    };
    const handleSearch = () => {
      const current = giftTypeList.value && giftTypeList.value.filter(
        (item) => item.value === formState.typeName
      )[0] || '';
      let curP =
        current && current.id ? Object.assign({ typeId: current.id }, params) : params;
      curP =
        formState.name.trim().length > 0
          ? Object.assign({ name: formState.name }, curP)
          : curP;
      getList(curP);
    };
    const resetForm = () => {
      form.value.resetFields();
      getList(params);
    };
    // mounted 数据发生变化表格没进行刷新
    onMounted(() => {
      getList(params);
      getTypeList();
    });
    return {
      // 这块是礼品类型
      giftTypeList,
      data,
      // 分页
      pagination,
      // table
      tableData,
      columns,
      handleSelectGift,
      // search
      form,
      formState,
      handleSearch,
      selectGiftchange,
      resetForm,
    };
  },
});
</script>

<style lang="less" scoped>
.search-wrap {
  margin: 15px 0;
}

.table-wrap {
  padding: 16px 20px 0 20px;
  background-color: #fff;
}

.table-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
}

.page-title {
  margin: 0;
  font-weight: 500;
  font-size: 20px;
  font-style: normal;
  line-height: 29px;
}
// model
.ant-modal-body {
  padding: 24px;
}
</style>
