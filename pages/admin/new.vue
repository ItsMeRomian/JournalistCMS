<template>
  <div class="flex flex-row gap-4">
    <div class="flex flex-col">
      <FileHandler
        @place-in-article="(file: ArticleFile) => placeInArticle(file)"
        @set-as-cover="(file: ArticleFile) => setAsCover(file)"
        @use-as-audio="(file: ArticleFile) => useAsAudio(file)"
      />
      <StoryEditor :story="story" @submit="() => submit()" :is-update="false" />
    </div>
    <Preview :story="story" v-if="story.title && story.shortBody" />
  </div>
</template>
<script setup lang="ts">
import { addDoc, collection } from "@firebase/firestore";
import { useToast } from "tailvue";

interface ArticleFile {
  name: string;
  url: string;
  date: string;
}

definePageMeta({
  middleware: "auth",
  layout: "admin",
});
const story = reactive({
  coverPhoto: "",
  fullBody: "",
  shortBody: "",
  slug: "",
  audioURL: "",
  title: "",
  published: false,
  dateUpdated: new Date().toISOString(),
  dateCreated: new Date().toISOString(),
});

const isAudio = ref(false);

watch(isAudio, () => {
  if (!isAudio) story.audioURL = "";
});

const setAsCover = (file: ArticleFile) => {
  story.coverPhoto = file.url;
  useToast().success("Cover ingesteld.");
};
const placeInArticle = (file: ArticleFile) => {
  usePhoto().value = file;
  useToast().success("Foto geplaatst.");
};
const useAsAudio = (file: ArticleFile) => {
  isAudio.value = true;
  story.audioURL = file.url;
  useToast().success("Audio ingesteld.");
};

const submit = async () => {
  try {
    const fb = useFirestore();
    await addDoc(collection(fb, "stories"), {
      ...story,
      dateUpdated: new Date().toISOString(),
    });
    await navigateTo("/admin/");
    useToast().success("Artikel geplaatst.");
  } catch (e) {
    console.error(e);
    useToast().danger("Er  is wat fataal fout gegaan.");
  }
};
</script>
