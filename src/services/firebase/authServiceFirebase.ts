import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { mapFirebaseUser } from "@/mappers/user";

import type {
  AuthService,
  LoginInput,
  RegisterInput,
} from "@/types/services/AuthService";
import type { User } from "@/types/User";

async function getUserProfile(uid: string): Promise<Partial<User> | null> {
  const ref = doc(db, "users", uid);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as Partial<User>;
}

async function buildUser(
  firebaseUser: import("firebase/auth").User,
): Promise<User> {
  const profile = await getUserProfile(firebaseUser.uid);

  return {
    ...mapFirebaseUser(firebaseUser),

    householdId: profile?.householdId,

    displayName: profile?.displayName ?? firebaseUser.displayName ?? undefined,
  };
}

export const authServiceFirebase: AuthService = {
  async login(input: LoginInput) {
    const credentials = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password,
    );

    return buildUser(credentials.user);
  },

  async register(input: RegisterInput) {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password,
    );

    await updateProfile(credentials.user, {
      displayName: input.displayName,
    });

    await setDoc(doc(db, "users", credentials.user.uid), {
      email: input.email,

      displayName: input.displayName,

      householdId: null,

      createdAt: serverTimestamp(),
    });

    return buildUser(credentials.user);
  },

  async logout() {
    await signOut(auth);
  },

  async getCurrentUser() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe();

        if (!firebaseUser) {
          resolve(null);
          return;
        }

        const user = await buildUser(firebaseUser);

        resolve(user);
      });
    });
  },
};
