<template>
  <div class="title-wrap">
    <span @click="handleBack" class="back"> <LeftOutlined />返回 </span>
    <span class="seperator">|</span>
    <h2 class="page-title">兑换记录</h2>
  </div>
  <div class="platform-tip">
    <p>*由于平台要求，系统将不再提供导出记录功能，如有业务需求，请联系客户支持</p>
  </div>
  <div class="act-name">
    当前查询活动：
    <span>{{ name }}</span>
  </div>
  <div class="search-wrap">
    <a-form
      :model="formState"
      name="exhangeSearch"
      layout="inline"
      autocomplete="off"
      ref="form"
    >
      <a-form-item label name="activeName">
        <a-input-group compact>
          <a-select style="width: 120px" v-model:value="formState.userType">
            <a-select-option value="ouid">ouid</a-select-option>
            <a-select-option value="phone">手机号码</a-select-option>
          </a-select>
          <!-- <a-input style="width: 60%" v-model:value="formState.user" />
          -->
          <a-input
            style="width: 60%"
            :placeholder="formState.userType === 'ouid' ? '请输入ouid' : '请输入手机号码'"
            v-model:value="idnum"
          >
            <template #prefix>
              <!-- <user-outlined type="user" /> -->
              <SearchOutlined />
            </template>
          </a-input>
        </a-input-group>
      </a-form-item>
      <a-form-item label="发布状态：" name="activeType">
        <a-select
          v-model:value="formState.activeType"
          style="width: 120px"
          :options="activeList"
          @change="activeTypeChange"
        ></a-select>
      </a-form-item>
      <a-form-item label="兑换时间：" name="giftName">
        <a-space direction="vertical">
          <a-range-picker
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['开始时间', '结束时间']"
            @change="onDateChange"
            @ok="onDateOk"
          />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-button type="default" @click="resetForm">重置</a-button>
        <a-button type="primary" @click="handleSearch">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
  <div class="table-wrap">
    <a-table rowKey="index" :columns="columns" :pagination="pagination" :data-source="data">
      <!-- <template #actStatus="{ record }">
        <a-badge :color="actStatus[record.actStatus]" />
        <span>{{ record.actStatus }}</span>
      </template> -->
    </a-table>
  </div>
