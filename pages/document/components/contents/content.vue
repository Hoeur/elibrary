<script setup lang="ts">
const props = defineProps({ content: String });
</script>
<template>
  <div
    class="break-word whitespace-normal leading-relaxed tracking-normal"
    ref="printableContent"
    v-html="props.content"
  ></div>
</template>

<style lang="scss" scoped></style>
