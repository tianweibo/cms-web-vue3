<template>
  <div class="form-warp">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="name" label="礼品信息：" name="name" >
        <a-input v-model:value="formState.name"  :disabled="true" style="width: 217px">
        </a-input>
        <a-button style="border-top-left-radius: 0;   border-bottom-left-radius: 0;" type="default"   :disabled="isEdit" @click="handleSelectGiftEvent">选择礼品</a-button>
      </a-form-item>
      <a-form-item label="礼品图片" name="pictureUrl">
        <img
          v-if="formState.pictureUrl && formState.pictureUrl.length > 0"
          class="gift-img"
          :src="formState.pictureUrl"
          alt="礼品图片"
        />
      </a-form-item>
      <a-form-item label="活动库存："  name="giftAmount">
        <p>
          <a-input-number
            style="width: 90px"
            id="inputNumber"
            v-model:value="formState.giftAmount"
            :min="0"
            :max="formState.available"
            @change="handleExchangeGiftEvent"
            :disabled="isEdit"
          />
        <span class="inventory" v-if="formState.available">可用库存：{{ formState.available }}</span>
        </p>

        <p>如需限制会员礼品兑换数量，请在门槛设置中添加“限兑件数”</p>
      </a-form-item>
      <a-form-item label="控制兑换：" name="exchangeControl">
        <div>
          <a-radio-group
            style="margin-top: 7px"
            name="radioGroup"
            v-model:value="formState.exchangeControl"
            @change="exchangeControlChangeEvent"
            :disabled="isEdit"
          >
            <a-radio value="0">否</a-radio>
            <a-radio value="1">是</a-radio>
            <div v-show="formState.exchangeControl != '0'" class="sub-form">
              <a-form  :label-col="{ span: 4}" :wrapper-col="{span: 20}" layout="horizontal"  ref="subForm" :model="formState.sub" :rules="subRules">
                <a-form-item   label="每日库存：" required  name="everydayNum">
                  <a-input-number
                    id="inputNumber"
                    v-model:value="formState.sub.everydayNum"
                    :min="0"
                    :max="formState.giftAmount"
                  />
                  <p>每日活动中可领取的礼品数量(每日库存需小于活动库存)</p>
                </a-form-item>
                <a-form-item   label="每日活动时间：" name="everydayTime">
                  <time-picker :timerList="formState.sub.everydayTime"  @timerRangeChange="timechange"/>
                  <p>每日活动参与时间必须在07:00-23:59之间</p>
                </a-form-item>
                <a-form-item   label="礼品继承：" name="inherit">
                  <a-radio-group v-model:value="formState.sub.inherit">
                    <a-radio value="1">是</a-radio>
                    <a-radio value="2">否</a-radio>
                  </a-radio-group>
                  <p>当日库存未全部消耗的礼品将累计至下一日</p>
                </a-form-item>
                <a-form-item   label="每人兑换限制" name="limit">
                  <a-radio-group v-model:value="formState.sub.limit.type">
                    <a-radio value="1" name="type">活动周期内仅限兑换一次</a-radio>
                    <a-radio value="2" name="type">活动周期内每天仅限兑换一次</a-radio>
                    <a-radio value="3" name="type">不限制</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-form>
            </div>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <div class="submit-warp">
          <a-button style="margin-left: 10px" @click="backUpEvent">上一步</a-button>
          <a-button type="primary" @click="onSubmitEvent">下一步</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
  <a-modal :width="1000" v-model:visible="giftInfo.show" :footer="null" title="选择礼品">
    <select-gift v-if="giftInfo.show" :baseInfo="baseInfo" @selectGift="selectedGiftEvent" ></select-gift>
  </a-modal>
</template>
<script lang="ts">
import selectGift from "./giftCom/select-gift.vue";
import timePicker from "./giftCom/time-picker.vue";
import { defineComponent, reactive, ref, UnwrapRef, watch, PropType } from "vue";
import { SubGiftForm, FullData } from '../types/index'
import { useRoute } from 'vue-router'
import deepClone from 'clone'

interface FormState {
  name: string;
  giftAmount: string | number;
  pictureUrl: string;
  available?: string | number;
  exchangeControl: string;
  sub: SubGiftForm;
  id: string | number;
}

