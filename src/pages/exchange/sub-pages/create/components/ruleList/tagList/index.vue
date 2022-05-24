<template>
  <div class="tag-wrap">
    <div>
    <!-- 订单类别------------------------------------------------>
    <!-- 时间段内累计订单金额(付款成功) -->
      <periodOrder-acount
        @tagExchange="tagExchange"
        :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'totalPaidOrderAmount'"
      ></periodOrder-acount>
      <!-- 时间段内累计订单笔数（付款成功） -->
      <periodOrder-count
        @tagExchange="tagExchange"
        :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'paidOrderNum'"
      ></periodOrder-count>
      <!-- 时间段内累计订单金额（交易成功） -->
      <periodOrderAcount-succ
        @tagExchange="tagExchange"
        :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'totalSuccessAmount'"
      ></periodOrderAcount-succ>
      <!-- 时间段内累计订单笔数（交易成功 -->
      <periodOrder-succ
        @tagExchange="tagExchange"
        :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'successOrderNum'"
      ></periodOrder-succ>
      <!--会员类别---------------------------------------------------- -->
      <!-- 会员等级 -->
      <member-level  @tagExchange="tagExchange"
        :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'memberGrade'"></member-level>
        <!-- 会员积分 -->
      <member-points  :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'memberPoint'"  @tagExchange="tagExchange"></member-points >
        <!-- 会员生日 -->
      <member-birthday :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'birthday'"  @tagExchange="tagExchange"></member-birthday>
        <!-- 星座 -->
      <member-constellation :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'constellation'"  @tagExchange="tagExchange"></member-constellation>
      <!-- 省份 -->
      <member-province :tagData="currentTag"
        v-if="currentTag && currentTag.tagType === 'province'"  @tagExchange="tagExchange"></member-province>
    </div>
    <div class="delete-wrap" v-if="currentTag && currentTag.tagType !== ''">
      <CloseOutlined @click="deleteTag" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue"
// 订单类别
// 时间段内累计订单金额(付款成功)
import periodOrderAcount from './orderSys/periodOrder-acount.vue'
// 时间段内累计订单笔数（付款成功）
import periodOrderCount from './orderSys/periodOrder-count.vue'
// 时间段内累计订单金额（交易成功）
import periodOrderAcountSucc from './orderSys/periodOrderAcount-succ.vue'
// 时间段内累计订单笔数（交易成功
import periodOrderSucc from './orderSys/periodOrder-succ.vue'
// 会员类型
import memberLevel from './memberSys/member-level.vue'
// "会员积分数",
import memberPoints from './memberSys/member-points.vue'
// 会员生日
import memberBirthday from './memberSys/member-birthday.vue'
// 会员星座
import memberConstellation from './memberSys/member-constellation.vue'
// 会员所在省份
import memberProvince from './memberSys/member-province.vue'
import { CloseOutlined } from '@ant-design/icons-vue';
import { TagDataType } from '../../tagTypes'
export default defineComponent({
  components: {
    // deleteIcon
    CloseOutlined,
    // 订单类型
    periodOrderSucc,
    periodOrderAcountSucc,
    periodOrderAcount,
    periodOrderCount,
    // 会员类型
    memberLevel,
    memberPoints,
    memberBirthday,
    memberConstellation,
    memberProvince
  },
  props: {
    currentTag: Object as PropType<TagDataType>,
    childIndex: Number as PropType<number>
  },
  emits: ["tagExchange", "deleteTag"],
  setup(props, context) {
    const tagExchange = (obj) => {
      console.log('检测值有没有缺失', props['currentTag'], props['childIndex'])
      context.emit('tagExchange', obj, props['currentTag'], props['childIndex'])
    }
    console.log(JSON.stringify(props && props), 'currentTag')
    // deleteTag 删除按钮
    const deleteTag = () => {
      context.emit("deleteTag", props["currentTag"], props["childIndex"]);
    };
    return {
      tagExchange,
      deleteTag
    };
  }
});
</script>
<style lang="less">
.tag-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #E7EAF4;
}
</style>
