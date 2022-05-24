<template>
  <a-tabs v-model:activeKey="activeKey" @change="activeKeyChange">
    <a-tab-pane key="1" tab="互动列表">
      <a-form
        layout="inline"
        :model="formState"
        @finish="handleFinish"
        class="form-style"
        :pagination="pagination"
      >
        <a-form-item label="互动类型">
          <a-select style="width: 120px;" v-model:value="formState.scenceId" placeholder="互动类型">
            <a-select-option value="">全部</a-select-option>
            <a-select-option
              v-for="item in scenceList"
              :key="item.scenceId"
              :value="item.scenceId"
              >{{ item.scenceName }}</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item label="活动状态">
          <a-select v-model:value="formState.status" placeholder="活动状态">
            <a-select-option value="">全部</a-select-option>
            <a-select-option v-for="item in actStatus" :value="item.value" :key="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="活动名称">
          <a-input v-model:value="formState.name" placeholder="请输入活动名称" />
        </a-form-item>

        <a-form-item label="活动编号">
          <a-input v-model:value="formState.id" placeholder="请输入活动编号" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            查询
          </a-button>
        </a-form-item>
        <a-form-item>
          <div style="width:100%;justify-content: flex-end;">
                  <a-button type="primary" @click="handleToCenter">
            互动中心
          </a-button>
          </div>
        </a-form-item>
      </a-form>

      <a-table :data-source="data" class="mt-10" rowKey="id" :columns="columns">
          <template #scenceType="{ record }">
            {{ActTypes[record.scenceType]}}
          </template>
          <template #status="{ record }">
            {{ActStatus[record.status]}}
          </template>
          <template #action="{ record }">
            <span style="display: inline-block;width: 80px;">
              <a-button :disabled="record.status === 5" style="padding: 0" type="link" @click="editClick(record)">编辑</a-button>
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  操作
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <!-- <a @click="copyLaunchLink(record)" href="javascript:;">复制投放链接</a> -->
                       <a-button :disabled="record.status === 1" type="text" class="act-nopublic " @click="copyLaunchLink(record)">复制投放链接</a-button>
                    </a-menu-item>
                    <a-menu-item>
                      <!-- <a @click="copyDecorationLink(record)" href="javascript:;">复制装修链接</a> -->
                       <a-button :disabled="record.status === 1" type="text" class="act-nopublic " @click="copyLaunchLink(record)">复制装修链接</a-button>
                    </a-menu-item>
                    <a-menu-item>
                      <!-- <a @click="copyAct(record)" href="javascript:;">复制活动</a> -->
                       <a-button :disabled="record.status === 1" type="text" class="act-nopublic " @click="copyAct(record)">复制活动</a-button>
                    </a-menu-item>
                    <a-menu-item >
                       <a-button :disabled="record.status === 1" type="text" class="act-nopublic " style="" @click="dataAnalysis(record)">数据统计</a-button>
                    </a-menu-item>
                    <a-menu-item >
                       <a-button :disabled="record.status === 1" type="text" class="act-nopublic " style="" @click="viewRecord(record)">查看互动记录</a-button>
                    </a-menu-item>
                    <a-menu-item v-if="![1, 2, 3, 5].includes(record.status)">
                      <a @click="changeActStatus(record, 2)" href="javascript:;">暂停活动</a>
                    </a-menu-item>
                    <a-menu-item v-if="![4, 5].includes(record.status)">
                      <a @click="changeActStatus(record, 3)" href="javascript:;">发布活动</a>
                    </a-menu-item>
                    <a-menu-item v-if="![1,2, 5].includes(record.status)">
                      <a @click="changeActStatus(record, 4)" href="javascript:;">结束活动</a>
                    </a-menu-item>
                    <a-menu-item v-if="record.status === 5">
                      <a @click="handleDelete(record)" href="javascript:;">删除</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </span>
          </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="互动记录">
      <hd-logs v-if="activeKey === '2'" :recordObj="recordObj"></hd-logs>
    </a-tab-pane>
  </a-tabs>
  <div class="model-tip">
  <a-modal v-model:visible="qrInfo.visible" :width="400" title="复制活动" :footer="null">
    <qr-card :qrInfo="qrInfo"></qr-card>
  </a-modal>
  <a-modal v-model:visible="decorate.visible"  title="获取链接" :footer="null">
    <link-copy :qrInfo="decorate"></link-copy>
  </a-modal>
      <a-modal
      v-model:visible="actDovisible"
      :title="actDo.title"
    >
      <template #footer>
        <a-button @click="cancelUpdate">取消</a-button>
        <a-button  type="primary"  @click="updateAct">确定</a-button>
      </template>
      <text-dialog :descContent="actDo"></text-dialog>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { DownOutlined } from "@ant-design/icons-vue";
