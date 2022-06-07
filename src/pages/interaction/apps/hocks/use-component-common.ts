import { computed } from "vue";
import { pick } from "lodash-es";
import { TextComponentProps } from "@/store/data-type/common";
const useComponentCommon = (props: Readonly<Partial<TextComponentProps>>, picks: string[]) => {
  const styleProps = computed(() => pick(props, picks));
  const imgProps = computed(() => pick(props, picks));
  const handleClick = () => {
    console.log("xxx");
  };
  return {
    styleProps,
    imgProps,
    handleClick
  };
};

export default useComponentCommon;
