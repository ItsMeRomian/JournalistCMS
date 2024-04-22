<template>
  <nav class="bg-white shadow-lg">
    <div class="px-6 py-4">
      <h3 class="text-2xl font-medium">Admin Panel</h3>
    </div>
    <hr class="my-0" />
    <ul class="list-reset">
      <li class="py-2">
        <nuxt-link
          @click="emit('hideMenu')"
          class="block pl-4 pr-6 py-2 text-gray-600 hover:text-indigo-500"
          to="/admin/"
        >
          Dashboard
        </nuxt-link>
        <nuxt-link
          @click="emit('hideMenu')"
          class="block pl-4 pr-6 py-2 text-gray-600 hover:text-indigo-500"
          to="/admin/new"
        >
          New
        </nuxt-link>
        <nuxt-link
          @click="emit('hideMenu')"
          class="block pl-4 pr-6 py-2 text-gray-600 hover:text-indigo-500"
          to="/admin/photos"
        >
          Photos
        </nuxt-link>
        <span
          class="block pl-4 pr-6 py-2 text-gray-600 hover:text-indigo-500"
          @click="logout()"
        >
          Logout
        </span>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { signOut } from "@firebase/auth";
import { useToast } from "tailvue";

const emit = defineEmits<{
  (event: "hideMenu"): void;
}>();

const logout = async () => {
  const auth = useFirebaseAuth();
  if (auth) {
    await signOut(auth);
    navigateTo("/");
    useToast().success("Uitgelogd.");
  }
};
</script>
