import { onMounted, ref, Ref } from "vue";
import { HdLogsParams, LogInfo } from "../../types";
import { hdLogs } from "@/api/interaction/listService";

export default function getHdList(formState: Partial<HdLogsParams>) {
  const data = ref<Array<LogInfo>>([]);
  const totalCount: Ref<number> = ref(0);
  onMounted(async () => {
    const res = await hdLogs({ ...formState, lastId: 0 });
    if (res.retcode === 0) {
      console.log(res, 'res')
      data.value = res.content.data;
      totalCount.value = res.content.totalCount;
    }
  });
  return { data , totalCount };
}
