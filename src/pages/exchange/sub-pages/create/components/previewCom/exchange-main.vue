<template>
  <div class="box" :style="{ background: `url(${exchangeInfo.exchangePage.bg}) no-repeat center center` }">
    <div class="swapper">
      <pre-swapper></pre-swapper>
      <div class="act-button act-rule"
        :style="{ backgroundColor: `${exchangeInfo.exchangePage.actRuleBtn.bg}`, color: `${exchangeInfo.exchangePage.actRuleBtn.color}` }">
        活动规则</div>
      <div class="act-button act-record"
        :style="{ backgroundColor: `${exchangeInfo.exchangePage.recordBtn.bg}`, color: `${exchangeInfo.exchangePage.recordBtn.color}` }">
        兑换记录</div>
    </div>
    <div class="desc">
      <div class="title">戴森(Dyson) 美发造型器 空气卷发棒 多功能合一 顶配完整版HS01</div>
      <div class="score">
        <span class="score-value">5000</span>
        <span class="score-type">积分</span>
        <span class="score-limit">限1份</span>
      </div>
      <div class="price-stock">
        <div class="price">
          <span>原价：¥</span>
          <span class="price-value">3000.00</span>
        </div>
        <div class="stock">
          <span>库存：</span>
          <span>454545</span>
        </div>
      </div>
    </div>
    <div class="cardconent">
      <div class="card-type">
        <span>可兑换卡别</span>
        <span class="cardlist">光钥会员卡 | 粉卡会员卡 | 红卡会员卡 | 金卡</span>
      </div>
      <div class="card-act">
        <span class="act-time">活动时间</span>
        <span class="act-timevalue">2021/12/22 - 2022/12/23</span>
      </div>
    </div>
    <div class="btn-group">
      <div class="member-center">
        <span class="member-icon">
          <icon-member></icon-member>
        </span>
        <span class="member-value">会员中心</span>
      </div>
      <div class="exchange-list">
        <span class="exchange-icon">兑</span>
        <span class="exchange-value">兑换列表</span>
      </div>
      <button class="im-exchange"
        :style="{ backgroundColor: `${exchangeInfo.exchangePage.exhangeBtn.bg}`, color: `${exchangeInfo.exchangePage.exhangeBtn.color}` }">立即兑换</button>
    </div>
    <!-- 都放这里 -->
    <div class="model" v-show="fullData.decorateInfo.currentRule == 5">
      <div class="success"
        :style="{ background: exchangeInfo.exchangeSucc.bg.length > 0 ? `url(${exchangeInfo.exchangeSucc.bgInfo}) no-repeat center center` : `${exchangeInfo.exchangeSucc.bgInfo} no-repeat center center`, color: `${exchangeInfo.exchangeSucc.common.color}` }">
        <div class="wrap-content">
          <div class="title">兑换成功</div>
          <div class="rules-desc">
            <div class="desc-img"></div>
          </div>
          <div class="desc-content">戴森(Dyson) 美发造型器 空气卷发棒 多功能合一 顶配完整版HS01</div>
          <div class="desc-detail"
            :style="{ backgroundColor: `${exchangeInfo.exchangeSucc.detailBtn.bg}`, color: `${exchangeInfo.exchangeSucc.detailBtn.color}` }">
            查看详情></div>
          <div class="go-back"
            :style="{ backgroundColor: `${exchangeInfo.exchangeSucc.backBtn.bg}`, color: `${exchangeInfo.exchangeSucc.backBtn.color}` }">
            返回主页</div>
        </div>
      </div>
    </div>
    <div class="model" v-show="fullData.decorateInfo.currentRule == 4">
      <div class="confirm"
        :style="{ background: exchangeInfo.comfirmExchange.bg.length > 0 ? `url(${exchangeInfo.comfirmExchange.bgInfo}) no-repeat center center` : `${exchangeInfo.comfirmExchange.bgInfo} no-repeat center center` }">
        <div class="wrap-content">
          <div class="title">兑换确认</div>
          <div class="desc-content">
            是否消耗
            <span>5000积分</span> 兑换欧莱雅洁面乳？
          </div>
          <div class="btn-wrap">
            <button
              :style="{ backgroundColor: `${exchangeInfo.comfirmExchange.cancelbtn.bg}`, color: `${exchangeInfo.comfirmExchange.cancelbtn.color}` }">取消</button>
            <button
              :style="{ backgroundColor: `${exchangeInfo.comfirmExchange.confirm.bg}`, color: `${exchangeInfo.comfirmExchange.confirm.color}`, marginLeft: '10px' }">确认</button>
          </div>
        </div>
      </div>
    </div>
    <div class="model" v-show="fullData.decorateInfo.currentRule == 2">
      <div class="rules-wrap"
        :style="{ background: exchangeInfo.actRule.bgInfo ? `url(${exchangeInfo.actRule.bgInfo}) no-repeat center center` : 'linear-gradient(180deg, #FFFFFF 0%, #FFE8E8 100%)', color: ` ${exchangeInfo.actRule.textObj.color}` }">
        <div class="wrap-content" v-if="fullData.baseForm.activeRules == 1">
          <div class="title">活动规则</div>
          <div class="rules-desc" v-html="exchangeInfo.actRule.textObj.richTxt"></div>
        </div>
        <div class="wrap-content" v-else>
          <img
            :src="exchangeInfo.actRule.imageObj && exchangeInfo.actRule.imageObj.txtBg[0] && exchangeInfo.actRule.imageObj.txtBg[0]['url']"
            alt="图片">
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, reactive } from "vue";
import preSwapper from "./pre-swapper.vue";
import iconMember from './icon-member.vue'
export default defineComponent({
  components: {
    preSwapper,
    iconMember
  },
  props: {
    fullData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const exchangeInfo = reactive({
      // 兑换页面
      exchangePage: {
        bg: '',
        actRuleBtn: { bg: '#000000 50%', color: '#fff' },
        exhangeBtn: { bg: '#FF623E', color: '#fff' },
        recordBtn: { bg: '#000000 50%', color: '#fff' }
      },
      actRule: {
        type: '1',
        bg: [],
        bgInfo: 'linear-gradient(180deg, #FFFFFF 0%, #FFE8E8 100%)',
        textObj: {
          richTxt: '',
          color: '#000'
        },
        imageObj: {
          txtBg: []
        }
      },
      comfirmExchange: {
        bg: [],
        cancelbtn: {
          bg: "#B4B4B4",
          color: "#fff"
        },
        confirm: {
          bg: "#FF623E",
          color: "#fff"
        },
        bgInfo: 'linear-gradient(180deg, #FFFFFF 0%, #FFE8E8 100%)'
      },
      exchangeSucc: {
        bg: [],
        detailBtn: {
          bg: '',
          color: '#ff623e'
        },
        backBtn: {
          bg: '#ff623e',
          color: '#fff'
        },
        common: {
          bg: '',
          color: '#333333'
        },
        bgInfo: 'linear-gradient(180deg, #ffffff 0%, #ffe8e8 100%)'
      }
      // 兑换规则页面
    })
    if (props && props.fullData['decorateInfo']['exchangePage']) {
      exchangeInfo.exchangePage.bg = props && props.fullData['decorateInfo']['exchangePage']['bgInfo'][0] && props.fullData['decorateInfo']['exchangePage']['bgInfo'][0].url || ''
      Object.assign(exchangeInfo.exchangePage, props.fullData['decorateInfo']['exchangePage'])
      Object.assign(exchangeInfo.actRule, props.fullData['decorateInfo']['actRule'])
      Object.assign(exchangeInfo.comfirmExchange, props.fullData['decorateInfo']['comfirmExchange'])
      Object.assign(exchangeInfo.exchangeSucc, props.fullData['decorateInfo']['exchangeSucc'])
      if (exchangeInfo.actRule.bg.length > 0) {
        exchangeInfo.actRule.bgInfo = exchangeInfo.actRule.bg[0]['url']
      } else {
        exchangeInfo.actRule.bgInfo = ''
      }
      if (exchangeInfo.comfirmExchange.bg.length > 0) {
        exchangeInfo.comfirmExchange.bgInfo = exchangeInfo.comfirmExchange.bg[0]['url']
      } else {
        exchangeInfo.comfirmExchange.bgInfo = 'linear-gradient(180deg, #FFFFFF 0%, #FFE8E8 100%)'
      }
      if (exchangeInfo.exchangeSucc.bg.length > 0) {
        exchangeInfo.exchangeSucc.bgInfo = exchangeInfo.exchangeSucc.bg[0]['url']
      } else {
        exchangeInfo.exchangeSucc.bgInfo = 'linear-gradient(180deg, #ffffff 0%, #ffe8e8 100%)'
      }
      console.log(exchangeInfo, 'exchangeInfoexchangeInfo')
    }
    console.log(props.fullData, 'fullDatafullDataexhangeMain')
    watch(props['fullData'], () => {
      console.log(props['fullData'], 'fullDatafullDataexhangeMain')
      // const fullData = props['fullData']
      // 活动页背景
      exchangeInfo.exchangePage.bg = props && props.fullData['decorateInfo']['exchangePage']['bgInfo'][0] && props.fullData['decorateInfo']['exchangePage']['bgInfo'][0].url || ''
      if (props && props.fullData['decorateInfo']['exchangePage']) {
        Object.assign(exchangeInfo.exchangePage, props.fullData['decorateInfo']['exchangePage'])
        Object.assign(exchangeInfo.actRule, props.fullData['decorateInfo']['actRule'])
        Object.assign(exchangeInfo.comfirmExchange, props.fullData['decorateInfo']['comfirmExchange'])
        Object.assign(exchangeInfo.exchangeSucc, props.fullData['decorateInfo']['exchangeSucc'])
        if (exchangeInfo.actRule.bg.length > 0) {
          exchangeInfo.actRule.bgInfo = exchangeInfo.actRule.bg[0]['url']
        } else {
          exchangeInfo.actRule.bgInfo = ''
        }
        if (exchangeInfo.comfirmExchange.bg.length > 0) {
          exchangeInfo.comfirmExchange.bgInfo = exchangeInfo.comfirmExchange.bg[0]['url']
        } else {
          exchangeInfo.comfirmExchange.bgInfo = 'linear-gradient(180deg, #FFFFFF 0%, #FFE8E8 100%)'
        }
        if (exchangeInfo.exchangeSucc.bg.length > 0) {
          exchangeInfo.exchangeSucc.bgInfo = exchangeInfo.exchangeSucc.bg[0]['url']
        } else {
          exchangeInfo.exchangeSucc.bgInfo = 'linear-gradient(180deg, #ffffff 0%, #ffe8e8 100%)'
        }
        console.log(exchangeInfo, 'exchangeInfoexchangeInfo')
      }
    })
    return {
      exchangeInfo,
    };
  },
});
</script>
<style lang="less" scoped>
.box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 375px;
  height: 690px;
  background-repeat: no-repeat;
  background-size: 100%;
  // background-color: #f3f3fe;
  // border: 1px solid #c4c4c4;
}

