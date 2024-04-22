<template>
  <div class="grid grid-cols-2 justify-between bg-sandDark py-10 px-4 mb-5">
    <NuxtLink to="/">
      <h1 class="text-4xl font-bold">
        {{ useRuntimeConfig().public.JOURNALIST.NAME }}
      </h1>
      <p class="text-xl mt-2">Journalist</p>
    </NuxtLink>
    <div class="justify-self-end my-auto">
      <Icon
        icon="mdi:menu"
        class="h-8 w-8"
        @click="displayMenu = !displayMenu"
      />
    </div>
  </div>
  <div
    class="flex flex-col text-end w-[18rem] absolute right-0 bg-sandDark rounded-bl-lg mt-[-20px]"
    v-if="displayMenu === true"
  >
    <NuxtLink
      to="/"
      event=""
      @click.native="goto('/')"
      class="py-2 text-xl border-b-2 pr-2"
    >
      Home
    </NuxtLink>
    <NuxtLink
      to="/#portfolio"
      event=""
      @click.native="goto('/#portfolio')"
      class="py-2 text-xl border-b-2 pr-2"
    >
      Portfolio
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
let displayMenu = useState("displayMenu", () => false);

const goto = (page: string) => {
  displayMenu.value = false;
  navigateTo(page);
};
</script>