</template>
<script lang="ts">
import { Moment } from 'moment';
import { SearchOutlined, LeftOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, Ref, onMounted } from "vue";
import { getExchangeRecordList } from '../../../../api/exchange/exchangeList'
import { useRouter, useRoute } from 'vue-router'
interface FormState {
  userType: string;
  user: string;
  activeType: string;
  date: string;
}
interface LabelState {
  // label: string;
  value: string;
}
interface LabelOperation {
  label: string;
  value: number;
}
export default defineComponent({
  components: {
    SearchOutlined,
    LeftOutlined
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const placehold: Ref<string> = ref('请输入ouid')
    const idnum:  Ref<number> = ref(0)
    const name:  Ref<string> = ref('')
    const params = reactive({
      accountType: 2,
      accountValue: "",
      status: "",
      beginTime: "",
      endTime: "",
      pageNo: 1,
      pageSize: 10,
      actId: 0
    });
    const formState: FormState = reactive({
      userType: "ouid",
      user: "",
      activeType: "全部状态",
      date: ""
    });
    const activeList: LabelState[] = reactive([
      { value: "全部状态" },
      { value: "未发放" }, // 20
      { value: "发放中" }, //1
      { value: "发放成功" }, //2
      { value: "发方失败" }, //3
      { value: "已取消" } // 4
    ]);
    const statusType = {
      未发放: 20,
      发放中: 1,
      发放成功: 2,
      发方失败: 3,
      已取消: 4,
      全部状态: ""
    };
    const giftList: LabelState[] = reactive([
      { value: "全部" },
      { value: "自用" },
      { value: "外部" }
    ]);
    const onDateChange = (value: Moment[], dateString: string[]) => {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    };

    const onDateOk = (value: Moment[]) => {
      console.log("onOk: ", value);
    };
    const activeTypeChange = (e) => {
      console.log(statusType[e], 'activeStates[');
      params.status = statusType[e]
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getExchangeCRecordList(params);
    };

    const form: Ref = ref();
    const resetForm = () => {
      form.value.resetFields();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getExchangeCRecordList({
        accountType: 2,
        accountValue: "",
        status: 1,
        beginTime: "",
        endTime: "",
        pageNo: 1,
        pageSize: 10,
        actId: Number(route.query.actId)
      });
    };

    const columns = [
      {
        title: "OUID",
        name: "OUID",
        dataIndex: "platformUserId",
        key: "platformUserId"
      },
      {
        title: "兑换时间",
        dataIndex: "createAt",
        key: "createAt"
      },
      {
        title: "活动名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "礼品",
        key: "giftName",
        dataIndex: "giftName"
      }
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = ref([]);
    const actStatus = {
      未发布: "#FAAD14",
      未开始: "#4A5AED",
      暂停: "#f4ea2a",
      进行中: "#52C41A",
      已兑完: "#52C41A",
      已结束: "#D9D9D9"
    };
    // 进行分页
    const pageChange = (page: number, pageSize: number): void => {
      console.log(page, pageSize);
      params.pageNo = page;
      params.pageSize = pageSize;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getExchangeCRecordList(params);
    };
    const SizeChange = (current: number, pageSize: number): void => {
      console.log(current, pageSize);
      params.pageNo = current;
      params.pageSize = pageSize;
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getExchangeCRecordList(params);
    };
    const pagination = ref({
      total: data.value.length,
      pageSize: 10, //每页中显示10条数据
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100"],
      showTotal: total => `共有 ${total} 条数据`,
      onChange: pageChange,
      onShowSizeChange: SizeChange
    });
    const handleBack = () => {
      router.back();
    };
    const handleSearch = () => {
      if (formState.activeType === "ouid") {
        params.accountType = 2;
      } else {
        params.accountType = 1;
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getExchangeCRecordList(params);
    };
    function getExchangeCRecordList(params) {
      getExchangeRecordList(params).then(res => {
        console.log(res);
        if (res && res.retcode === 0) {
          data.value = res.content.data;
        }
      });
    }
    onMounted(() => {
      params.actId = Number(route.query.actId)
      name.value = (route.query.name as string);
      getExchangeCRecordList(params)
    })

    return {
      name,
      idnum,
      placehold,
      // title
      handleBack,
      // 分页
      pagination,
      // table
      data,
      columns,
      actStatus,
      // search
      handleSearch,
      form,
      activeList,
      giftList,
      formState,
      onDateOk,
      onDateChange,
      activeTypeChange,
      // gifTypeChange,
      resetForm
    };
  }
});
</script>

<style lang="less" scoped>
.title-wrap {
  height: 29px;

  span {
    line-height: 29px;
  }

  .back {
    display: inline-block;
    margin-right: 13px;
    cursor: pointer;
  }
  .seperator {
    margin-right: 13px;
  }
}

.page-title {
  margin: 0;
  font-weight: 500;
  font-size: 20px;
  font-style: normal;
}

.platform-tip {
  box-sizing: border-box;
  width: 100%;
  height: 38px;
  margin: 20px 0;
  padding: 9px 16px;
  background: #e8eefe;

  /* 顺序色/1-3 */

  border: 1px solid #adbbff;
  border-radius: 4px;

  p {
    color: #5c6cfd;
    font-size: 14px;
    line-height: 20px;
  }
}

.act-name {
  /* identical to box height, or 143% */

  /* 中性色/#666 */

  color: #666;
  font-size: 14px;
  line-height: 20px;

  span {
    /* 主色调 */

    color: #4a5aed;
  }
}

.search-wrap {
  margin: 15px 0;
}

.page-title {
  display: inline;
  margin: 0;
  font-weight: 500;
  font-size: 20px;
  font-style: normal;
  line-height: 29px;
}

.table-wrap {
  padding: 16px 20px 0 20px;
  background-color: #fff;
}
</style>
