<template>
  <div
    class="rounded-md shadow-md bg-white px-4 py-2 flex flex-col justify-between"
  >
    <span class="text-2xl font-semibold">Bewerk datums</span>
    <Field
      :field="{
        type: 'date',
        label: 'Datum gemaakt',
        id: 'dateCreated',
        model: story.dateCreated,
      }"
      @update="(value) => (story.dateCreated = value as string)"
    />
    <Field
      :field="{
        type: 'date',
        label: 'Datum geüpdatet',
        id: 'dateUpdated',
        model: story.dateUpdated,
      }"
      @update="(value) =>
        (story.dateUpdated = value as string)"
    />
  </div>
</template>
<script setup lang="ts">
import type { Story } from "~/server/api/stories";

const props = defineProps<{
  story: Story;
}>();
</script>
