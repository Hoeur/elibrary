<script setup lang="ts">
const props = defineProps<{
    handleChangeType: () => void;
    url: string;
}>();
</script>
<template>
  <div v-auto-animate data-aos="fade-left" class="mt-2">
    <button
      class="btn btn-sm bg-[#1608d4] hover:bg-[#1608d4] my-1 w-[200px] md:w-[100px] text-white text-xl"
      @click="props.handleChangeType"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <iframe style="height: 100vh; width: 100%" :src="props.url"></iframe>
  </div>
</template>

<style lang="scss" scoped></style>
