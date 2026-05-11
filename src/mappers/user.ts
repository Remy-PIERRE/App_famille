import type { User } from "@/types/User";

export function mapFirebaseUser(
  firebaseUser: import("firebase/auth").User,
): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    displayName: firebaseUser.displayName ?? undefined,
    photoURL: firebaseUser.photoURL ?? undefined,
  };
}