import { Activity, ActParam, QrInfo } from "./types";
import { getActs, changeStatus, getActLink } from "@/api/interaction/listService";
import useActList from "./useActList";
import useScenceList from "./useScenceList";
import useActStatus from "./useActStatus";
import HdLogs from "./sub-pages/hd-logs/index.vue";
import { ActTypes, ActStatus } from './config/actTypes'
import { columns } from './config/tableConfig'
import { pathList } from './config/actPaths'
import qrCard from './components/qr-card.vue'
import linkCopy from './components/link-copy.vue'
import textDialog from './components/text-dialog.vue'
import { message } from "ant-design-vue";
console.log(ActTypes, 'ActTypes')
export default defineComponent({
  components: {
    DownOutlined,
    HdLogs,
    qrCard,
    linkCopy,
    textDialog
  },
  setup() {
    const formState = reactive<Omit<ActParam, "pageNum" | "pageSize">>({
      status: "", // 1-未发布 2-暂停 3-发布 4-结束
      scenceId: "",
      id: 0,
      name: ""
    });

    const pagination = reactive({
      current: 1,
      size: 10,
      total: 0
    });
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
      type: '',
      msg: ''
    })
    const recordObj = ref({
      isRecord: false,
      data: {}
    })
    const activeKey = ref("1");

    const router = useRouter();
    // 活动状态
    const actStatus = useActStatus();
    // 互动类型
    const scenceList = useScenceList({ pageNum: 1, pageSize: 100 });
    const qrInfo: Ref<QrInfo> = ref({
      visible: false,
      link: ''
    })
    const decorate: Ref<QrInfo> = ref({
      visible: false,
      link: ''
    })
    /**
     * 初始化列表
     */
    const data = useActList({ ...toRaw(formState), pageNum: 1, pageSize: 10 });
    // 
    const getActList = async () => {
      const params = {
        ...toRaw(formState),
        pageNum: pagination.current,
        pageSize: pagination.size
      };
      const res = await getActs(params);
      console.log("res", res);
      if (res) {
        data.value = res.content.data.map(item => {
          item.time = item.beginAt + " " + item.endAt;
          return item;
        });
        pagination.total = res.content.count;
      }
    };
    const getActAppletLink = async (): Promise<string> => {
      const str = `?templateId[]=3000000063246473`;
      const res = await getActLink(str)
      if (res.retcode === 0) {
        return res.content['3000000063246473'].url
      } else {
        return ''
      }
      
    }
    /**
     * 编辑
     */
    const editClick = (record: Activity) => {
      console.log(record);
      if (!record.scenceType) {
        return
      }
      console.log(pathList[record.scenceType])
      router.push({
        path: pathList[record.scenceType].path,
        query: { id: record.id, query: 'edit' }
      })
    };
    // 查询
    const handleFinish = () => {
      getActList();
    };
    const copyLaunchLink =  async (record: Activity) => {
      const link = await getActAppletLink()
      qrInfo.value.visible = true
      qrInfo.value.link = link
      console.log(record, link, 'link');
      console.log(qrInfo, 'qrInfo')
    };

    const copyDecorationLink = (record: Activity) => {
      console.log(record);
      decorate.value.link = ''
      decorate.value.visible = true
    };

    const copyAct = (record: Activity) => {
      console.log(record);
      if (!record.scenceType) {
        return
      }
      router.push({
        path: pathList[record.scenceType].path,
        query: { id: record.id, query: 'copy' }
      })
    };
    const viewRecord = (record: Activity) => {
      console.log('viewRecord')
      activeKey.value = "2";
      recordObj.value.isRecord = true
      recordObj.value.data = record
      
    }
    const dataAnalysis = (record: Activity) => {
      console.log(record);
      router.push({ path: "/app/marketing/interaction/analysis", query: { id: record.id,  } });
    };
    const updateAct = async () => {
      const res = await changeStatus({
        status:  actDo.value.status,
        actId: actDo.value.actId,
      });
      actDovisible.value = false
      if (res.retcode === 0) {
       message.success(actDo.value.msg)
      } else {
        message.error(res && res.errmsg)
      }
      console.log(res, 'res')
      // 获取活动列表
      getActList();
    }
    const cancelUpdate = async () => {
        actDovisible.value = false
        actDo.value.record = {}
        actDo.value.desc = ''
        actDo.value.subDesc = ''
        actDo.value.actName = ''
        actDo.value.actId = 0
        actDo.value.type = ''
    }
    const changeActStatus = async (record: Activity, type: number) => {
      if (!record) {
        return
      }
      console.log(record.id, 'record')
      switch (type){
        // 暂停
        case 2: 
          actDovisible.value = true
          actDo.value.record = record
          actDo.value.desc = '活动已经发布，暂停活动会使此活动及其关联活动()均进入暂停状态'
          actDo.value.subDesc = '您确暂停动'
          actDo.value.actName = record.name
          actDo.value.actId = record.id
          actDo.value.status = type
          actDo.value.msg = '暂停活动成功'
          actDo.value.type = 'pause'
        return
        // 发布
        case 3: 
          actDovisible.value = true
          actDo.value.record = record
          actDo.value.desc = '活动发布后，管理员可以管理该活动在消费者端展示。'
          actDo.value.subDesc = '您确认发布'
          actDo.value.actName = record.name
          actDo.value.actId = record.id
          actDo.value.status = type
          actDo.value.msg = '发布活动成功'
          actDo.value.type = 'start'
          return
        case 4: 
          actDovisible.value = true
          actDo.value.record = record
          actDo.value.desc = '活动结束会使此活动及其关联活动()均进入暂停状态，活动结束后将不可重新启用,只能查看该活动的一些相关信息'
          actDo.value.subDesc = '确认结束活动'
          actDo.value.actName = record.name
          actDo.value.actId = record.id
          actDo.value.status = type
          actDo.value.msg = '结束活动成功'
          actDo.value.type = 'end'
          return
      }
    };

    const activeKeyChange = (value: string) => {
      activeKey.value = value;
      if (value === '1') {
        formState.status= "" // 1-未发布 2-暂停 3-发布 4-结束
        formState.scenceId= ""
        formState.id= 0
        formState.name= ""
      }
      recordObj.value.isRecord = false

    };
    const handleToCenter = (): void => {
      router.push({
        path: '/app/marketing/interaction/center'
      })
    }
    // 删除
    const handleDelete = (record) => {
      console.log(record, 'handleDelete')
    }
    console.log(ActTypes, 'ActTypesActTypes')
    return {
      // 事件
      viewRecord,
      editClick,
      handleFinish,
      copyLaunchLink,
      copyDecorationLink,
      copyAct,
      dataAnalysis,
      changeActStatus,
      cancelUpdate,
      updateAct,
      handleToCenter,
      handleDelete,
      // 数据
      recordObj,
      scenceList,
      actStatus,
      formState,
      data,
      pagination,
      activeKey,
      activeKeyChange,
      ActTypes,
      ActStatus,
      columns,
      qrInfo,
      decorate,
      actDo,
      actDovisible
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
.act-nopublic {
text-align: left;margin: 0;padding: 0;height: auto;
}
</style>
