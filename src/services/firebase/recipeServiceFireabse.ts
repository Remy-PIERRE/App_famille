import { db } from "@/config/firebase";
import type { Recipe } from "@/types/Recipe";
import type { RecipeService } from "@/types/services/RecipeService";
import { collection, getDocs, addDoc } from "firebase/firestore";

const col = collection(db, "recipes");

export const recipeServiceFirebase: RecipeService = {
  async getAll() {
    const snapshot = await getDocs(col);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];
  },

  async add(recipe: Recipe) {
    const { id, ...data } = recipe;

    await addDoc(col, data);
  },
};
