<template>
  <div class="lego-color-picker" style="display:inline-block">
    <div class="native-color-container">
      <input type="color" :value="value" @input="onChange($event.target.value)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
const defaultColors = [
  "#ffffff",
  "#f5222d",
  "#fa541c",
  "#fadb14",
  "#52c41a",
  "#1890ff",
  "#722ed1",
  "#8c8c8c",
  "#000000",
  ""
];
export default defineComponent({
  props: {
    value: {
      type: String,
      default: "#ffffff"
    },
    colors: {
      type: Array as PropType<string[]>,
      default: defaultColors
    }
  },
  emits: ["change"],
  setup(props, context) {
    const onChange = (color: string) => {
      context.emit("change", color);
    };
    return {
      onChange
    };
  }
});
</script>

<style>
.lego-color-picker {
  display: flex;
}

.native-color-container {
  width: 40%;
}

.native-color-container input[type="color"] {
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

.picked-color-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 60%;
  margin: 0;
  padding: 0 0 0 5px;
  list-style-type: none;
}

.picked-color-list li {
  flex: 1;
  width: 20%;
  min-width: 20%;
  max-width: 20%;
}

.color-item {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
}

.transparent-back {
  background: url("~@/assets/transparent.png") no-repeat;
}
</style>
