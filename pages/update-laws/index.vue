<script setup lang="ts">
useSeoMeta({
  ogTitle: 'លិខិតបទដ្ឋានគតិយុត្ត | ក្រសូងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់',
  title: 'លិខិតបទដ្ឋានគតិយុត្ត | ក្រសូងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់',
});
useServerSeoMeta({
  title: 'លិខិតបទដ្ឋានគតិយុត្ត | ក្រសូងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់',
  ogTitle: 'លិខិតបទដ្ឋានគតិយុត្ត | ក្រសូងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់',
});

const message = ref('');
const lated_update_date = ref<any>('');
const { data, error,pending } = await useFetch('/api/last_update');
if (error.value) {
  throw message.value = error.value.message; // Store the error message
} else if (data.value) {
  lated_update_date.value = (data as any).value.data.last_update;
}
</script>

<template>
  <section class="search_section_layout">
    <Search />
  </section>
  <section class="mt-9">
    <UpdateLawHeader />
    <div class="border-b my-2" />
    <div class="grid gap-3 py-2 md:px-4 lg:px-6">
      <div v-if="pending"></div>
      <UpdateLawTitle v-else :date="lated_update_date" />
      <UpdateLawList />
    </div>
  </section>
</template>
