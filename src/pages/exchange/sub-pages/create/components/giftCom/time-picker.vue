<template>
<span>
  <a-time-picker @change="handleChange" v-model:value="startTime" format="HH:mm" />
  ~
  <a-time-picker  @change="handleChange" v-model:value="endTime" :disabledHours="disabledRangeTime" :disabledMinutes="disabledMinutes" format="HH:mm" />
</span>
</template>
<script lang="ts">
import { defineComponent, ref,  reactive } from "vue"
import moment from 'moment';
import deepClone from 'clone'
export default defineComponent({
emits: ['timerRangeChange'],
props: {
  timerList:{
     type: Array,
     default: () => {
       return []
     }
  }
},
setup (props, context) {
  const startTime = ref()
  const endTime = ref()
  const timerList = reactive(deepClone(props['timerList']))
  if (props && props['timerList'] && props['timerList'].length === 2) {
    startTime.value = timerList[0]
    endTime.value = timerList[1]
  }
  const range = (start: number, end: number) => {
      const result: number[] = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    };
   const disabledRangeTime = () => {
     const start = Number(moment(startTime.value).format('HH'));
     return range(0, start)
   }
   const disabledMinutes = () => {
     const start = Number(moment(startTime.value).format('mm'));
     return range(0, start)
   }
   const handleChange = () => {
     context.emit('timerRangeChange', [startTime.value, endTime.value])
   }
   return {
     startTime,
     endTime,
     disabledRangeTime,
     disabledMinutes,
     handleChange
   }
 }
})
</script>