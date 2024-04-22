<template>
  <div>
    <Podcast />
    <template v-for="story in stories" class="">
      <div
        v-if="story.published && story.id"
        @click="goTo(story.slug ? story.slug : story.id)"
        class="bg-broken pl-4 grid grid-cols-4 my-4 rounded-lg cursor-pointer"
      >
        <div class="col-span-4 md:col-span-3">
          <h2 class="text-2xl pt-2">{{ story.title }}</h2>
          <p>
            <i>
              Laatst bijgewerkt op:
              {{ new Date(story.dateUpdated).toLocaleDateString() }}
            </i>
          </p>
          <p class="line-clamp-3 pr-2">
            {{ story.shortBody.substring(0, 280) }} ...
          </p>
        </div>
        <div class="hidden md:block">
          <img
            :src="'https://placehold.it/400x200'"
            class="rounded-r-lg h-full"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import type { Story } from "~/server/api/stories";

const { data: stories } = await useFetch("/api/stories", {
  server: true,
});

if (stories.value)
  stories.value = stories.value.sort(
    (a: Story, b: Story) =>
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

const goTo = (id: string) =>
  id.includes("http")
    ? navigateTo(id, { external: true })
    : navigateTo(`/story/${id}`);
</script>
