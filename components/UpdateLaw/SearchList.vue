<script setup lang="ts">
import type { Document, MetaData } from '~/base/interfaces/ApiData';
const { params } = useSearch();
import { useDoc } from '../../store/document/index';

const doc = useDoc();
const search = useSearch();

const scrollContainer = ref<any>(null);
const route = useRoute();
const message = ref<string | any>('');
const load_more = ref<boolean>(false);
const panding = ref<any>(false);
const query = ref<any>({
  page: 1,
  limit: 50,
});

let qry = `&page=${query.value.page}&limit=${query.value.limit}`;
const fetchData = async () => {
  const { data, error, pending } = await useFetch<any>(
    `/api/search?q=${search.params.value.search}&type=${search.params.value.type}&categories=${search.params.value.categories}` +
      qry
  );

  if (error.value) {
    message.value = error.value.message;
    throw error.value;
  }

  panding.value = pending.value;
  doc.items = data.value.data;
  doc.total = data.value.total;
};

watch([search.params], debounce(fetchData, 500));

fetchData();

const handleScroll = async () => {
  const container: any = scrollContainer.value;
  query.value = {
    page: doc.page + 1,
    limit: 50,
  };
  let new_qry = `&page=${query.value.page}&limit=${doc.limit}`;
  const bottomOffset =
    container.scrollHeight - container.clientHeight - container.scrollTop;
  if (bottomOffset < 100) {
    if (doc.total <= doc.items.length) {
      // doc.page = 1
      return;
    }
    const { data, status, error, pending } = await useFetch<any>(
      '/api/search?q=' +
        search.params.value.search +
        '&type=' +
        search.params.value.type +
        '&categories=' +
        search.params.value.categories +
        new_qry
    );
    if (error.value) {
      throw (message.value = error.value);
    }
    doc.items = [...doc.items, ...(data as any).value.data];
    doc.total = data.value.total;
    load_more.value = false;
    doc.page += 1;
  }
};

// Debounce function
const debounces = (func: any, delay: any) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const debouncedHandleScroll = debounces(handleScroll, 300); // 300ms debounce delay

onMounted(() => {
  window.addEventListener('scroll', debouncedHandleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', debouncedHandleScroll);
});
</script>

<template>
  <div ref="scrollContainer" class="grid gap-2">
    <template v-if="panding">
      <UpdateLawSkeleton v-for="item in doc.items" :key="item?.id" />
    </template>
    <template v-else-if="doc.items?.length">
      <UpdateLawItem v-for="item in doc.items" :key="item?.id" :item="item" />
    </template>
  </div>
  <div v-if="load_more" class="w-full flex items-center justify-center py-3">
    <span class="loading loading-spinner !w-[2rem] text-sky-500"></span>
  </div>
</template>
