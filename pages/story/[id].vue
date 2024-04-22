<template>
  <Head>
    <Title
      >{{ story?.title }} -
      {{ useRuntimeConfig().public.JOURNALIST.DESC }}</Title
    >
    <Meta name="description" :content="story?.shortBody" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta
      name="twitter:title"
      :content="story?.title + useRuntimeConfig().public.JOURNALIST.DESC"
    />
    <Meta
      name="twitter:description"
      :content="story?.shortBody?.substring(0, 199)"
    />
    <Meta name="twitter:image" :content="story?.coverPhoto" />
    <Meta name="og:image" :content="story?.coverPhoto" />
  </Head>
  <div v-if="!story" class="mx-auto text-center my-10">
    <Icon icon="eos-icons:three-dots-loading" class="w-10 h-10" />
  </div>
  <div
    class="background-image w-full h-96 bg-image"
    :style="
      'background-image: url(\'' +
      'https://placehold.it/1660x550' +
      '\'); background-repeat: no-repeat; background-size: cover; background-position: center center; position: absolute;margin-left: -31px;margin-top: -300px;right: 0px;'
    "
  ></div>
  <StoryBody v-if="story" :story="story" :no-margin="false" />
</template>

<script setup lang="ts">
const route = useRoute();
const { data: story } = route.params.id.includes("-")
  ? useFetch(`/api/story/slug/${route.params.id}`)
  : useFetch(`/api/story/${route.params.id}`);

if (story.value)
  useJsonld({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    url: `https://${useRuntimeConfig().public.PROD_BASE_URL}/story/${
      story.value.slug
    }`,
    articleBody: story.value.shortBody,
    headline: story.value.title,
    image: [story.value.coverPhoto],
    datePublished: story.value.dateCreated,
    dateModified: story.value.dateUpdated,
    author: [
      {
        "@type": "Person",
        name: useRuntimeConfig().public.JOURNALIST.NAME,
        url: `https://${useRuntimeConfig().public.PROD_BASE_URL}/contact`,
      },
    ],
  });
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
