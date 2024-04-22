<template>
  <form
    class="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 min-w-[60rem]"
  >
    <div class="flex flex-row">
      <div class="">
        <h2 class="text-2xl font-semibold">Edit Post</h2>
        <span
          class="mb-4 inline-block uppercase font-serif font-light mt-1 bg-slate-300 py-1 px-2 rounded-md"
        >
          <Icon
            :icon="story.audioURL ? 'ph:speaker-high' : 'ph:text-outdent'"
            class="w-4 h-4 inline-block mr-2 mb-1"
          />
          {{ story.audioURL ? "audio" : "tekst" }}
          bericht
        </span>
      </div>
      <div
        class="ml-auto text-right uppercase font-serif font-light inline-block"
      >
        <Field
          :field="{
            type: 'checkbox',
            label: '',
            id: 'published',
            model: story.published,
          }"
          @update="(value) => (story.published = value as boolean)"
        />
        <Icon
          icon="mdi:flash"
          v-if="story.published"
          class="h-6 w-6 mb-4 ml-2 inline-block text-green-700 hover:text-green-900"
        /><Icon
          icon="mdi:flash-off"
          v-else
          class="h-6 w-6 mb-4 ml-2 inline-block text-red-700 hover:text-red-900"
        />
      </div>
    </div>

    <Field
      :field="{
        type: 'textbox',
        label: 'Title',
        id: 'title',
        model: story.title,
      }"
      @update="(value) => onUpdateTitle(value)"
    />
    <span class="block mb-2 font-bold font-serif">Custom URL: </span>
    <div class="flex flex-row mb-2">
      <span>https://{{ useRuntimeConfig().public.PROD_BASE_URL }}/story/</span>
      <input
        type="text"
        v-model="story.slug"
        class="border-b-2 inline-block w-full"
      />
    </div>
    <Field
      :field="{
        type: 'textarea',
        label: 'Short Body',
        id: 'shortBody',
        model: story.shortBody,
      }"
      @update="(value) => (story.shortBody = value as string)"
    />

    <!--Editor-->
    <div class="border rounded-lg" v-if="!story?.audioURL">
      <ClientOnly>
        <TipTap
          v-model="story.fullBody"
          @update="(modelValue: string) => (story.fullBody = modelValue)"
        />
      </ClientOnly>
    </div>

    <!--Audio-->
    <div class="mb-4" v-if="story.audioURL">
      <label for="shortBody" class="block font-medium mb-2">
        Ingesteld Audiobericht:
      </label>
      <span title="Kies in het bestandenscherm een andere om dit te wijzigen">
        {{ story.audioURL?.split("images%2F")[1].split("?")[0] }}
        <Icon
          icon="ph:x"
          class="w-4 h-4 inline-block ml-2"
          @click="makeTextStory()"
        />
      </span>
    </div>

    <!--Submit-->
    <div class="my-4">
      <span
        type="submit"
        class="bg-green-300 text-dark px-4 py-2 rounded-md hover:bg-sandDark cursor-pointer"
        @click="emit('submit', false)"
      >
        {{ props.isUpdate ? "Update" : "Submit" }}
      </span>
      <span
        v-if="props.isUpdate"
        type="submit"
        class="bg-blue-300 text-dark px-4 py-2 rounded-md hover:bg-sandDark cursor-pointer ml-2"
        @click="emit('submit', true)"
      >
        Update + Laatst bewerkt op nu
      </span>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { Story } from "~/server/api/stories";
import { useToast } from "tailvue";
import { Icon } from "@iconify/vue";

const props = defineProps<{ story: Story; isUpdate: boolean }>();
const emit = defineEmits<{
  (event: "submit", updateLastEdited?: boolean): void;
}>();

const makeTextStory = () => {
  props.story.audioURL = "";
  useToast().success("Audio verwijderd.");
};

const onUpdateTitle = (value: string) => {
  props.story.title = value;

  const title = (
    value.includes(":")
      ? value.split(":")[0]
      : value.includes("-")
      ? value.split("-")[0]
      : value
  ).trim();
  props.story.slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .substring(0, 50);
};
</script>
