<template>
  <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="活动名称" name="name">
      <a-input v-model:value="formState.name" :maxlength="40" style="width: 360px" placeholder="请输入活动名称" />
      <br />
      <span style=" color: #999;font-size: 12px">请输入汉字、数字类型的字符，且字符数为1-40个之间</span>
    </a-form-item>
    <a-form-item label="活动封面" name="actPic">
      <div class="clearfix">
        <upload-Img @uploadImgList="receiveActUpload" :maxLength="5" :imgList="formState.actPic" />
      </div>
    </a-form-item>
    <a-form-item label="活动时间" name="date">
      <a-range-picker style="width: 400px" v-model:value="formState.date" :disabled-date="disabledDate" :show-time="{
        format: 'HH:mm:ss',
        hideDisabledOptions: true
      }" format="YYYY-MM-DD HH:mm:ss" @ok="selectTime" @change="timeChange" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-checkbox v-model:checked="checked" @change="handleCheck">是否设置为秒杀</a-checkbox>
    </a-form-item>
    <a-form-item label="活动标签">
      <template v-for="tag in formState.tag.tags" :key="tag">
        <a-tag style=" color: #333;background: #f3f4f9" :closable="true" @close="handleClose(tag)">{{ tag }}</a-tag>
      </template>
      <a-input v-if="formState.tag.inputVisible" ref="inputRef" type="text" :maxLength="10" :style="{ width: '78px' }"
        v-model:value="formState.tag.inputValue" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
      <a-tag v-else @click="showInput" style="background: #fff; border-style: dashed">
        <plus-outlined />新增标签
      </a-tag>
    </a-form-item>
    <a-form-item label="推广方式：">
      <a-radio-group v-model:value="formState.display">
        <a-radio :value="1">
          公开推广
        </a-radio>
        <a-radio :value="0">
          自主推广
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="活动规则">
      <a-radio-group name="radioGroup" v-model:value="formState.activeRules" @change="activeRulesChange">
        <a-radio value="1">文本规则</a-radio>
        <a-radio value="2">图文规则</a-radio>
      </a-radio-group>
      <div class="active-rules">
        <div v-if="formState.activeRules === '1'" class="text-rules">
          <div class="rules-item">
            <span>规则文本：</span>
          </div>
          <div class="rules-item text-area">
            <a-textarea v-model:value="formState.ruleText" />
            <span style=" color: #999;font-size: 12px">活动规则以装修页面的活动规则为准</span>
          </div>
        </div>
        <div v-if="formState.activeRules === '2'" class="img-rules">
          <div class="rules-item">
            <span>规则底图：</span>
          </div>
          <div class="rules-item rules-upload">
            <upload-img ref="childImgLoad" :imgList="formState.ruleImg" @uploadImgList="uploadImgSub"></upload-img>
          </div>
          <div class="rules-item rules-desc">
            <span>*尺寸建议600*600</span>
            <span>*支持png、jpg、jpeg</span>
            <span>*大小不超过1M</span>
          </div>
        </div>
      </div>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <div class="submit-warp">
        <a-button type="primary" @click="onSubmit">下一步</a-button>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
