<template>
  <div class="flex flex-row">
    <div>
      <h1 class="text-4xl">
        Hi {{ useRuntimeConfig().public.JOURNALIST.NAME }}! 🤍
      </h1>
      <p>Het is vandaag {{ new Date().toLocaleDateString() }}</p>
      <p>
        Er zijn momenteel <b>{{ stories?.length }}</b> artikelen op je website,
        waarvan <b>{{ onlineArticles }}</b> artikelen online.
      </p>
      <br />
      <table class="table-auto rounded-t-md">
        <thead class="bg-broken text-left">
          <th></th>
          <th>Titel</th>
          <th class="min-w-[9rem]">Datum geupdate</th>
          <th class="text-center pr-1 min-w-[6rem]">Acties</th>
        </thead>
        <tbody>
          <tr v-for="story in stories" class="hover:bg-sandDark">
            <td @click="toggleStory(story)">
              <span title="Zet artikel online/offline">
                <Icon
                  icon="mdi:flash"
                  v-if="story.published"
                  class="h-6 w-6 inline-block text-green-700 hover:text-green-900"
                /><Icon
                  icon="mdi:flash-off"
                  v-else
                  class="h-6 w-6 inline-block text-red-700 hover:text-red-900"
                />
              </span>
            </td>
            <td>{{ story.title }}</td>
            <td class="text-center">
              {{ new Date(story.dateUpdated).toLocaleDateString() }}
            </td>
            <td>
              <a
                target="_blank"
                :href="
                  story.slug
                    ? `https://${
                        useRuntimeConfig().public.PROD_BASE_URL
                      }/story/${story.slug}`
                    : `https://${
                        useRuntimeConfig().public.PROD_BASE_URL
                      }/story/${story.id}`
                "
                title="Open dit artikel"
              >
                <Icon icon="mdi:open-in-new" class="h-6 w-6 inline-block" />
              </a>
              <NuxtLink
                :to="'/admin/edit/' + story.id"
                title="Bewerk dit artikel"
                class="mx-1"
              >
                <Icon
                  icon="ant-design:edit-outlined"
                  class="h-6 w-6 inline-block"
                />
              </NuxtLink>
              <span title="Klik voor uitleg">
                <Icon
                  icon="mdi:alert-circle-outline"
                  class="h-6 w-6 inline-block text-red-700 hover:text-red-900 cursor-pointer"
                  @click="explainError(story)"
                  v-if="
                    story.title.length > MAX_TITLE_LENGTH ||
                    story.shortBody.length < MAX_SHORT_BODY_LENGTH ||
                    (!story.audioURL && story.fullBody.length < MIN_BODY_LENGTH)
                  "
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mx-auto text-center">
      Login Google Analytics
      <a
        class="h-20 inline-block"
        href="https://analytics.google.com/analytics/web/#/p390046585/reports/intelligenthome"
      >
        <Icon icon="mdi:google-analytics" class="h-6 w-6 inline-block" />
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { doc, updateDoc } from "firebase/firestore";
import type { Story } from "~/server/api/stories";
import { useToast } from "tailvue";

const MAX_TITLE_LENGTH = 65;
const MAX_SHORT_BODY_LENGTH = 165;
const MIN_BODY_LENGTH = 100;

definePageMeta({
  middleware: "auth",
  layout: "admin",
});
const { data: stories } = await useFetch("/api/stories");

const onlineArticles = computed(
  () => stories.value?.filter((story) => story.published).length || 0
);

const explainError = (story: Story) => {
  if (story.title.length > MAX_TITLE_LENGTH) {
    useToast().danger(
      `De titel van is te lang. Maximaal ${MAX_TITLE_LENGTH} karakters. Je hebt er nu ${story.title.length}.`
    );
  }
  if (story.shortBody.length > MAX_SHORT_BODY_LENGTH) {
    useToast().danger(
      `De korte tekst van is te lang. Maximaal ${MAX_SHORT_BODY_LENGTH} karakters. Je hebt er nu ${story.shortBody.length}.`
    );
  }
  if (!story.audioURL && story.fullBody.length < MIN_BODY_LENGTH) {
    useToast().danger(
      `De lange tekst van is te kort. Minimaal ${MIN_BODY_LENGTH} karakters. Je hebt er nu ${story.fullBody.length}.`
    );
  }
};

const toggleStory = async (story: Story) => {
  updateDoc(doc(useFirestore(), `stories/${story.id}`), {
    published: !story.published,
  });
  stories.value = stories.value?.map((s) =>
    s.id === story.id ? { ...s, published: !s.published } : s
  ) as Story[];
  useToast().success("Artikel geupdate");
};
</script>
<style scoped>
tr {
  border-top: 1px solid;
}

td {
  padding: 5px;
}

th {
  /* text-align: left; */
  font-size: large;
}
</style>
