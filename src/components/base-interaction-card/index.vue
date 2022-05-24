<template>
  <div class="interaction-card">
    <div>
      <img class="interaction-card__image" src="/big-wheel.png" alt="" />
    </div>
    <div class="flex-box interaction-card__bottom">
      <div class="flex1">大转盘</div>
      <div @click="gotoEvent" class="interaction-card__icon">
        <PlusOutlined />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BaseInteractionCard",
  props: ["mainImage", "path"],
  components: {
    PlusOutlined
  },
  setup(props) {
    const router = useRouter();
    const gotoEvent = () => {
      console.log(1);
      router.push({ path: props.path });
    };
    return {
      gotoEvent
    };
  }
});
</script>

<style lang="less" scoped>
.interaction-card {
  width: 300px;
  height: 550px;
  background-color: #fff;
}

.interaction-card__image {
  width: 100%;
  height: 500px;
}

.interaction-card__bottom {
  padding: 0 20px;
  font-size: 16px;
  line-height: 50px;
  box-shadow: 5px 5px 5px #ccc;
}

.interaction-card__icon {
  cursor: pointer;
}
</style>
