<template>
  <div class="text-center py-10 bg-sandDark mt-10" id="load">
    <span class="text-2xl">
      <NuxtLink to="/">Home</NuxtLink>
      <span> | </span>
      <NuxtLink to="/#portfolio">Portfolio</NuxtLink>
    </span>
    <p class="mt-2">
      © {{ useRuntimeConfig().public.JOURNALIST.NAME }}
      {{ useRuntimeConfig().public.JOURNALIST.YEAR }}<br />
      Website door
      <a
        href="https://dynafools.live"
        target="_BLANK"
        class="text-dark underline"
      >
        Romian Tairovski
      </a>
    </p>
  </div>
</template>
