<template>
  <!--textbox-->
  <div class="mb-4" v-if="field.type == 'textbox'">
    <label :for="field.id" class="block mb-2 font-bold font-serif">
      {{ field.label }}
      <template v-if="field.id == 'title'">
        {{ fieldRef.length }} / 65
      </template>
    </label>
    <input
      type="text"
      :id="field.id"
      v-model="fieldRef"
      class="w-full border-gray-700 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-broken"
    />
  </div>

  <!--date-->
  <div class="mb-4" v-if="field.type == 'date'">
    <label :for="field.id" class="block font-medium mb-2">
      {{ field.label }}
    </label>
    <input
      type="text"
      :id="field.id"
      v-model="fieldRef"
      class="w-full border-gray-700 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-broken"
    />
    <span v-if="field.error" class="text-red-500 text-sm font-serif">
      Fout in datum
    </span>
  </div>

  <!--text area-->
  <div class="mb-4" v-if="field.type == 'textarea'">
    <label :for="field.id" class="block mb-2 font-bold font-serif">
      {{ field.label }}
      <template v-if="field.id == 'shortBody'">
        {{ fieldRef.length }} / 165
      </template>
    </label>
    <textarea
      :id="field.id"
      v-model="fieldRef"
      rows="4"
      class="w-full border-gray-700 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-broken"
    ></textarea>
  </div>

  <!--radio-->
  <div class="inline-block" v-if="field.type == 'checkbox'">
    <span v-if="field.label" :for="field.id" class="font-medium mb-2 mr-2">{{
      field.label
    }}</span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        :id="field.id"
        v-model="fieldRef"
        class="sr-only peer"
      />
      <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
      ></div>
    </label>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  field: {
    type: string;
    label: string;
    id: string;
    model: any;
    error?: boolean;
  };
}>();
const fieldRef = ref(props.field.model);

const emit = defineEmits<{
  (event: "update", value: any): void;
}>();

onMounted(() => {
  fieldRef.value = props.field.model;
  if (props.field.type == "date") {
    fieldRef.value = fieldRef.value.split("T")[0];
  }
});

watch(fieldRef, () => {
  if (props.field.type == "date") {
    if (fieldRef.value.length != 10 || fieldRef.value.split("-").length != 3) {
      props.field.error = true;
      return;
    } else {
      props.field.error = false;
    }
    fieldRef.value = fieldRef.value.split("T")[0];
    emit("update", fieldRef.value + "T00:00:00.000Z");
    console.log("v", fieldRef.value + "T00:00:00.000Z");
  } else {
    emit("update", fieldRef.value);
  }
});
</script>
