<script setup lang="ts">
import SearchList from '../../components/UpdateLaw/SearchList.vue';
import { useDoc } from '../../store/document/index';

const doc = useDoc();
useSeoMeta({
  title: 'រុករកឯកសារ | ក្រសូងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់',
  ogTitle: 'រុករកឯកសារ | ក្រសូងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់',
});
</script>

<template>
  <section class="search_section_layout">
    <Search />
  </section>
  <section class="mt-9">
    <ResultHeader :total="doc.total" />
    <div class="border-b my-2" />
    <SearchList />
  </section>
</template>
