<template>
  <MainMenu />
  <div class="mx-20">
    <div
      class="fixed top-42 left-16 transition-all duration-500 ease-in-out delay-400"
      :class="{ hidden: !show }"
    >
      <AdminMenu @hide-menu="show = false" />
    </div>
    <div class="fixed top-42 left-1" @click="() => (show = !show)">
      <Icon icon="mdi:menu" class="h-10 w-10 inline-block" />
    </div>
    <div
      class="mx-auto transition-all duration-300 ease-in-out"
      :class="{ 'ml-0': !show, 'ml-52': show }"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
const show = ref(false);
</script>
