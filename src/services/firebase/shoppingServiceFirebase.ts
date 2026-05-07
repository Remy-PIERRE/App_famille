import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const ref = doc(db, "shopping", "main");

export const shoppingServiceFirebase = {
  async getAll() {
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().items : [];
  },

  async add(items: any[]) {
    await setDoc(ref, { items });
  },
};
