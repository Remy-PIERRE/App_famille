import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import type { AuthService, LoginInput } from "@/types/services/AuthService";

import { auth } from "@/config/firebase";
import { mapFirebaseUser } from "@/mappers/user";

export const authServiceFirebase: AuthService = {
  async login(input: LoginInput) {
    const credentials = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password,
    );

    return mapFirebaseUser(credentials.user);
  },

  async logout() {
    await signOut(auth);
  },

  async getCurrentUser() {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();

        if (!user) {
          resolve(null);
          return;
        }

        resolve(mapFirebaseUser(user));
      });
    });
  },
};
