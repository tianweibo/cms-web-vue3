<template>
  <div class="box">
    <div class="list" :style="{ background: `url(${exchangeInfo.exchangeRecord.bgInfo}) no-repeat center center` }">
      <div class="list-item">
        <div class="img-wrap"></div>
        <div class="desc">
          <div class="desc-title">标题标题标题标题标题标...</div>
          <div class="desc-content">
            <div class="score-value">
              <span class="score">200</span>
              <span class="score-unit">积分</span>
            </div>
            <div class="status">未发货</div>
          </div>
          <div class="desc-time">兑换时间：2021-09-10 12:00:09</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, reactive } from "vue";
export default defineComponent({
  props: {
    fullData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const exchangeInfo = reactive({
      // 兑换页面
      exchangeRecord: {
        bg: [],
        bgInfo: ''
      }
    });
    if (props["fullData"]["decorateInfo"]["exchangeRecord"]["bg"].length > 0) {
      exchangeInfo.exchangeRecord.bgInfo = props && props["fullData"].decorateInfo.exchangeRecord.bg[0].url
    }
    watch(props["fullData"], () => {
      if (props["fullData"]) {
        if (props["fullData"]["decorateInfo"]["exchangeRecord"]["bg"].length > 0) {
          exchangeInfo.exchangeRecord.bgInfo = props["fullData"]["decorateInfo"]["exchangeRecord"]["bg"][0].url
        } else {
          exchangeInfo.exchangeRecord.bgInfo = ''
        }
      }
    });
    return {
      exchangeInfo,
    };
  },
});
</script>
<style lang="less" scoped>
.list {
  box-sizing: border-box;
  width: 375px;
  height: 100%;
  padding: 10px;
  background: #f3f3f3;
}


.list-item .img-wrap {
  width: 80px;
  height: 80px;
  margin-left: 12px;
  background: #e4e4e4;
}

.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 355px;
  height: 104px;
  background: #fff;
  border-radius: 8px;

}

.list-item .desc {
  margin-left: 12px;
}

.list-item .desc .desc-content .desc-title {
  font-weight: 500;
  font-size: 14px;
}

.list-item .desc .desc-content .score {
  font-weight: bold;
  font-size: 16px;
}

.list-item .desc .desc-content .score-unit {
  font-size: 13px;
  line-height: 19px;
}

.list-item .desc .desc-content .status {
  /* 主色 */
  color: #f1453a;
  font-size: 13px;
  line-height: 19px;
  /* identical to box height */
  text-align: right;
}

.list-item .desc .desc-content .desc-time {
  /* identical to box height */
  color: #666;
  font-size: 11px;
  line-height: 16px;
}

.list-item .desc .desc-content {
  display: flex;
  justify-content: space-between;
}
</style>
