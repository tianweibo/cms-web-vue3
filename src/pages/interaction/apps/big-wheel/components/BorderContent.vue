<template>
  <ul class="r-text-component">
    <li class="clearfix r-text-item">
      <span class="theLabel">
        边框宽度：
      </span>
      <span class="theValue">
        <a-slider
          v-model:value="theBorder[0]"
          :min="1"
          :max="10"
          @change="
            v => {
              changeBorder(v, 0);
            }
          "
        />
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        边框类型：
      </span>
      <span class="theValue">
        <a-select
          ref="select"
          v-model:value="theBorder[1]"
          :options="options1"
          style="width: 120px"
          @change="
            v => {
              changeBorder(v, 1);
            }
          "
        >
        </a-select>
      </span>
    </li>
    <li class="clearfix r-text-item">
      <span class="theLabel">
        边框颜色：
      </span>
      <span class="theValue">
        <color-picker
          :value="theBorder[2]"
          @change="
            v => {
              changeBorder(v, 2);
            }
          "
        ></color-picker>
      </span>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import ColorPicker from "./ColorPicker.vue";

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
    let theBorder = computed(() => {
      let a = props.values.split(" ");
      let b = [];
      b[0] = parseInt(a[0]);
      b[1] = a[1];
      b[2] = a[2];
      return b;
    });
    let options1 = [
      {
        label: "solid",
        value: "solid"
      },
      {
        label: "dashed",
        value: "dashed"
      },
      {
        label: "none",
        value: "none"
      },
      {
        label: "dotted",
        value: "dotted"
      }
    ];
    const changeBorder = (e: any, param: number) => {
      let zhi = "";
      if (param == 0) {
        zhi = `${e}px ${theBorder.value[1]} ${theBorder.value[2]}`;
      } else if (param == 1) {
        zhi = `${theBorder.value[0]}px ${e} ${theBorder.value[2]}`;
      } else if (param == 2) {
        zhi = `${theBorder.value[0]}px ${theBorder.value[1]} ${e}`;
      }
      context.emit("change", zhi, "border");
    };
    return {
      theBorder,
      options1,
      changeBorder
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
