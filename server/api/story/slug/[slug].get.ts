import type { Story } from "../../stories";
import { defineEventHandler } from "h3";
import { firestore } from "../../../utils/firebase";

export default defineEventHandler(async (url) => {
  const slug = url.path?.replace("/api/story/slug/", "") as string;
  const snap = await firestore
    .collection("stories")
    .where("slug", "==", slug)
    .get();
  const snap2 = await snap.docs[0].ref.get();
  return {
    ...(snap2.data() as Story),
    id: snap2.id,
  } as Story;
});
