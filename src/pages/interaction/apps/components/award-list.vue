<template>
<div class="theTable">
  <a-table :columns="columns" :data-source="dataSource" :pagination="false" bordered :scroll="{  y: 200 }">
    <template v-for="col in ['nick', 'mobile', 'level']" #[col]="{ text, record }" :key="col">
      <div>
        <a-input
          v-if="editableData[record.key] && (col=='nick' || col=='mobile')"
          v-model:value="editableData[record.key][col]"
          style="margin: -5px 0"
        /> 
        <a-select
          v-else-if="editableData[record.key] && col=='level'"
          ref="select"
          v-model:value="editableData[record.key][col]"
          style="width: 120px"
          :options="awardLevelLists"
        >
        </a-select> 
        <template v-else-if='col=="level"'>
          {{text.length>1?text:awardLevelLists[+text].label }}
        </template>
        <template v-else>
          {{text}}
        </template>
      </div>
    </template>
    <template #operation="{ record }">
      <div class="editable-row-operations">
        <span v-if="editableData[record.key]">
          <a @click="save(record.key)"><SaveOutlined /></a>
         <!--  <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm> -->
        </span>
        <span v-else>
          <a @click="edit(record.key)"><EditOutlined /></a>
        </span>
        <span>
          <a @click="onDelete(record.key)"> <DeleteOutlined /></a>
        </span>
      </div>
    </template>
  </a-table>
  <div class="addBtn" @click="handleAdd">添加更多</div>
</div>
  
</template>
<script lang="ts">
import { cloneDeep } from 'lodash-es';
import { DeleteOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref, UnwrapRef,PropType} from 'vue';

const columns = [
  {
    title: '旺旺ID',
    dataIndex: 'nick',
    width: '25%',
    slots: { customRender: 'nick' },
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: '30%',
    slots: { customRender: 'mobile' },
  },
  {
    title: '奖项名称',
    dataIndex: 'level',
    width: '20%',
    slots: { customRender: 'level' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
];
import {
  UserObject,
} from "./award-set/data-type";

interface AwardLevelObject {
  label: string;
  value: number;
}
export default defineComponent({
  props:{
    userList:Array as PropType<UserObject[]>,
    awardLevelLists:Array as PropType<AwardLevelObject[]>,
  },
  components: {
    DeleteOutlined, SaveOutlined, EditOutlined
  },
  emits: ["userListChange"],
  setup(props, context) {
   let dataSource = ref<Array<UserObject>>([]);
    const editableData: UnwrapRef<Record<string, UserObject>> = reactive({});
    if(props.userList && props.userList.length!=0){
      dataSource.value=props.userList.filter(item=>item.nick!='')
    }   
    const edit = (key: string) => {
      editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };
    const save = (key: string) => {
      Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
      delete editableData[key];
      context.emit("userListChange", dataSource.value);
    };
    const cancel = (key: string) => {
      delete editableData[key];
    };
    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter(item => item.key !== key);
      context.emit("userListChange", dataSource.value);
    };
    const handleAdd = () => {
      const newData = {
        key:dataSource.value.length.toString(),
        nick: '',
        mobile: '',
        level: '',
        repMobile: '',
        repNick: ''
      };
      dataSource.value.push(newData);
    };

    return {
      dataSource,
      columns,
      editingKey: '',
      editableData,
      edit,
      save,
      cancel,
      onDelete,
      handleAdd,
    };
  },
});
</script>
<style scoped>
.theTable{
  margin-top:10px;
}
.theTable >>> .ant-table-tbody > tr > td {
    padding: 8px 8px;
    overflow-wrap: break-word;
}
.theTable >>> .ant-table-tbody > tr > th {
    padding: 8px 8px;
    overflow-wrap: break-word;
}
.editable-row-operations a {
  margin-right: 8px;
}
.addBtn{
  color:#4A5AED ;
  text-align: center;
  cursor: pointer;
  height: 30px;
  background: #F0F3FF;
  border-radius: 0px 0px 4px 4px;
  line-height: 30px;
  border: 1px solid #E7EAF4;
}
</style>
