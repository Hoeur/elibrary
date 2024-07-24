<script setup lang="ts">
import moment from 'moment';
type Date = number
const props = defineProps({
  date:Date
})

const lateUpdateDate = (date:any) => {
  let Date:any = moment.unix(date)
  Date.subtract(30,'days')
  return moment(Date).unix()
}
</script>
<template>
  <div class="text-slate-700 text-lg" v-if="props.date">
    បានធ្វើបច្ចុប្បន្នភាព:
    <span>{{ formatDateToKhmer(lateUpdateDate(props.date || null)) }}</span>
  </div>
</template>
