<template>
  <div class="exchange">
    <h2 class="page-title">兑换管理</h2>
    <div class="search-wrap">
      <search-form
        @exchangeStatusChangeEvent="exchangeStatusChangeEvent"
        @resetFormEvent="resetFormEvent"
        @searchEvent="searchEvent"
      ></search-form>
    </div>
    <div class="table-wrap">
      <div class="table-title">
        <h3>兑换列表</h3>
        <a-button type="primary" html-type="submit" @click="createEvent">新建兑换</a-button>
      </div>
      <a-spin :spinning="spinning">
        <exchange-table
          :paginationParams="paginationParams"
          :columns="columns"
          :list="list"
          @handleOperatorEvent="handleOperatorEvent"
          @handleEditEvent="handleEditEvent"
        ></exchange-table>
      </a-spin>
    </div>
    <div class="model-tip">
      <a-modal v-model:visible="qrInfo.visible" :width="400" title="复制活动" :footer="null">
        <qr-card :qrInfo="qrInfo"></qr-card>
      </a-modal>
      <a-modal
        v-model:visible="cardInfo.visible"
        :width="400"
        title="调整库存"
        @ok="confirmStoreEvent"
        @cancel="closeAdjustEvent"
      >
        <card-dialog :cardInfo="cardInfo" @updateStockInfo="updateStockInfoEvent"></card-dialog>
      </a-modal>
          <!-- 发布活动 -->
    <a-modal
      v-model:visible="actDovisible"
      :title="actDo.title"
    >
      <template #footer>
        <a-button @click="cancelPostEvent">取消</a-button>
        <a-button  type="primary"  @click="postEvent">确定</a-button>
      </template>
      <text-dialog :descContent="actDo"></text-dialog>
    </a-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import searchForm from './components/search-form.vue'
