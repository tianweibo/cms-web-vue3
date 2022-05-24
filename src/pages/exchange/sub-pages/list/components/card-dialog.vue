<template>
  <div class="box">
    <div class="cardInfo">
      <span style="margin-right: 4px;">库存：{{ cardInfo && cardInfo.record && cardInfo.record.giftAmount || 0 }}</span>
      <a-select v-model:value="params.type" placeholder="please select your zone">
        <a-select-option value="1">增加</a-select-option>
        <a-select-option value="2">减少</a-select-option>
      </a-select>
      <a-input-number style="margin-left:8px" v-model:value="params.num" :min="0" />
      <span v-if="params.type === '1'" style="margin-left: 4px;">={{
        Number(cardInfo && cardInfo.record &&
          cardInfo.record.giftAmount || 0) + params.num
      }}</span>
      <span v-else style="margin-left: 4px;">={{
        Number(cardInfo && cardInfo.record && cardInfo.record.giftAmount || 0)
        - params.num
      }}</span>
    </div>
    <div class="gift-desc">
      <!-- 图片 -->
      <div class="img-wrap">
        <img :src="cardInfo && cardInfo.record.giftPic" alt="礼品">
      </div>
      <div class="desc-wrap">
        <div> <span class="name">{{ cardInfo && cardInfo.record && cardInfo && cardInfo.record.giftName }}</span></div>
        <div><span class="desc">礼品存储</span> <span class="desc inventory">{{
          cardInfo && cardInfo.record && cardInfo &&
          cardInfo.record.giftInventory
        }}</span></div>
      </div>
      <!-- 名称 库存 -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch, PropType } from 'vue';
import { CardInfo } from '../types/index'
export default defineComponent({
  name: 'cardDialog',
  props: {
    cardInfo: Object as PropType<CardInfo>
  },
  emits: ['updateStockInfo'],
  setup(props, context) {
    console.log(props['cardInfo'], 'cardInfocardInfo')
    const params = reactive({
      type: '1',
      num: 0
    })
    watch(params, () => {
      context.emit('updateStockInfo', params)
    }, { deep: true })
    return {
      params
    }
  }
})
</script>
<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gift-desc {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 360px;
  height: 74px;
  margin-top: 16px;
  background: #F3F4F9;
  border-radius: 4px;
}

.desc-wrap {
  display: flex;
  flex-direction: column;
  margin-left: 16px;
}

.desc-wrap .desc {
  /* or 143% */
  /* 中性色/#666 */
  color: #666;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}

.img-wrap {
  width: 50px;
  height: 50px;
  margin-left: 12px;
  background: #BDBEC4;
  border-radius: 4px;
}

.img-wrap img {
  width: 50px;
  height: 50px;
}
</style>