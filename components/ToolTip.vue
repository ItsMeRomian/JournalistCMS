<template>
  <span
    class="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
    data-te-toggle="tooltip"
    :title="props.tip"
  >
    <slot />
  </span>
</template>
<script setup lang="ts">
const props = defineProps<{
  tip: string;
}>();
</script>
