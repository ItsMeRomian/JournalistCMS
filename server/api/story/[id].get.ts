import type { Story } from "../stories";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (url) => {
  const id = url.path?.replace("/api/story/", "") as string;
  const ref = firestore.collection("stories").doc(id);
  const snap = await ref.get();
  return {
    ...(snap.data() as Story),
    id: ref.id,
  } as Story;
});
