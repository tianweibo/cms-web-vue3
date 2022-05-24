<template>
 <a-form :layout="'inline'" ref="formRef" :model="formState" :rules="rules">
    <a-form-item label="会员所在省份" name="value">
      <a-select ref="select" v-model:value="formState.operator" style="width: 120px">
        <a-select-option value="anyIn">包括</a-select-option>
        <a-select-option value="notIn">排除</a-select-option>
      </a-select>
      <div>
        <a-checkbox-group v-model:value="formState.value">
          <div class="flex-align mt-8" v-for="item in list" :key="item.title">
            <span style="width: 70px;">{{ item.title }}</span>
            <a-checkbox :value="province" v-for="province in item.province" :key="province">{{
              province
            }}</a-checkbox>
          </div>
        </a-checkbox-group>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
interface Parmas {
    key:  string;
    operator:  string;
    value: string [];
}
interface FormState {
  key?: string;
  operator: string;
  value: number[] | string[];
  params?: Parmas;
  formRef?: Function;
}
import { defineComponent, reactive, watch, ref, PropType } from 'vue';
import { TagDataType } from '../../../tagTypes'

export default defineComponent({
  props: {
    tagData: Object as PropType<TagDataType>,
  },
  emits: ['tagExchange'],
  setup(props, context) {
    const formRef = ref()
    console.log(JSON.stringify(props["tagData"]), 'data')
    const currentData = props && props["tagData"]
    console.log(currentData, 'currentData')
    const formState: FormState = reactive({
      operator: 'anyIn',
      value: [],
    });
    if (currentData) {
      formState.operator = currentData.operator || 'anyIn'
      formState.value = currentData.value || []
    }
    const list = [
      {
        title: "直辖市",
        province: ["北京市", "天津市", "上海市", "重庆市"],
        checked: []
      },
      {
        title: "自治区",
        province: [
          "内蒙古自治区",
          "宁夏回族自治区",
          "广西壮族自治区",
          "新疆维吾尔自治区",
          "西藏自治区"
        ],

        checked: []
      },
      {
        title: "A - G",
        province: ["安徽省", "福建省", "甘肃省", "广东省", "贵州省"],
        checked: []
      },
      {
        title: "H - K",
        province: [
          "海南省",
          "河北省",
          "吉林省",
          "河南省",
          "湖北省",
          "湖南省",
          "江苏省",
          "江西省",
          "黑龙江省"
        ],
        checked: []
      },
      {
        title: "L - S",
        province: ["辽宁省", "青海省", "山东省", "山西省", "陕西省", "四川省"],
        checked: []
      },
      {
        title: "T - Z",
        province: ["云南省", "浙江省"],
        checked: []
      },
      {
        title: "港澳台",
        province: ["香港特别行政区", "澳门特别行政区", "台湾"],
        checked: []
      }
    ];
    const rules = {
      value: [
        {
          required: true,
          validator: () => {
            if (formState.value.length > 0 ) {
              return Promise.resolve()
            } else {
              return Promise.reject('请选择省份')
            }
          },
          trigger: 'change'
        }
     ],
    }
    function validate () {
      console.log('valid')
        return formRef.value
        .validate()
        .then(() => {
          return true
        })
        .catch(() => {
          return false
        });
    }
    const assemble = {
        key: props["tagData"] && props["tagData"].tagType ?  props["tagData"] && props["tagData"].tagType : '',
        operator: 'anyIn',
        value: formState.value,
    }
    watch(formState, () => {
      console.log(formState, 'formStateformState')
      formState.params = (assemble as Parmas)
      context.emit('tagExchange', formState)
    })
    formState.formRef = validate
    return {
      formState,
      list,
      formRef,
      rules
    }
  }
})
</script>

<style lang="less" scoped>
:deep(.ant-form-item-control-input-content) {
  white-space: nowrap;
}
</style>