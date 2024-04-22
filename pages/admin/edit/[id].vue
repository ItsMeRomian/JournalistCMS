<template>
  <div class="flex flex-row gap-4">
    <div class="flex flex-col">
      <FileHandler
        @place-in-article="(file: ArticleFile) => placeInArticle(file)"
        @set-as-cover="(file: ArticleFile) => setAsCover(file)"
        @use-as-audio="(file: ArticleFile) => useAsAudio(file)"
      />
      <StoryEditor
        :story="story"
        @submit="(updateLastEdited) => update(updateLastEdited)"
        :is-update="true"
      />
    </div>
    <div class="flex flex-col gap-4">
      <EditDates :story="story" />
      <Preview :story="story" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { doc, updateDoc } from "@firebase/firestore";
import type { Story } from "~/server/api/stories";
import { useToast } from "tailvue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
interface ArticleFile {
  name: string;
  url: string;
  date: string;
}
const route = useRoute();
const { data: existingStory } = await useFetch(`/api/story/${route.params.id}`);
const story = reactive({
  title: existingStory.value?.title || "",
  published: existingStory.value?.published || false,
  coverPhoto: existingStory.value?.coverPhoto || "",
  fullBody: existingStory.value?.fullBody || "",
  shortBody: existingStory.value?.shortBody || "",
  slug: existingStory.value?.slug || "",
  audioURL: existingStory.value?.audioURL || "",
  dateCreated: existingStory.value?.dateCreated || "",
  dateUpdated: existingStory.value?.dateUpdated || new Date().toISOString(),
} as Story);
const setAsCover = (file: ArticleFile) => {
  story.coverPhoto = file.url;
  useToast().success("Cover ingesteld.");
};
const placeInArticle = (file: ArticleFile) => {
  usePhoto().value = file;
  useToast().success("Foto geplaatst.");
};
const useAsAudio = (file: ArticleFile) => {
  story.audioURL = file.url;
  useToast().success("Audio ingesteld.");
};

const update = async (updateLastEdited: boolean | undefined) => {
  try {
    const fb = useFirestore();
    const body = updateLastEdited
      ? { ...story, dateUpdated: new Date().toISOString() }
      : story;
    console.log(body);

    await updateDoc(doc(fb, `stories/${existingStory.value?.id}`), body);
    await navigateTo("/admin/");
    useToast().success("Artikel geupdate");
  } catch (e) {
    console.error(e);
    useToast().danger("Oh god oh nee er gaat wat mis");
  }
};
</script>
