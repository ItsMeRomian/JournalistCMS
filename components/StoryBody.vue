<template>
  <div
    class="mx-1 bg-broken rounded-2xl shadow-2xl p-4 z-10 relative pb-24"
    :style="{ marginTop: noMargin ? '0px' : '300px' }"
  >
    <h1 class="text-5xl hyphens-auto">{{ story?.title }}</h1>
    <Socials :story="story" />
    <p class="mb-1">
      <i
        >Laatst bijgewerkt op:
        {{ new Date(story?.dateUpdated).toLocaleDateString() }}</i
      >
    </p>
    <div class="body">
      <b>{{ story?.shortBody }}</b>
      <Player v-if="story?.audioURL" :src="story?.audioURL" :story="story" />
      <div class="mt-2" v-else v-html="story?.fullBody"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Story } from "~/server/api/stories";
import linkifyHtml from "linkify-html";

const props = defineProps<{ story: Story; noMargin: boolean }>();

onMounted(() => {
  try {
    props.story.fullBody = linkifyHtml(props.story.fullBody, {
      defaultProtocol: "https",
    });
  } catch (e) {
    console.log(e);
  }
});
</script>
<style>
blockquote {
  font-size: 30px;
  float: right;
  width: 38%;
  padding-left: 20px;
  font-weight: bold;
  text-align: left;
  padding-top: 65px;
}
blockquote > p::before,
blockquote > p::after {
  content: '"';
}
</style>
