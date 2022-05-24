<template>
  <div class="wrap">
      <p class="content">{{descContent.desc}}</p>
      <p class="sub-desc">
        {{descContent.subDesc}}<span class="act-name">【{{descContent &&  descContent.actName}}】</span>活动吗?
      </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  props: {
    descContent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup () {
    return {
    }
  }
})
</script>
<style lang="less" scoped>
.wrap {
  width: 440px;
  font-weight: normal;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;

}

.content {
  width: 350px;
}

.sub-desc {
  margin-top: 16px;
}

.act-name{
   color:#4A5AED;
 }
</style>