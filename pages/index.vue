<template>
  <Head>
    <Title>{{ useRuntimeConfig().public.JOURNALIST.NAME }} - Journalist</Title>
    <Meta
      name="description"
      :content="useRuntimeConfig().public.JOURNALIST.DESC"
    />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta
      name="twitter:title"
      :content="useRuntimeConfig().public.JOURNALIST.NAME + '- Journalist'"
    />
    <Meta
      name="twitter:description"
      :content="useRuntimeConfig().public.JOURNALIST.DESC"
    />
    <Meta name="twitter:image" content="https://placehold.it/500x500" />
    <Meta name="og:image" content="https://placehold.it/500x500" />
  </Head>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-2 mb-4">
    <div>
      <img
        src="https://placehold.it/500x400"
        class="rounded-lg"
        :alt="useRuntimeConfig().public.JOURNALIST.NAME + ' - Journalist'"
      />
    </div>
    <div class="flex flex-col justify-between text-lg">
      <div class="top">
        <p class="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, beatae
          et nostrum ab corporis veritatis velit veniam ullam temporibus
          distinctio non fugiat molestiae iste impedit quam, culpa voluptate?
          Id, aut? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur molestias laborum eaque nisi repudiandae id, voluptate alias
          suscipit repellendus enim sint voluptatibus omnis facilis quo qui
          placeat assumenda! Corrupti, perspiciatis!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque quas,
          fugit corporis maxime tenetur consequuntur inventore? Odio.
        </p>
      </div>
      <div class="bottom mt-2">
        <ul>
          <li>
            <a :href="'mailto:' + useRuntimeConfig().public.JOURNALIST.EMAIL">
              <Icon icon="mdi:email" class="h-6 w-6 inline-block" />
              info@journalist.co
            </a>
          </li>
          <li class="mt-2">
            <a :href="'tel:' + useRuntimeConfig().public.JOURNALIST.TEL">
              <Icon icon="mdi:phone" class="h-6 w-6 inline-block" />
              {{ useRuntimeConfig().public.JOURNALIST.TEL }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div id="portfolio" />
  <StoryList />
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>