.swapper {
  position: relative;
  width: 375px;
  height: 375px;

  .act-button {
    position: absolute;
    right: 15px;
    width: 38px;
    height: 38px;
    padding: 7px 4px;

    /* 中性色/#fff */
    color: #FFF;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.02em;

    /* or 120% */
    white-space: wrap;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
  }

  .act-rule {
    top: 15px;
  }

  .act-record {
    top: 70px;
  }
}

.desc {
  width: 355px;
  height: 122px;
  margin: 8px;
  padding: 10px 15px;
  background: #fff;
  border-radius: 8px;

  .title {
    color: #000;
    font-weight: 500;
    font-size: 16px;
    font-style: normal;
    line-height: 23px;
    letter-spacing: 0.02em;
  }

  .score {
    margin-top: 8px;

    .score-value {
      /* 红 */

      color: #ff4d4f;
      font-weight: bold;
      font-size: 20px;
      /* font-family: Roboto; */
      font-style: normal;
      line-height: 23px;
      letter-spacing: 0.02em;
    }

    .score-type {
      margin-left: 4px;

      /* 红 */

      color: #ff4d4f;
      font-size: 12px;
      line-height: 17px;
    }

    .score-limit {
      display: inline-block;
      height: 14px;
      margin-left: 7px;
      color: #ff4d4f;
      font-size: 10px;
      line-height: 12px;

      /* 红 */
      border: 1px solid #ff4d4f;
    }
  }
}