// import { Moment } from 'moment';
import {
  defineComponent,
  reactive,
  ref,
  UnwrapRef,
  nextTick,
  watch,
  PropType
} from "vue";
import moment from "moment";
import useDisabledTime from "./Hooks/useDisabledTime";
import uploadImg from "./upload-img.vue";
import { BaseForm, FullData } from "../types/index";
export default defineComponent({
  components: {
    PlusOutlined,
    uploadImg,
  },
  props: {
    baseInfo: Object as PropType<FullData>,
  },
  emits: ['updateValues', 'handleTab'],
  setup(props, context) {

    // 表单 参数定义
    const formRef = ref();
    const formState: UnwrapRef<BaseForm> = reactive({
      name: "",
      actPic: [],
      date: [],
      actType: "",
      label: "",
      ruleText: "",
      ruleImg: [],
      activeRules: '1',
      display: 1,
      tag: {
        tags: [],
        inputVisible: false,
        inputValue: "",
      }
    });
    const checked = ref(false);
    const handleCheck = () => {
      formState.actType = checked.value === true ? '1' : '0'
    };
    if (props && props.baseInfo && props.baseInfo.baseForm) {
      Object.assign(formState, props.baseInfo.baseForm);
      if (formState.date.length > 0) {
        formState.date = [moment(formState.date[0]), moment(formState.date[1])]
      }
      if ((props.baseInfo.baseForm.actType as unknown) === 0) {
        checked.value = false
      } else if ((props.baseInfo.baseForm.actType as unknown) === 1) {
        checked.value = true
      }
      // eslint-disable-next-line vue/no-setup-props-destructure
      formState.actPic = props.baseInfo.baseForm.actPic
    }
    console.log(JSON.stringify(formState), "JSON,stringissss");
    // 上传图片
    const receiveActUpload = (fileList) => {
      console.log(fileList, "父组件收到了上传的图片");
      formState.actPic = fileList;
      formRef.value.validate()
    };
    const uploadImgSub = (fileList) => {
      console.log(fileList, "父组件收到了上传的图片");
      formState.ruleImg = fileList;
    };

    // 是否设置为秒杀

    // 选择时间
    const value3 = ref([]);
    const range = (start: number, end: number) => {
      const result: number[] = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    };
    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < moment().endOf("day").subtract(1, "days");
    };
    const showTime = ref();
    const disabledRangeTime = (_, type: "start" | "end") => {
      // 时间大于今天就不需要进行禁止处理
      const begin = moment().format("YYYY-MM-DD");
      const endof = moment(value3.value[0]).format("YYYY-MM-DD");
      const isGt = ref(moment(endof).diff(moment(begin)));
      console.log(isGt.value);
      showTime.value =
        isGt.value > 0 ? moment("00:00:00", "HH:mm:ss") : moment().format("HH:mm:ss");
      const { remainHours, remainMinutes } = useDisabledTime();
      if (type === "start") {
        return {
          disabledHours: () => {
            console.log(range(0, 60));
            return isGt.value > 0
              ? [0, 0]
              : range(remainHours[0], remainHours[remainHours.length - 1] + 1);
          },
          disabledMinutes: () =>
            isGt.value > 0
              ? [0, 0]
              : range(remainMinutes[0], remainMinutes[remainMinutes.length - 1] + 1),
        };
      }

      return {
        disabledHours: () => [0, 0],
        disabledMinutes: () => [0, 0],
      };
    };
    const selectTime = (value) => {
      console.log("onOk: ", value);
    };
    const timeChange = (value, dateString: string[]) => {
      console.log("Selected Time: ", value);
      console.log("Formatted Selected Time: ", dateString);
    };
    // 新增标签
    const inputRef = ref();
    const handleClose = (removedTag: string) => {
      const tags = formState.tag.tags.filter((tag) => tag !== removedTag);
      formState.tag.tags = tags;
    };

    const showInput = () => {
      formState.tag.inputVisible = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    };

    const handleInputConfirm = () => {
      const inputValue = formState.tag.inputValue;
      let tags: Array<string> = formState.tag.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(formState.tag, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
    };
    // 规则
    const activeRules = ref<string>("1");
    const activeRulesChange = (e) => {
      activeRules.value = e.target.value;
      console.log(e);
      console.log("change");
    };

    const rules = {
      name: [
        {
          required: true,
          validator: () => {
            if (formState.name.length > 1 && formState.name.length <= 40) {
              return Promise.resolve();
            } else {
              return Promise.reject("活动名称长度必须大于1小于40个文字");
            }
          }
          , trigger: 'blur'
        }
      ],
      actPic: [{
        required: true,
        validator: () => {
          if (formState.actPic && formState.actPic.length <= 0) {
            return Promise.reject("请上传活动图片");
          } else {
            return Promise.resolve();
          }
        }, trigger: 'change'
      }
      ],
      date: [
        {
          required: true,
          message: "请选择活动时间",
          trigger: "change",
          type: "array",
        },
      ],
    };
    watch(
      formState,
      () => {
        context.emit("updateValues", formState);
      },
      { deep: true }
    );
    const onSubmit = () => {
      console.log("handle emit");
      console.log(formRef.value, "formRef.value");
      console.log(JSON.stringify(formState), "开始做校验");
      formRef.value
        .validate()
        .then(() => {
          console.log("验证通过");
          console.log("values", formState);
          context.emit("handleTab", formState, "gift");
        })
    };
    return {
      // 上传图片
      uploadImgSub,
      receiveActUpload,
      // 规则设置
      activeRules,
      activeRulesChange,
      // 创建标签
      handleClose,
      showInput,
      handleInputConfirm,
      inputRef,
      // 是否设置为描述
      checked,
      handleCheck,
      // 选择时间
      showTime,
      moment,
      value3,
      disabledDate,
      // disabledDateTime,
      disabledRangeTime,
      selectTime,
      timeChange,
      // 表单
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: "",
      formState,
      rules,
      onSubmit,
    };
  },
});
</script>


<style lang="less" scoped>
.btn-wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.submit-warp {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 11px;
}

.active-rules {
  box-sizing: border-box;
  width: 535px;
  height: 202px;
  border: 1px solid #e7eaf4;
  border-radius: 4px;
}

.text-rules .text-area {
  width: 400px;
  height: 70px;
}

.text-rules, .img-rules {
  display: flex;
  margin: 26px 20px;
}


.text-rules, .img-rules .rules-desc {
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  /* or 150% */
  /* 中性色/#999 */
  color: #999;
  font-size: 12px;
  line-height: 18px;
}

.text-rules, .img-rules .rules-upload {
  margin-left: 4px;
}
</style>
