<template>
  <audio
    @play="onListening()"
    controls
    class="w-full md:w-1/2 bg-gray-200 p-4 rounded-lg mx-auto mt-4"
  >
    <source :src="props.src" type="audio/mpeg" />
  </audio>
</template>
<script setup lang="ts">
import type { Story } from "~/server/api/stories";

const props = defineProps<{
  src: string;
  story: Story;
}>();

const onListening = () => {
  useGtm()?.trackEvent({
    event: "listening",
  });
};
</script>
