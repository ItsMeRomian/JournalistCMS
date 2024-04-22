<template>
  <ClientOnly placeholder="loading...">
    <div class="flex flex-row bg-sandDark p-2">
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          class="px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-green-200 font-extrabold text-md"
          :class="{
            'font-bold': editor.isActive('bold'),
            'bg-green-400': editor.isActive('bold'),
          }"
        >
          B
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          class="px-4 py-2 text-gray-900 bg-white border border-gray-200 hover:bg-green-200 italic text-md"
          :class="{
            italic: editor.isActive('italic'),
            'bg-green-400': editor.isActive('italic'),
          }"
        >
          I
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          class="px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-green-200 line-through text-md"
          :class="{
            'line-through': editor.isActive('strike'),
            'bg-green-400': editor.isActive('strike'),
          }"
        >
          S
        </button>
      </div>
      <div class="inline-flex rounded-md shadow-sm mx-2" role="group">
        <button
          type="button"
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :disabled="!editor.can().chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
          class="px-4 py-2 text-sm text-gray-900 bg-white border-l border-t border-b border-gray-20 rounded-l-md hover:bg-green-200"
        >
          <Icon icon="ph:code" class="w-5 h-5" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleBulletList().run()"
          :disabled="!editor.can().chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
          class="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-green-200"
        >
          <Icon icon="ph:list-bullets" class="w-5 h-5" />
        </button>
      </div>
      <div class="inline-flex rounded-md shadow-sm mx-2" role="group">
        <button
          type="button"
          @click="editor.chain().focus().setParagraph().run()"
          :disabled="!editor.can().chain().focus().setParagraph().run()"
          :class="{ 'bg-green-400': editor.isActive('paragraph') }"
          class="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-green-200"
        >
          <Icon icon="ph:paragraph" class="w-5 h-5" />
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :disabled="
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          "
          :class="{ 'bg-green-400': editor.isActive('heading', { level: 1 }) }"
          class="px-4 py-2 text-sm text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-green-200"
        >
          H1
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :disabled="
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          "
          :class="{ 'bg-green-400': editor.isActive('heading', { level: 2 }) }"
          class="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 hover:bg-green-200"
        >
          H2
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleBlockquote().run()"
          :disabled="!editor.can().chain().focus().toggleBlockquote().run()"
          :class="{ 'bg-green-400': editor.isActive('blockquote') }"
          class="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-green-200"
        >
          " "
        </button>
      </div>
      <button
        type="button"
        @click="editor.chain().focus().setHardBreak().run()"
        class="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-green-200"
      >
        <Icon
          icon="icon-park-outline:paragraph-break"
          class="w-5 h-5 rotate-90"
        />
      </button>
      <div class="inline-flex rounded-md shadow-sm mx-2" role="group">
        <button
          class="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-l-md hover:bg-green-200"
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          <Icon icon="ph:arrow-bend-up-left-fill" class="w-5 h-5" />
        </button>
        <button
          class="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-green-200"
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          <Icon icon="ph:arrow-bend-up-right-fill" class="w-5 h-5" />
        </button>
      </div>
    </div>
    <editor-content :editor="editor" class="p-4 bg-broken" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3";
import { Icon } from "@iconify/vue";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { useToast } from "tailvue";
interface ArticleFile {
  name: string;
  url: string;
  date: string;
}
const props = defineProps({
  modelValue: {
    type: [String],
  },
});

const emit = defineEmits<{
  (event: "update", modelValue: string): void;
}>();

const placeImage = (file: ArticleFile) => {
  editor
    .chain()
    .focus()
    .setImage({ src: file.url, alt: file.name, title: file.name })
    .run();
  useToast().success("Foto geplaatst in artikel.");
};

watch(usePhoto(), async (value) => placeImage(value));

const editor = new Editor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: {
        HTMLAttributes: {
          class: "text-2xl font-bold mt-4 mb-2",
        },
      },
    }),
    Image,
  ],
  onUpdate: () => {
    emit("update", editor.getHTML());
  },
});
</script>
<style lang="scss" scoped>
.ProseMirror:focus {
  outline: none;
}

ul,
ol {
  padding: 0 1rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.1;
}

code {
  background-color: rgba(#616161, 0.1);
  color: #616161;
}

pre {
  background: #0d0d0d;
  color: #fff;
  font-family: "JetBrainsMono", monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;

  code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
  }
}

img {
  max-width: 100%;
  height: auto;
}

blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(#0d0d0d, 0.1);
}

hr {
  border: none;
  border-top: 2px solid rgba(#0d0d0d, 0.1);
  margin: 2rem 0;
}

/* Style for the text editor buttons */
.button {
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 8px;
}

/* Style for disabled buttons */
.button[disabled] {
  background-color: #ccc;
  color: #333;
  cursor: default;
}

/* Style for active buttons */
.button.is-active {
  background-color: #ccc;
  color: #fff;
}

/* Style for the editor content */
.ProseMirror {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  min-height: 200px;
}
</style>
