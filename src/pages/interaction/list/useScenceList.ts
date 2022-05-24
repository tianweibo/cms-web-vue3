import { onMounted, ref } from "vue";
import { Scence, ScenceParams } from "./types";
import { scenceList } from "@/api/interaction/listService";

export default function getScenceList(formState: ScenceParams) {
  const list = ref<Array<Scence>>([]);
  onMounted(async () => {
    const res = await scenceList(formState);
    if (res) {
      list.value = res.content.data;
    }
  });
  return list;
}
