<template>
  <NuxtLayout v-if="!DISABLED">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
const DISABLED = false;

onMounted(() => {
  if (DISABLED) {
    window.location.href = "https://dynafools.live/?r=d";
  }
});
</script>
