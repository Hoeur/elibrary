<script setup lang="ts">
// import { useDocumentStore } from '~/store';
import { filterObjectWithTruthyValues } from '~/utils';
import { useDoc } from '../../store/document/index';

// const store = useDocumentStore();
const router = useRouter();
const search = useSearch();
const doc = useDoc();

const show = ref(false);
const message = ref<string | any>('');
const load_more = ref<boolean>(false);
const query = ref<any>(null);
const handleSearchFocus = () => {
  show.value = !show.value;
};

const onChange = (event: InputEvent) => {
  const { value } = event.target as HTMLInputElement;
  search.append('search', value);
};
let qry = `&page=${doc.page}&limit=${doc.limit}`;
const onSubmit = async () => {
  const { data, status, error, pending } = await useFetch<any>(
    '/api/search?q=' +
      search.params.value.search +
      '&type=' +
      search.params.value.type +
      '&categories=' +
      search.params.value.categories +
      qry
  );
  if (error.value) {
    throw (message.value = error.value);
  }
  items.value = (data as any).value.data;
  doc.items = (data as any).value.data;
  doc.total = (data as any).value.total;
  doc.page = 1;
  router.push({
    path: '/result',
    query: filterObjectWithTruthyValues(search.params.value),
    force: true,
  });
  show.value = false;
};

const items = ref<Document[]>([]);
watch(
  [search.params.value],
  debounce(async () => {
    const { data, status, error, pending } = await useFetch<any>(
      '/api/search?q=' +
        search.params.value.search +
        '&type=' +
        search.params.value.type +
        '&categories=' +
        search.params.value.categories +
        qry
    );
    if (error.value) {
      throw (message.value = error.value);
    }
    items.value = (data as any).value.data;
    doc.items = (data as any).value.data;
    doc.total = (data as any).value.total;
    doc.page = 1;
  }, 500)
);

const highlightText = (text: string, words: string[]) => {
  if (!words || words.length === 0) return text;

  const regex = new RegExp(words?.join('|'), 'gi');
  return text?.replace(regex, '<span class="highlight">$&</span>');
};
</script>

<template>
  <div
    class="relative bg-transparent border-2 border-blue-900 rounded-sm flex-1"
  >
    <form class="flex justify-between" @submit.prevent="onSubmit">
      <div class="block w-full dropdown">
        <input
          name="search"
          type="search"
          placeholder=" សូមវាយពាក្យគន្លឹះ"
          class="w-full z-50 p-2 bg-zinc-50 h-9 sm:h-12 text-gray-9000 bg-transparent border-none outline-none"
          autocomplete="off"
          :value="search.params.value.search"
          @input="onChange"
          @focus="handleSearchFocus"
          @focusout="handleSearchFocus"
        />
        <SearchSuggestion :items="items" :highlightText="highlightText" />
      </div>
      <button
        id="search"
        role="button"
        aria-label="Search"
        type="submit"
        class="w-fit sm:w-20 p-2 z-50 grid place-content-center h-9 sm:h-12 text-white bg-blue-900 outline-none border-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<style>
.highlight {
  color: blue;
}
</style>
