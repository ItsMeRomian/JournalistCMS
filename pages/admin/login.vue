<template>
  <div
    class="mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300"
  >
    <div class="py-12 p-10 bg-white rounded-xl">
      <div class="mb-6">
        <label class="mr-4 text-gray-700 font-bold inline-block mb-2" for="name"
          >Email</label
        >
        <input
          type="email"
          v-model="input.email"
          class="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-reddish rounded"
        />
      </div>
      <div class="">
        <label class="mr-4 text-gray-700 font-bold inline-block mb-2" for="name"
          >Password</label
        >
        <input
          type="password"
          v-model="input.password"
          class="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-reddish rounded"
        />
      </div>
      <button
        @click="doLogin()"
        class="w-full mx-auto mt-6 text-indigo-50 font-bold bg-reddish hover:bg-reddishDark py-3 rounded-md transition duration-300"
      >
        LOGIN
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword } from "@firebase/auth";
import { useToast } from "tailvue";
const auth = useFirebaseAuth()!;
definePageMeta({});
const input = reactive({
  email: "",
  password: "",
});

onMounted(() => {
  setTimeout(() => {
    const auth = useFirebaseAuth();
    if (auth && auth.currentUser?.email) navigateTo("/admin/");
  }, 10);
});

const doLogin = async () => {
  try {
    console.log(auth);
    const { user } = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );
    if (user.email) useToast().success("Ingelogd, een moment");
    navigateTo("/admin/");
  } catch (error) {
    useToast().denied("Er is wat fout gegaan.");
    console.log(error);
  }
};
</script>