.price-stock {
  display: flex;
  justify-content: space-between;
  margin-top: 9px;
  color: #666;
  font-size: 12px;
  line-height: 14px;

  /* identical to box height */

  letter-spacing: 0.02em;

  .price-value {
    text-decoration-line: line-through;
  }

  /* 中性色/#666 */
}

.cardconent {
  width: 355px;
  height: 73px;
  margin: 8px 10px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 15px;

  /* 中性色/#666 */

  color: #666;
  font-size: 12px;
  line-height: 17px;
  background: #fff;
  border-radius: 8px;

  .card-type {
    .cardlist {
      margin-left: 18px;
      letter-spacing: 0;
    }
  }

  .card-act {
    margin-top: 10px;

    .act-timevalue {
      margin-left: 32px;
    }
  }
}

.btn-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 375px;
  height: 49px;
  margin-top: 55px;

  /* 中性色/#fff */
  background: #fff;

  .member-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 24px;
    letter-spacing: 0.02em;

    span {
      text-align: center;
    }

    .member-icon {
      width: 24px;
      height: 24px;
      padding: 2px;
      background: #c2c2c2;
      border-radius: 50%;
    }

    .member-value {
      font-size: 10px;
    }
  }

  .exchange-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 20px;

    .exchange-icon {
      width: 24px;
      height: 24px;
      color: #fff;
      font-weight: bold;
      line-height: 24px;
      text-align: center;
      background: #c2c2c2;
      border-radius: 50%;
    }

    .exchange-value {
      font-size: 10px;
    }
  }

  .im-exchange {
    width: 215px;
    height: 37px;
    margin-left: 8px;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    line-height: 37px;
    text-align: center;
    background-color: #ff623e;
    border-radius: 8px;
  }
}

