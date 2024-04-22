<template>
  <div class="mb-4 max-h-52 overflow-scroll rounded-md shadow-md">
    <div class="bg-white shadow rounded-md">
      <div class="px-4 py-2 flex flex-row justify-between bg-broken">
        <span class="text-2xl font-semibold">Bestanden, nieuwste boven</span>
        <span v-if="uploadedFile?.length" @click="uploadPicture()">
          <Icon
            icon="ph:upload-light"
            class="w-5 h-5 inline-block text-reddish"
          />
          Upload
        </span>
        <span v-else @click="open({ multiple: false })" class="cursor-pointer">
          <Icon
            icon="ph:upload-light"
            class="w-5 h-5 inline-block text-reddish"
          />
          Selecteer bestand
        </span>
      </div>
      <div
        v-for="file in files"
        :key="file.name"
        class="block hover:bg-gray-100 transition duration-150 ease-in-out py-2 px-4"
      >
        <div class="flex items-center">
          <div
            class="text-sm leading-5 font-medium text-reddishDark truncate grow"
          >
            <div class="flex flex-row">
              <div>
                <a href="#" class="hover_image_link" v-if="file && file.name">
                  {{ file.name }}
                </a>
              </div>
              <div class="grow"></div>
              <div class="ml-auto">
                ({{ new Date(file.date).toLocaleString() }})
              </div>
            </div>
          </div>
          <div class="flex flex-row ml-2 flex-shrink-0 divide-x">
            <button
              @click="setAsCover(file)"
              v-if="!file.name.includes('.mp3')"
              class="ml-2 rounded-l inline-flex items-center px-2.5 py-1.5 text-xs leading-4 font-medium text-gray-700 bg-reddish hover:bg-reddishDark focus:outline-none focus:shadow-outline-gray active:bg-gray-200 transition duration-150 ease-in-out"
            >
              <Icon icon="ph:image" class="w-5 h-5 inline-block text-broken" />
            </button>
            <button
              @click="placeInArticle(file)"
              v-if="!file.name.includes('.mp3')"
              class="inline-flex items-center px-2.5 py-1.5 text-xs leading-4 font-medium text-gray-700 bg-reddish hover:bg-reddishDark focus:outline-none focus:shadow-outline-gray active:bg-gray-200 transition duration-150 ease-in-out"
            >
              <Icon
                icon="heroicons:bars-arrow-down"
                class="w-5 h-5 inline-block text-broken"
              />
            </button>
            <button
              @click="useAsAudio(file)"
              v-if="file.name.includes('.mp3')"
              class="inline-flex items-center px-2.5 py-1.5 text-xs leading-4 font-medium text-gray-700 bg-reddish hover:bg-reddishDark focus:outline-none focus:shadow-outline-gray active:bg-gray-200 transition duration-150 ease-in-out"
            >
              <Icon
                icon="ph:speaker-high-light"
                class="w-5 h-5 inline-block text-broken"
              />
            </button>
            <button
              title="Preview"
              @click="previewFile(file)"
              class="inline-flex items-center px-2.5 py-1.5 text-xs leading-4 font-medium text-gray-700 bg-reddish hover:bg-reddishDark focus:outline-none focus:shadow-outline-indigo active:bg-gray-200 transition duration-150 ease-in-out"
            >
              <Icon
                icon="mdi:open-in-new"
                class="w-5 h-5 inline-block text-broken"
              />
            </button>
            <button
              title="Verwijder"
              @click="deleteFile(file)"
              class="rounded-r inline-flex items-center px-2.5 py-1.5 text-xs leading-4 font-medium text-white bg-reddish focus:outline-none focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out"
            >
              <Icon
                icon="mdi:delete"
                class="w-5 h-5 inline-block text-broken"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFirebaseStorage, useStorageFile } from "vuefire";
import { Icon } from "@iconify/vue";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref as storageRef,
} from "firebase/storage";
import { useToast } from "tailvue";

interface ArticleFile {
  name: string;
  url: string;
  date: string;
}

const emit = defineEmits<{
  (event: "setAsCover", file: ArticleFile): void;
  (event: "placeInArticle", id: ArticleFile): void;
  (event: "useAsAudio", file: ArticleFile): void;
}>();

/**
 * Emitters
 */
const setAsCover = (file: ArticleFile) => emit("setAsCover", file);
const placeInArticle = (file: ArticleFile) => emit("placeInArticle", file);
const useAsAudio = (file: ArticleFile) => emit("useAsAudio", file);

const files = ref([] as ArticleFile[]);

/**
 * Gets files
 */
const fetchFiles = async () => {
  const storage = useFirebaseStorage();
  const ref = storageRef(storage, "/images/");

  const listResult = await listAll(ref);
  const filesData = await Promise.all(
    listResult.items.map(async (item) => {
      return {
        name: item.name,
        url: await getDownloadURL(item),
        date: (await getMetadata(item)).timeCreated,
      };
    })
  );
  files.value = filesData.sort(
    (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

onMounted(async () => await fetchFiles());

const { files: uploadedFile, open, reset } = useFileDialog();
const uploadPicture = async () => {
  const data = uploadedFile.value?.item(0);

  if (data) {
    const { upload } = useStorageFile(
      storageRef(useFirebaseStorage(), `/images/${data.name}`)
    );
    await upload(data);
    await fetchFiles();
    reset();
    useToast().success("Geupload.");
  }
};

const previewFile = (file: any) => window.open(file.url, "_blank");

const deleteFile = async (file: any) => {
  const storage = useFirebaseStorage();

  const ref = storageRef(storage, `/images/${file.name}`);
  await deleteObject(ref);
  files.value = files.value.filter((f) => f.name !== file.name);
  useToast().success("Verwijderd.");
};

const copyUrl = (file: any) => navigator.clipboard.writeText(file.url);
</script>
<style lang="scss"></style>
