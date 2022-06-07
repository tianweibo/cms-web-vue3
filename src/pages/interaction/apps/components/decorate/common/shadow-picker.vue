<template>
  <ul class="r-text-component">
    <li class="clearfix r-text-item">
      <span class="theLabel">
        阴影颜色：
      </span>
      <span class="theValue">
        <color-picker
          :value="borderShadow[0]"
          @change="
            v => {
              changeShadow(v, 0);
            }
          "
        ></color-picker>
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        阴影大小：
      </span>
      <span class="theValue">
        <a-slider
          v-model:value="borderShadow[1]"
          @change="
            v => {
              changeShadow(v, 1);
            }
          "
        />
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        阴影模糊：
      </span>
      <span class="theValue">
        <a-slider
          v-model:value="borderShadow[2]"
          @change="
            v => {
              changeShadow(v, 2);
            }
          "
        />
      </span>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import ColorPicker from "./color-picker.vue";

export default defineComponent({
  name: "shadow-picker",
  props: {
    values: {
      type: String,
      default: ""
    }
  },
  components: {
    ColorPicker
  },
  emits: ["change"],
  setup(props, context) {
    let borderShadow = computed(() => {
      let a = props.values.split(" ");
      let b: any = [];
      b[0] = a[0];
      b[1] = parseInt(a[1]);
      b[2] = parseInt(a[3]);
      return b;
    });
    const changeShadow = (e: any, param: number) => {
      let zhi = "";
      if (param == 0) {
        zhi = `${e} ${borderShadow.value[1]}px ${borderShadow.value[1]}px ${borderShadow.value[2]}px`;
      } else if (param == 1) {
        zhi = `${borderShadow.value[0]} ${e}px ${e}px ${borderShadow.value[2]}px`;
      } else if (param == 2) {
        zhi = `${borderShadow.value[0]} ${borderShadow.value[1]}px ${borderShadow.value[1]}px ${e}px`;
      }

      context.emit("change", zhi, "boxShadow");
    };
    return {
      borderShadow,
      changeShadow
    };
  }
});
</script>

<style scoped>
.r-text-component {
  max-width: 100%;
}

.r-text-item {
  height: 40px;
  line-height: 40px;
}

.theLabel {
  display: inline-block;
  width: 132px;
  text-align: right;
}

.theValue {
  display: inline-block;
  width: 300px;
  text-align: left;
}
</style>
