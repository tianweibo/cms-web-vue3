<template>
  <component  :is="tag" :style="styleProps" class="l-text-component">
    {{ text }}
  </component>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useComponentCommon from "../../../hocks/useComponentCommon";
import {
  transformToComponentProps,
  text,
  textStylePropNames
} from "@/store/dataType/common";
const defaultProps = transformToComponentProps(text);
export default defineComponent({
  name: "l-text",
  props: {
    tag: {
      type: String,
      default: "span"
    },
    layerName: {
      type: String,
      default: ""
    },
    ...defaultProps
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
    return {
      styleProps,
      handleClick
    };
  }
});
</script>

<style scoped>
h2.l-text-component,
p.l-text-component {
  margin-bottom: 0;
}

button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}

.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
}
</style>
