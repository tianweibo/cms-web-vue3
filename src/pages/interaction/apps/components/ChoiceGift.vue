<template>
  <a-modal
    v-model:visible.sync="dialogTableVisible"
    title="选择礼品"
    width="70%"
    @cancel="closeDialog"
    :footer='null'
  > 
  <div class='choice'>
    <div class="search-head">
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
            :options='giftTypeList'
            allowClear
          >
          </a-select>
        </a-form-item>
        <a-form-item label="礼品名称" name="name">
          <a-input
            v-model:value="formState.name"
            :maxlength="15"
            placeholder="请输入礼品名称"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            @click="reuiqreGiftList(true)"
            html-type="submit"
            >查询</a-button
          >
        </a-form-item>
        <a-form-item>
          共<span class="all-total">{{ pagination.total }}</span
          >个礼品
        </a-form-item>
      </a-form>
    </div>
    <div class="search-table">
      <a-table
        :columns="columns"
        :data-source="giftList"
        :loading="loading"
        :pagination="pagination"
      >
        <template #pictureUrl="{ record }">
          <img
            style="height: 60px; width: 100px; object-fit: cover"
            :src="record && record.pictureUrl"
            alt="图片"
          />
        </template>
        <template #validateTimeSet="{ record }">
          <span
            >{{ record && record.effectiveBegin }}至{{
              record && record.effectiveEnd
            }}</span
          >
        </template>

        <template #operator="{ column, record }">
          <span @click="handleSelectGift(column, record)">
            <a-button :disabled="record.showStatus !== 3">选择</a-button>
          </span>
        </template>
      </a-table>
    </div>
  </div>

  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { Select} from "ant-design-vue"
import { getGiftList, getGiftTypeList } from "./service";
interface FormState {
  name: string;
  typeName: any;
}
/* import {
  GiftTypeObj,
  GiftObj,
} from "./dataType"; */
/* interface GiftTypeObj {
  cdkeyMode: number;
  createAt: string;
  id: number;
  issueMode: number;
  name: string;
  sys: number;
  typeCode: string;
} */
interface GiftTypeObj {
  value: number;
  label: string;
}
interface GiftObj {
  available: number;
  createAt: string;
  effectiveBegin: string;
  effectiveEnd: string;
  effectiveType: 0;
  id: number;
  invId: number;
  name: string;
  pictureUrl: string;
  showStatus: number;
  status: number;
  total: number;
  typeCode: string;
  typeId: number;
  typeName: string;
}
export default defineComponent({
  name: "choice-gift",
  emits: ["handChoice", "closeDialog"],
  props: {
     
  },
  setup(props, context) {
    const allTotal = ref(0);
    const dialogTableVisible = ref(true);
    const giftTypeList = ref<Array<GiftTypeObj>>([]);
    const giftList = ref<Array<GiftObj>>([]);
    let pagination: any = null;
    const loading = ref(false);
    const formState: FormState = reactive({
      name: "",
      typeName: null,
    });
    let reuiqreGiftList: any = null;
    const pageChange = (page: number): void => {
      pagination.current = page;
      reuiqreGiftList(false);
    };
    pagination = reactive({
      total: 0,
      pageSize: 5, //每页中显示10条数据
      showSizeChanger: false,
      current: 1,
      onChange: pageChange,
    });
    reuiqreGiftList = (type: boolean) => {
      loading.value = true;
      let pageNo = 1;
      if (type) {
        pageNo = 1;
        pagination.current = 1;
      } else {
        pageNo = pagination.current;
      }
      getGiftList({
        pageSize: 5,
        pageNo: pageNo,
        name: formState.name,
        typeId: formState.typeName,
      }).then((res: any) => {
        if (res && res.retcode === 0) {
          loading.value = false;
          giftList.value = res.content.data;
          pagination.total = res.content.totalCount;
        }
      });
    };
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
    const handleSelectGift = (e: any, row: any): void => {
      context.emit("closeDialog");
      context.emit("handChoice", row);
    };
    const requireGiftTypeList = () => {
      getGiftTypeList({
        pageSize: 1000,
        pageNo: 1,
        name: "",
      }).then((res: any) => {
        if (res && res.retcode === 0) {
          let arr=res.content.data;
          arr.push({cdkeyMode: 0,
            createAt: "",
            id: 0,
            issueMode: 0,
            name: "全部礼品类型",
            sys: 0,
            typeCode: "",})
          for(let i=0;i<arr.length;i++){
              giftTypeList.value.unshift({
                  label:arr[i].name ,
                  value:arr[i].id
              });
          }
        }
      });
    };

    const closeDialog = () => {
      context.emit("closeDialog");
    };
    onMounted(async() => {
      await requireGiftTypeList();
      await reuiqreGiftList(true);
    });
    return {
      formState,
      giftTypeList,
      dialogTableVisible,
      allTotal,
      columns,
      giftList,
      pagination,
      closeDialog,
      loading,
      handleSelectGift,
      requireGiftTypeList,
      reuiqreGiftList,
    };
  },
});
</script>
<style scoped>
.all-total {
  color: red;
}
</style>