export default defineComponent({
  inheritAttrs: false,
  components: {
    selectGift,
    timePicker,
  },
  props: {
    baseInfo: Object as PropType<FullData>,
  },
  emits: ['updateValues', 'handleTab'],
  setup(props, context) {
    console.log(JSON.stringify((props['baseInfo']  as FullData)['giftInfo']), 'stringifystringify')
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive(deepClone((props['baseInfo'] as FullData)['giftInfo']))
    const route = useRoute()
    const isEdit: boolean = route.query && route.query.edit === 'edit' ? true: false
    const subForm = ref()
    const subRules = {
       everydayNum: [
        {required: true,
          validator: (rule, value) => {
            console.log(rule, value)
            if (formState.sub.everydayNum > 0 && formState.sub.everydayNum <= (formState.giftAmount as number)) {
              return Promise.resolve()
            } else {
              return Promise.reject("请输入每日库存需要小于活动库存")
            }
          },
          trigger: 'change' 
        }
      ],
      everydayTime: [
        {required: true,
          validator: (rule, value) => {
            console.log(rule, value)
            if (formState.sub.everydayTime?.length === 2 ) {
              return Promise.resolve()
            } else {
              return Promise.reject("请输入每日活动时间")
            }
          },
          trigger: 'change' 
        }
      ]
    }
    const rules = {
      name: [
        {required: true,
          validator: (rule, value) => {
            console.log(rule, value)
            if (value.length > 0) {
              return Promise.resolve()
            } else {
              return Promise.reject("请输选择礼品信息")
            }
          },
          trigger: 'change' 
        }
      ],
      giftAmount: [
         {required: true,
          validator: (rule, value) => {
            console.log(rule, value)
            if (formState.giftAmount > 0) {
               return Promise.resolve()
            } else {
              return Promise.reject("请输入活动库存")
            }
          },
          trigger: 'change' 
        }
      ],
      exchangeControl: [
         {required: true,
          validator: (rule, value) => {
            console.log(rule, value)
            if (!['0', '1'].includes(value)) {
              return Promise.reject("请设置兑换")
            }
            return Promise.resolve()
          },
          trigger: 'change' 
        }
      ]
    };
    const onSubmitEvent = () => {
      formRef.value
        .validate()
        .then(() => {
          if (formState.exchangeControl === '1') {
            subForm.value.validate().then(() => {
              context.emit("handleTab", formState, "threshold");
            })
          } else {
            context.emit("handleTab", formState, "threshold");
          }
        })
   
    };
    const backUpEvent = () => {
      context.emit("handleTab", formState, "baseForm");
    };
    const handleExchangeGiftEvent = () => {
      formRef.value
        .validate()
    } 
    // 控制礼物显示
    const giftInfo = reactive({ show: false });
    const handleSelectGiftEvent = () => {
      giftInfo.show = true;
    };
    const handleCloseGiftSelect = () => {
      giftInfo.show = false;
      formRef.value.validate()
    };
    //  选择中礼物
    const selectedGiftEvent = (value) => {
      console.log(value, "currentValue");
      formState.name = value.name;
      formState.pictureUrl = value.pictureUrl;
      formState.id = value.id;
      formState.available = Number(value.available);
      handleCloseGiftSelect();
    };
    // 规则
    const exchangeControlChangeEvent = () => {
      formRef.value.validate()
      console.log("change");
    };
    const timechange = (value) => {
      console.log(value)
      formState.sub.everydayTime = value
    }
    watch(formState, () => {
      console.log('updateValues', formState)
      context.emit('updateValues', formState)
    }, { deep: true })
    return {
      // 控制是否兑换
      subForm,
      // subFormData,
      timechange,
      // 选中礼物
      selectedGiftEvent,
      exchangeControlChangeEvent,
      // 控制礼物显示隐藏
      giftInfo,
      handleCloseGiftSelect,
      handleSelectGiftEvent,
      // 表单信息
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      other: "",
      formState,
      subRules,
      rules,
      onSubmitEvent,
      backUpEvent,
      handleExchangeGiftEvent,
      isEdit
    };
  },
});
</script>
<style lang="less" scoped>
.gift-img {
  width: 96px;
  height: 96px;
  object-fit: contian;
}

.sub-form {
  box-sizing: border-box;
  // min-width: 634px;
  // height: 278px;
  width: 700px;
  margin-top: 8px;
  padding: 20px;
  padding-left: 0;
  overflow: hidden;
  // /* 表单/边框 */
  border: 1px solid #d3d9e6;
  border-radius: 4px;
}

.submit-warp {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 11px;
}

.inventory {
  margin-left: 8px;
  color: #666;
  font-size: 14px;
}

p {
/* identical to box height, or 150% */
/* 中性色/#999 */
  color: #999;
  font-weight: 400;
  font-size: 12px;
  /* font-family: 'Noto Sans SC'; */
  font-style: normal;
  line-height: 18px;
}
</style>