.model {
  position: absolute;
  width: 375px;
  height: 724px;
  background: rgba(0, 0, 0, 0.7);
}

.confirm,
.rules-wrap,
.success {
  position: absolute;
  top: 283px;
  left: 68px;
  width: 240px;
  height: 188px;
  padding: 20px;
  background: linear-gradient(180deg, #fff 0%, #ffe8e8 100%);
  border-radius: 10px;

  // .title {
  //   font-weight: 500;
  //   font-size: 18px;
  // }
  .wrap-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      color: #000;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      letter-spacing: -0.25px;

      /* identical to box height */

      text-align: center;
    }

    .desc-content {
     /*  margin-top: 21px; */

      /* 中性色/#333 */

      /* color: #333;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.25px; */
    }

    .btn-wrap {
      margin-top: 20px;

      button {
        width: 95px;
        height: 31px;
        color: #fff;
        text-align: center;
        border-radius: 6px;
      }
    }
  }
}

.rules-wrap {
  top: 253px;
  left: 46px;
  width: 284px;
  height: 400px;
  overflow: hidden;
  background: linear-gradient(180deg, #fff 0%, #ffe8e8 100%);
  border-radius: 10px;
}

.success {
  top: 283px;
  left: 68px;
  width: 240px;
  height: 310px;
  background: linear-gradient(180deg, #fff 0%, #ffe8e8 100%);
  border-radius: 10px;

  .desc-img {
    width: 80px;
    height: 80px;
    background: #e4e4e4;
  }

  .desc-content {
    margin-top: 15px;

    /* 中性色/#333 */

    color: #333;
    font-weight: normal;
    font-size: 12px;
   /*  font-family: Noto Sans SC; */
    font-style: normal;
    line-height: 17px;
    letter-spacing: 0.02em;
  }

  .desc-detail {
    margin-top: 10px;

    /* 兑换主色 */

    color: #ff623e;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.02em;
  }

  .go-back {
    width: 150px;
    height: 31px;
    margin-top: 20px;
    color: #fff;
    line-height: 31px;
    text-align: center;
    background: #ff623e;
    border-radius: 6px;
  }
}
</style>