import exchangeTable from "./components/exchange-table.vue";
import QrCard from './components/qr-card.vue'
import CardDialog from './components/card-dialog.vue'
import TextDialog from "./components/text-dialog.vue";
import { getAppletUrl, getExchangeList, getExchangeAct, updateStockData, updateActStatus, setTop } from '../../../../api/exchange/exchangeList'
import { ExchangeDetailRes } from '../create/types/index'
import { ChangeListParmas, PaginationParams, TemplateInfo, QrInfo, CardInfo, ExchangeActInfo, SetTopParams } from './types/index'
import { columns, record } from './config/tableConfig'
export default defineComponent({
  components: {
    searchForm,
    exchangeTable,
    QrCard,
    CardDialog,
    TextDialog
  },
  setup() {
    const router = useRouter();
    const merchantNum = useRoute().query.merchantNum;
    const qrInfo: Ref<QrInfo> = ref({
      visible: false,
      link: ''
    })
    const cardInfo: Ref<CardInfo> = ref({
      visible: false,
      title: '调整存储',
      actId: 0,
      num: 0,
      type: 1,
      record: record
    })
    const adjustStoreParams = {
      num: 0,
      type: 1,
      actId: 0
    }
    // 获取兑换列表的参数
    const changeListParmas: Ref<ChangeListParmas> = ref({
      pageNo: 1,
      pageSize: 10,
      name: "",
      exchangeStatus: "",
      giftName: "",
    })
    const actDovisible: Ref<boolean> = ref(false)
    const actDo = ref({
      show: false,
      actId: 0,
      status: 1,
      record: {},
      desc: '',
      subDesc: '',
      actName: '',
      title: '',
      type: ''
    })
    const spinning = ref<boolean>(false);
    const list = ref([])
    // 获取数据
    const getList = async (params: ChangeListParmas) => {
      try {
        spinning.value = true
        const res = await getExchangeList(params)
        spinning.value = false
        if (res.retcode === 0) {
          return res.content
        }
      } catch (error) {
        spinning.value = false
        message.error('获取兑换列表失败')
      }
    }
    const setActStatus = async (params) => {
      const res = await updateActStatus(params)
      if (res.retcode === 0) {
        message.success(params.tips)
         changeListParmas.value.pageNo = 1
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        dataDeal(await getList(changeListParmas.value))
      } else {
        message.error(res && res.errmsg)
      }
    }
    const updateStoc= async (params) => {
      const res = await updateStockData(params)
        if (res.retcode === 0) {
          message.success("修改库存成功");
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
           dataDeal(await getList(changeListParmas.value))
        } else {
          message.error("修改库存失败");
        }
    }
    const setIsTop = async (params: SetTopParams) => {
      const res = await setTop(params)
      if (res.retcode === 0) {
        message.success("设置成功");
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        dataDeal(await getList(changeListParmas.value))
      } else {
        message.error(res && res.errmsg || "设置失败");
      }
    }
    const getExchangeInfo = async (params): Promise<ExchangeDetailRes | undefined> => {
      spinning.value = true
      const res = await getExchangeAct(params)
      spinning.value = false
      if (res.retcode === 0) {
        return res.content
      } else {
        message.error('获取详情失败')
      }
    }
    const getTemplateUrl = async (): Promise<TemplateInfo | undefined> => {
      const str = `?templateId[]=3000000063246473`;
      const res = await getAppletUrl(str)
      if (res.retcode === 0) {
        return res.content
      }
    }
    // 事件类型方法
    const pageChangeEvent = async (pageNo: number, pageSize: number): Promise<void> => {
      changeListParmas.value.pageNo = pageNo
      changeListParmas.value.pageSize = pageSize
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dataDeal(await getList(changeListParmas.value))
    };
    const sizeChangeEvent = async (pageNo: number, pageSize: number): Promise<void> => {
      changeListParmas.value.pageNo = pageNo
      changeListParmas.value.pageSize = pageSize
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dataDeal(await getList(changeListParmas.value))
    };
    const paginationParams: Ref<PaginationParams> = ref({
      total: 0,
      pageSize: 10, //每页中显示10条数据
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100"],
      showTotal: (total) => `共有 ${total} 条数据`,
      onChange: pageChangeEvent,
      onShowSizeChange: sizeChangeEvent,
    })
    const exchangeStatusChangeEvent = async (value): Promise<void> => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dataDeal(await getList(Object.assign(changeListParmas.value, value)))
    }
    const searchEvent = async (value): Promise<void> => {
      changeListParmas.value.pageNo = 1
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dataDeal(await getList(Object.assign(changeListParmas.value, value)))
    }
    const resetFormEvent = async (value): Promise<void> => {
      changeListParmas.value.pageNo = 1
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dataDeal(await getList(Object.assign(changeListParmas.value, value)))
    }
    const goRecordListEvent = (record): void => {
      router.push({
        name: "ExchangeRecord",
        query: {
          actId: record.actId,
          name: record.name,
          exchangeStatus: record.exchangeStatus
        },
      });
    }
    const showQrCardEvent = async (record): Promise<void> => {
      const templateId = '3000000063246473'
      const res = (await getTemplateUrl() as TemplateInfo)
      const url: string = encodeURIComponent(`actId=${record.actId}&merchantNum=${merchantNum ? merchantNum : 1100001}&platform=1&type=2`)
      const link = res[templateId].url + url
      qrInfo.value.link = link
      qrInfo.value.visible = true
    }
    const adjustStorageEvent = (record: ExchangeActInfo) => {
      cardInfo.value.visible = true
      cardInfo.value.actId = record.actId
    }
    // 更新库存
    const updateStockInfoEvent = (info) => {
      adjustStoreParams.num = info.num
      adjustStoreParams.type = info.type
    }
    // 确认更新存储
    const confirmStoreEvent = async () => {
      adjustStoreParams.actId = cardInfo.value.record.actId
      await updateStoc(adjustStoreParams)
      adjustStoreParams.num = 0
      adjustStoreParams.type = 0
      adjustStoreParams.actId = 0
      cardInfo.value.visible = false
    }
    // 取消修改库存
    const closeAdjustEvent = () => {
      adjustStoreParams.num = 0
      adjustStoreParams.type = 0
      adjustStoreParams.actId = 0
      cardInfo.value.visible = false
    }
    // 查看数据统计
    const ViewStatisticsEvent = (record: ExchangeActInfo) => {
        router.push({
          name: "ExchangeStatistics",
          query: {
            actId: record.actId,
            name: record.name,
            exchangeStatus: record.exchangeStatus
          },
        });
    }
    const copyEvent = async (record: ExchangeActInfo) => {
      const res = (await getExchangeInfo({ actId: record.actId }) as ExchangeDetailRes)
        router.push({
          name: "ExchangeCreate",
          query: {
            edit: 'copy',
            actId: record.actId,
            exchangeStatus: record.exchangeStatus
          },
          params: {
            content: JSON.stringify(res)
          }
      });
    }
    const cancelPostEvent = async () => {
      actDovisible.value = false
      actDo.value.record = {}
      actDo.value.desc = ''
      actDo.value.subDesc = ''
      actDo.value.actName = ''
      actDo.value.actId = 0
      actDo.value.type = ''

    }
    const postEvent = async () => {
      actDovisible.value = false
      switch (actDo.value.type) {
        case 'start' : 
          await setActStatus({ status: 1, actId: actDo.value.actId, tips: '启动' + actDo.value.actName + '成功' })
        break
        case 'stop' :
          await setActStatus({ status: 4, actId: actDo.value.actId, tips: '结束' + actDo.value.actName + '成功'  });
          break;
        case 'remove' :
          await setActStatus({ status: 5, actId: actDo.value.actId, tips: '删除' + actDo.value.actName + '成功'  });
          break;
        case 'puase' :
          await setActStatus({ status: 3, actId: actDo.value.actId, tips: '暂停' + actDo.value.actName + '成功'  });
          break;
        case 'public' :
          await setActStatus({ status: 1, actId: actDo.value.actId, tips: '发布' + actDo.value.actName + '成功'  });
          break;
      }
    }
   const startEvent = async (record: ExchangeActInfo) => {
      actDovisible.value = true
      actDo.value.record = record
      actDo.value.desc = '活动启动后，管理员可以管理该活动在消费者端展示。'
      actDo.value.subDesc = '您确认启动'
      actDo.value.actName = record.name
      actDo.value.actId = record.actId
      actDo.value.type = 'start'
    }
    const stopEvent = async (record: ExchangeActInfo) => {
      actDovisible.value = true
      actDo.value.record = record
      actDo.value.desc = `手动结束【${record.name}】兑换活动后，将不可重新启用。你仍可以查看该活动的一些相关信息。`
      actDo.value.subDesc = '您确认结束'
      actDo.value.actName = record.name
      actDo.value.actId = record.actId
      actDo.value.type = 'stop'
    }
    const setTopEvent = async (record: ExchangeActInfo) => {
     await setIsTop({ top: record.top === 1 ? 2 : 1, actId: record.actId });
    }
    const removeActEvent = async (record: ExchangeActInfo) => {
      actDovisible.value = true
      actDo.value.record = record
      actDo.value.desc = '删除活动后，会员将无法参加该活动，您将无法在列表中找到它。'
      actDo.value.subDesc = '您确认删除'
      actDo.value.actName = record.name
      actDo.value.actId = record.actId
      actDo.value.type = 'remove'
    }
    const pauseEvent = async (record: ExchangeActInfo) => {
      actDovisible.value = true
      actDo.value.record = record
      actDo.value.desc = '活动暂停后，会员将无法参加该活动。'
      actDo.value.subDesc = '您确认暂停'
      actDo.value.actName = record.name
      actDo.value.actId = record.actId
      actDo.value.type = 'puase'
    }
    const publicEvent =  async (record: ExchangeActInfo) => {
      actDo.value.record = record
      actDo.value.desc = '活动发布后，管理员可以管理该活动在消费者端展示。'
      actDo.value.subDesc = '您确认发布'
      actDo.value.actName = record.name
      actDo.value.actId = record.actId
      actDovisible.value = true
      actDo.value.type = 'public'
    }
    // 结束活动
    const handleOperatorEvent = (key, column, record): void => {
      switch (key) {
        // 查看兑换记录
        case 1:
          goRecordListEvent(record);
          break;
          // 查看二维码
        case 2:
          showQrCardEvent(record)
          break;
          // 复制活动
        case 3:
          copyEvent(record)
          break;
          // 调整库存
        case 4:
          cardInfo.value.record = record
          adjustStorageEvent(record)
          break;
          // 启动活动
        case 5:
          startEvent(record)
          break;
          // 暂停活动
        case 6:
          stopEvent(record)
          break;
          // 设置顶置
        case 7:
          setTopEvent(record)
          break;
          // 删除活动
        case 8:
          removeActEvent(record)
          break;
          // 暂停活动
        case 9:
          console.log('pause 活动')
          pauseEvent(record)
          break;
          // 发布活动
        case 10:
          publicEvent(record)
          break;
          // 查看数据统计
        case 11:
          ViewStatisticsEvent(record)
          break;
      }
    }

    const handleEditEvent = async (column, record, flag): Promise<void> => {
      if (flag === 'edit') {
        const res = (await getExchangeInfo({ actId: record.actId }) as ExchangeDetailRes)
        router.push({
          name: "ExchangeCreate",
          query: {
            edit: flag,
            actId: record.actId,
            exchangeStatus: record.exchangeStatus
          },
          params: {
            content: JSON.stringify(res)
          }
        });
      }
    }
    const createEvent = () => {
      router.push({
          name: "ExchangeCreate"
      });
    }
    // 数据处理
    function dataDeal(value): void {
      console.log(value, 'datadata')
      paginationParams.value.total = value.count;
      list.value = value.data
      console.log(list, 'listlist->')
    }
    onMounted(async () => {
      dataDeal(await getList(changeListParmas.value))
    })
    return {
      actDovisible,
      actDo,
      cardInfo,
      qrInfo,
      exchangeStatusChangeEvent,
      searchEvent,
      resetFormEvent,
      spinning,
      paginationParams,
      columns,
      list,
      handleOperatorEvent,
      handleEditEvent,
      updateStockInfoEvent,
      confirmStoreEvent,
      closeAdjustEvent,
      cancelPostEvent,
      postEvent,
      createEvent
    };
  },
});
</script>

<style lang="less" scoped>

.search-wrap {
  margin: 15px 0;
  margin-top: 0;
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
  padding-bottom: 20px;
  font-size: 20px;
  font-family: PingFangSC-Medium, sans-serif;
  line-height: 1;
}

// model
.ant-modal-body {
  padding: 24px;
}

 :deep(.ant-table-thead) > tr > th {
  font-family: PingFangSC-Medium, sans-serif;
  }
</style>
