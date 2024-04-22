import { firestore } from "../utils/firebase";
import { defineEventHandler } from "h3";
export interface Story {
  published: boolean;
  imageLinks?: string[];
  shortBody: string;
  coverPhoto: string;
  title: string;
  fullBody: string;
  id?: string;
  slug: string;
  audioURL?: string;
  dateUpdated: string;
  dateCreated: string;
}
export default defineEventHandler(async () => {
  const data = [] as Story[];
  const ref = await firestore.collection("stories").get();
  ref.forEach((doc) => data.push({ ...doc.data(), id: doc.id } as Story));
  return data.sort(
    (b, a) =>
      new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
  );
});
