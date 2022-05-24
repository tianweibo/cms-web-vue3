import { onMounted, ref } from "vue";
import { Activity, ActParam } from "./types";
import { getActs } from "@/api/interaction/listService";

export default function getActList(formState: ActParam) {
  const list = ref<Array<Activity>>([]);
  onMounted(async () => {
    const res = await getActs(formState);
    if (!res.retcode) {
      list.value = res.content.data.map(item => {
        item.time = item.beginAt + " " + item.endAt;
        return item;
      });
    }
  });
  return list;
}
