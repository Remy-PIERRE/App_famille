import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";

import type { HouseholdService } from "./types";

function generateInviteCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

async function updateUserHousehold(userId: string, householdId: string) {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    householdId,
  });
}

export const householdServiceFirebase: HouseholdService = {
  async create(userId, input) {
    const inviteCode = generateInviteCode();

    const docRef = await addDoc(collection(db, "households"), {
      name: input.name,
      inviteCode,
      members: [userId],
      createdAt: serverTimestamp(),
    });

    await updateUserHousehold(userId, docRef.id);

    return {
      id: docRef.id,
      name: input.name,
      inviteCode,
      members: [userId],
      createdAt: Date.now(),
    };
  },

  async join(userId, input) {
    const q = query(
      collection(db, "households"),

      where("inviteCode", "==", input.inviteCode),
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("Foyer introuvable");
    }

    const householdDoc = snapshot.docs[0];

    const data = householdDoc.data();

    const members: string[] = data.members ?? [];

    if (!members.includes(userId)) {
      members.push(userId);
    }

    await updateDoc(householdDoc.ref, {
      members,
    });

    await updateUserHousehold(userId, householdDoc.id);

    return {
      id: householdDoc.id,

      name: data.name,

      inviteCode: data.inviteCode,

      members,

      createdAt: data.createdAt?.seconds ?? Date.now(),
    };
  },

  async getById(householdId) {
    const ref = doc(db, "households", householdId);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    return {
      id: snapshot.id,

      name: data.name,

      inviteCode: data.inviteCode,

      members: data.members ?? [],

      createdAt: data.createdAt?.seconds ?? Date.now(),
    };
  },
};
