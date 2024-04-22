<script setup lang="ts">
import { Icon } from "@iconify/vue";

const podcasts = [
  {
    title: "Highlighted Podcast",
    desc: "Adipisci, necessitatibus exercitationem. Dolore, quia? Accusantium quos labore quibusdam eum est, tempora possimus amet quae error placeat laborum obcaecati. Laborum dignissimos quia aliquid et. Libero reprehenderit eos ut quidem vitae.",
    link: "https://open.spotify.com/episode/7",
  },
];
interface Podcast {
  title: string;
  desc: string;
  link: string;
  date: string;
}

let showEps = ref(false);

const goTo = (id: string) =>
  id.includes("http")
    ? navigateTo(id, { external: true })
    : navigateTo(`/story/${id}`);
</script>
<template>
  <div
    class="bg-reddishDark pl-4 grid grid-cols-4 my-2 rounded-lg cursor-pointer"
    v-if="podcasts && podcasts.length && podcasts[0]"
  >
    <div class="col-span-4 md:col-span-3">
      <div class="flex flex-col h-full">
        <p class="pt-2 font-black uppercase font-serif text-sm">
          <Icon icon="mdi:spotify" class="w-5 h-5 inline" />
          Luister PODCAST op Spotify!
        </p>
        <h2 class="text-2xl" @click="goTo(podcasts[0].link)">
          {{ podcasts[0].title }}
        </h2>
        <p class="line-clamp-3 pr-2" @click="goTo(podcasts[0].link)">
          {{ podcasts[0].desc.substring(0, 280) }}
          ...
        </p>
        <span
          @click="showEps = !showEps"
          class="self-start m-2 ml-0 mb-4 p-2 bg-sandDark text-black mt-auto"
          >Eerdere afleveringen</span
        >
      </div>
    </div>
    <div class="hidden md:block">
      <img :src="'https://placehold.it/400x250'" class="rounded-r-lg h-full" />
    </div>
    <div v-if="showEps" class="text-left p-2 col-span-full">
      <ul>
        <li
          v-for="podcast in podcasts?.slice(0, podcasts.length - 1)"
          style="border-bottom: solid"
          class="mb-2"
        >
          <a
            target="_blank"
            class="cursor-pointer hover:text-gray-500"
            @click="goTo(podcast.link)"
          >
            <Icon icon="mdi:spotify" class="w-5 h-5" />{{ podcast.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
