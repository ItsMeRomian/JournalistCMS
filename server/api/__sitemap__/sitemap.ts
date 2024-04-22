import { defineEventHandler } from "h3";
import { firestore } from "../../utils/firebase";

export default defineEventHandler(async (event) => {
  const snap = await firestore
    .collection("stories")
    .where("published", "==", true)
    .get();
  return snap.docs.map((doc) => {
    return {
      loc: `story/${doc.data().slug || doc.id}`,
      lastmod: new Date(doc.data().dateUpdated),
    };
  });
});
