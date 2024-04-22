<script setup lang="ts">
import { useFirebaseStorage, useStorageFile } from "vuefire";
import { Icon } from "@iconify/vue";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { useToast } from "tailvue";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

interface PortFolioFolder {
  id?: string;
  name: string;
  slug: string;
  date: string;
  coverPhoto?: string;
  items: PortFolioFile[];
}
interface PortFolioFile {
  name: string;
  url: string;
  date: string;
}
const storage = useFirebaseStorage();
const firestore = useFirestore();

// const files = ref([] as PortFolioFile[]);
const folders = ref([] as PortFolioFolder[]);
const currentUploadDialogFolderId = ref("");

const fetchFiles = async () => {
  const ref = storageRef(storage, "/portfolio/");

  const { docs } = await getDocs(collection(useFirestore(), `lotteportfolio/`));
  folders.value = docs.map((doc) => {
    return {
      id: doc.id,
      name: doc.data().name,
      slug: doc.data().slug,
      date: doc.data().date,
      coverPhoto: doc.data().coverPhoto,
      items: doc.data().items,
    };
  });
  console.log(folders.value);
};
const { files: uploadedFile, open, reset } = useFileDialog();
watch(uploadedFile, () => uploadPicture(currentUploadDialogFolderId.value));

const uploadPicture = async (folderId: string) => {
  const data = uploadedFile.value?.item(0);

  if (data) {
    useToast().info("🤔🤔🤔🤔.....");
    const a = await useStorageFile(
      storageRef(useFirebaseStorage(), `/portfolio/${data.name}`)
    );
    await a.upload(data);
    await a.refresh();
    await updateDoc(doc(firestore, "lotteportfolio", folderId), {
      items: arrayUnion({
        name: data.name,
        url: a.url.value as string,
        date: new Date().toISOString(),
      }),
    });
    await fetchFiles();
    reset();
    useToast().success("Geupload.");
  }
};

const newFolder = ref({ title: "" });
const addFolder = async () => {
  const a = await addDoc(collection(firestore, "lotteportfolio"), {
    name: newFolder.value.title,
    slug: newFolder.value.title.toLowerCase().replace(" ", "-"),
    date: new Date().toISOString(),
    items: [],
  });
  await fetchFiles();
  useToast().success("Toegevoegd.");
};

const deleteItem = async (itemName: string, folderId: string) => {
  const ref = storageRef(storage, `/portfolio/${itemName}`);
  try {
    await deleteObject(ref);
  } catch (error) {
    console.log(error);
  }
  await updateDoc(doc(firestore, "lotteportfolio", folderId), {
    items: folders.value
      .find((folder) => folder.id === folderId)
      ?.items.filter((item) => item.name !== itemName),
  });

  await fetchFiles();
  useToast().success("Verwijderd.");
};

const deleteFolder = async (folderId: string) => {
  await deleteDoc(doc(firestore, "lotteportfolio", folderId));
  await fetchFiles();
  useToast().success("Verwijderd.");
};

const openDialog = (folderId: string) => {
  currentUploadDialogFolderId.value = folderId;
  open();
};

onMounted(async () => await fetchFiles());
</script>

<template>
  <pre>
        {{ folders }}
    </pre
  >
  <div class="grid grid-cols-5">
    <div>
      <input type="text" v-model="newFolder.title" />
      <span @click="addFolder()">Add</span>
    </div>
    <div
      v-for="folder in folders"
      :key="folder.id"
      class="bg-white shadow-lg rounded-lg p-4 m-4"
    >
      <div class="flex flex-row justify-between">
        <h2 class="text-xl font-medium">{{ folder.name }}</h2>
        <Icon
          icon="mdi:delete"
          class="h-6 w-6 inline-block cursor-pointer"
          @click="() => deleteFolder(folder.id as string)"
        />
      </div>
      <div class="flex flex-wrap">
        <div v-for="item in folder.items" :key="item.name" class="w-1/3 p-2">
          <img
            :src="item.url"
            @click="deleteItem(item.name, folder.id as string)"
          />
        </div>
        <div class="w-1/3 p-2" @click="() => openDialog(folder.id as string)">
          Add
        </div>
      </div>
    </div>
  </div>
</template>
