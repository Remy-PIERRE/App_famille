import { db } from "@/config/firebase";
import type { Event, CreateEventInput } from "@/types/Event";
import type { EventService } from "@/types/services/EventService";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const col = collection(db, "events");

export const eventServiceFirebase: EventService = {
  async getAll() {
    const snapshot = await getDocs(col);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];
  },

  async add(event: CreateEventInput) {
    const docRef = await addDoc(col, event);

    return {
      id: docRef.id,
      ...event,
    };
  },

  async remove(id: string) {
    await deleteDoc(doc(db, "events", id));
  },
};
