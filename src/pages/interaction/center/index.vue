<template>
  <div class="page">
    <h1 class="font_20 page-title" >互动中心</h1>
    <div class="flex-box tag-wrap">
      <div class="flex1 flex-box">
        <div class="label">价值</div>
        <div class="flex1">
         <template v-for="tag in tags" :key="tag">
            <a-checkable-tag
              :checked="selectedTags.indexOf(tag) > -1"
              @change="checked => handleChangeEvent(tag, checked)"
            >
              {{ tag }}
            </a-checkable-tag>
          </template>
        </div>
      </div>
      <div>
        <a-input-search
          v-model:value="searchValue"
          placeholder="输入活动名称或关键字全局搜索"
          enter-button="搜索"
          @search="onSearchEvent"
        />
      </div>
    </div>
    <!-- 互动卡片 -->
    <div class="interaction-card-box">
      <base-interaction-card mainImage="/big-wheel.png" path="/app/marketing/interaction/apps/bigwheel" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import BaseInteractionCard from "@/components/base-interaction-card/index.vue";
export default defineComponent({
  components: {
    BaseInteractionCard
  },
  setup() {
    const router = useRouter();
    const searchValue = ref('')
    const state = reactive({
      tags: ['全部', '拉新', '促活', '转化', '传播', '留存'],
      selectedTags: [] as string[],
    });
    const clickEvent = () => {
      // /app/marketing/interaction/list
      router.push({ path: "/app/marketing/interaction/list" });
    };
    const onSearchEvent = () => {
      console.log('handleSeach')
    }
    const handleChangeEvent = (tag: string, checked: boolean) => {
       const { selectedTags } = state;
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter(t => t !== tag);
      console.log('You are interested in: ', nextSelectedTags);
      state.selectedTags = nextSelectedTags;
    }
    return {
      ...toRefs(state),
      searchValue,
      clickEvent,
      onSearchEvent,
      handleChangeEvent
    };
  }
});
</script>

<style lang="less" scoped>
.page-title {
  /* font-family: 'Noto Sans SC'; */
  font-style: normal;
}
.tag-header--item {
  height: 50px;
  line-height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.tag-header--title {
  background-color: #ddd;
}

.search-box {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}

.interaction-card-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  background-color: #f1f1f1;
}
.tag-wrap {
  margin-top: 32px;
}
.label {
  /* font-family: 'Noto Sans SC'; */
  font-style: normal;
  font-weight: 500;
}
</style>
