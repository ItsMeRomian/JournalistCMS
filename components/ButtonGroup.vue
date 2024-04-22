<template>
  <div
    class="inline-flex rounded-md shadow-sm mx-2"
    role="group"
    v-for="group in groups"
  >
    <button
      v-for="button in group"
      class="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-green-200"
      @click="button.click"
      :disabled="button.isDisabled()"
    >
      <component :is="button.icon" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  groups: {
    click: () => void;
    isDisabled: () => boolean;
    icon: string;
  }[][];
}>();
</script>
