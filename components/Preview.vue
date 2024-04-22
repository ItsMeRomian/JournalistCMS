<template>
  <div class="mx-auto rounded-md">
    <div class="max-w-[390px] max-h-[844px] overflow-scroll rounded-md">
      <img :src="'https://placehold.it/1000x1000'" class="w-full" />
      <StoryBody :story="story" :no-margin="true" style="margin-top: -50px" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Story } from "~/server/api/stories";

const props = defineProps<{ story: Story }>();
</script>
