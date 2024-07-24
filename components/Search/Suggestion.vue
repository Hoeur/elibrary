<script setup lang="ts">
const props = defineProps<{
  items: any[];
  highlightText: () => any;
}>();
</script>
<template>
  <div class="dropdown-content w-full mt-2 shadow-sm rounded-sm bg-white z-50">
    <ul class="divide-y">
      <li
        v-for="(item, idx) in props.items"
        :key="idx"
        class="search_suggestion_item"
      >
        <NuxtLink :to="'/document/'+item.id">
          <div
            class="font-bold text-lg"
            v-html="props.highlightText(item.name, item.words)"
          ></div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
